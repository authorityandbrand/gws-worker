#!/usr/bin/env python3
"""
MCP Health Check + Refresh — Post-Deploy SOP
Run after any wrangler deploy to confirm connectors are healthy.

Usage:
    python3 scripts/mcp-health-check.py           # check + auto-heal on failure
    python3 scripts/mcp-health-check.py --refresh  # always clear cache first, then check
    python3 scripts/mcp-health-check.py --diagnose # full diagnostics if issues found

Why --refresh matters:
    Claude.ai pins each tool by a schema hash. When a tool's description or
    inputSchema changes after a deploy, the old hash no longer matches and
    the tool silently fails. clear_cache forces claude.ai to re-fetch all
    tool schemas and issue new hash entries, restoring full tool availability.

Auto-heal:
    If any check fails, the script automatically clears the cache and retries
    once. If it still fails after that, --diagnose shows worker logs and
    registration details to help locate the root cause.
"""

import json
import os
import re
import subprocess
import sys
import time
import argparse
from datetime import datetime, timezone

# ── Config ────────────────────────────────────────────────────────────────────

ORG_ID = "f1f8a19a-2cfe-46d4-90ac-7e923275f907"
D1_REST_URL = "https://d1-rest.authorityandbrand.workers.dev"

SERVERS = [
    {
        "name": "Gemini",
        "uuid": "29995880-2deb-4753-ad3c-252f1a0a914e",
        "url": "https://gemini-webapi-worker.authorityandbrand.workers.dev",
        "cf_name": "gemini-webapi-worker",
        "expected_tools": [
            "gemini", "nlm_workflow", "nlm_catalog", "nlm_prompt", "nlm_notebook",
            "nlm_source", "nlm_studio", "nlm_research", "nlm_note", "nlm_share",
            "nlm_case_file", "nlm_living_doc", "nlm_mind_map", "nlm_auth",
            "nlm_queue", "nlm_server_info", "nlm_conversations", "nlm_gemini_sync",
            "nlm_gem_map", "nlm_gem_save",
            "gws_drive", "gws_gmail", "gws_sheets", "gws_calendar", "gws_docs",
            "gws_tasks", "gws_contacts", "gws_slides", "gws_forms", "gws_chat",
            "gws_script", "gws_gemini", "gws_vision", "gws_web_search", "gws_gws_status",
            "hub_agents", "hub_skills", "hub_workflows", "hub_pipeline",
        ],
    },
    {
        "name": "G Workspace",
        "uuid": "4eb0e53a-cd91-401f-81a4-bc4ad7bc4e53",
        "url": "https://gws-worker.authorityandbrand.workers.dev",
        "cf_name": "gws-worker",
        "expected_tools": [
            "drive", "gmail", "sheets", "calendar", "docs", "tasks",
            "contacts", "slides", "forms", "chat", "script", "gemini",
            "vision", "web_search", "gws_status",
        ],
    },
]

PASS = "✓"
FAIL = "✗"
WARN = "!"

# ── Auth ──────────────────────────────────────────────────────────────────────

def get_d1_secret():
    sk = os.environ.get("D1REST_SECRET_WRITE") or os.environ.get("D1REST_SECRET", "")
    if sk:
        return sk
    try:
        content = open(os.path.expanduser("~/.env")).read()
        for line in content.split("\n"):
            m = re.match(r'^export\s+D1REST_SECRET(?:_WRITE)?=["\'"]?([^"\'"\s]+)', line)
            if m:
                return m.group(1)
    except Exception:
        pass
    return ""

# ── HTTP ──────────────────────────────────────────────────────────────────────

def curl(method, url, body=None, headers=None, timeout=15):
    cmd = ["curl", "-s", "-m", str(timeout), "-X", method, url,
           "-H", "Content-Type: application/json"]
    for k, v in (headers or {}).items():
        cmd += ["-H", f"{k}: {v}"]
    if body:
        cmd += ["-d", json.dumps(body)]
    r = subprocess.run(cmd, capture_output=True, text=True)
    try:
        return json.loads(r.stdout), None
    except Exception:
        return None, r.stdout[:300] or r.stderr[:300]

def d1_get(secret, api_path):
    url = f"{D1_REST_URL}/claude-ai/proxy{api_path}?direct=true"
    return curl("GET", url, headers={"Authorization": f"Bearer {secret}"})

def d1_post(secret, api_path, body=None):
    url = f"{D1_REST_URL}/claude-ai/proxy{api_path}?direct=true"
    return curl("POST", url, body=body, headers={"Authorization": f"Bearer {secret}"})

# ── Individual checks ─────────────────────────────────────────────────────────

def check_health(server):
    data, err = curl("GET", f"{server['url']}/health")
    if err or not data:
        return False, f"no response: {err}"
    if data.get("status") != "ok":
        return False, f"status={data.get('status')} {json.dumps(data)[:100]}"
    detail = []
    if "tools" in data:
        detail.append(f"tools={data['tools']}")
    auth = data.get("oauth_fresh", data.get("auth_mode", ""))
    if auth:
        detail.append(f"auth={auth}")
    return True, "  ".join(detail)

def check_tools_list(server):
    data, err = curl("POST", f"{server['url']}/mcp",
                     body={"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}})
    if err or not data:
        return None, set(), set(), f"no response: {err}"
    tools = data.get("result", {}).get("tools", [])
    if not tools and "error" in data:
        return [], set(server["expected_tools"]), set(), f"MCP error: {data['error']}"
    names = {t["name"] for t in tools}
    expected = set(server["expected_tools"])
    return tools, expected - names, names - expected, None

def check_registered(secret, server):
    data, err = d1_get(secret, f"/api/organizations/{ORG_ID}/mcp/remote_servers")
    if err or not data:
        return None, f"remote_servers API error: {err}"
    if not isinstance(data, list):
        return None, f"unexpected response: {str(data)[:100]}"
    match = next((s for s in data if s["uuid"] == server["uuid"]), None)
    return match, None

def clear_cache(secret, server):
    path = f"/api/organizations/{ORG_ID}/mcp/remote_servers/{server['uuid']}/clear_cache"
    data, err = d1_post(secret, path)
    if err:
        return False, err
    if isinstance(data, dict) and data.get("type") == "error":
        return False, data.get("error", {}).get("message", str(data))
    return True, None

# ── Diagnostics ───────────────────────────────────────────────────────────────

def run_diagnostics(server, secret):
    print(f"\n  ── Diagnostics: {server['name']} ──")

    # 1. Registration details
    reg, err = check_registered(secret, server)
    if err:
        print(f"  {FAIL} Registration check failed: {err}")
    elif not reg:
        print(f"  {FAIL} Server NOT found in claude.ai remote_servers — re-add it in Settings")
    else:
        print(f"  {PASS} Registered: uuid={reg['uuid'][:8]}  url={reg['url']}")
        print(f"       created={reg.get('created_at','?')[:10]}  updated={reg.get('updated_at','?')[:10]}")

    # 2. Raw MCP initialize check
    data, err = curl("POST", f"{server['url']}/mcp",
                     body={"jsonrpc": "2.0", "id": 1, "method": "initialize",
                           "params": {"protocolVersion": "2025-03-26",
                                      "capabilities": {}, "clientInfo": {"name": "health-check"}}})
    if err:
        print(f"  {FAIL} MCP initialize: {err}")
    else:
        ver = data.get("result", {}).get("protocolVersion", "?")
        srv = data.get("result", {}).get("serverInfo", {})
        print(f"  {PASS} MCP initialize: protocol={ver}  server={srv.get('name','?')} v{srv.get('version','?')}")

    # 3. Recent worker logs (last 5s via wrangler tail --once)
    print(f"\n  Recent worker logs ({server['cf_name']}):")
    try:
        r = subprocess.run(
            ["wrangler", "tail", server["cf_name"], "--format", "json", "--once"],
            capture_output=True, text=True, timeout=8,
            cwd=os.path.expanduser("~/gws-worker")
        )
        lines = [l for l in r.stdout.split("\n") if l.strip()]
        if lines:
            for line in lines[-5:]:
                try:
                    entry = json.loads(line)
                    outcome = entry.get("outcome", "")
                    logs = entry.get("logs", [])
                    print(f"    [{outcome}] {' | '.join(l.get('message','') for l in logs[:3])}")
                except Exception:
                    print(f"    {line[:120]}")
        else:
            print("    (no recent log entries)")
    except subprocess.TimeoutExpired:
        print("    (tail timed out — no traffic)")
    except Exception as e:
        print(f"    (wrangler tail unavailable: {e})")

# ── Main runner ───────────────────────────────────────────────────────────────

def check_server(server, secret, run_refresh=False, diagnose=False):
    """Run all checks for one server. Returns (passed, needs_clear_cache)."""
    issues = []

    # Health
    ok, detail = check_health(server)
    if ok:
        print(f"  {PASS} /health: ok  |  {detail}")
    else:
        print(f"  {FAIL} /health: {detail}")
        issues.append("health")

    # tools/list
    tools, missing, unexpected, err = check_tools_list(server)
    if err:
        print(f"  {FAIL} tools/list: {err}")
        issues.append("tools_list")
    elif missing:
        print(f"  {FAIL} tools/list: {len(tools or [])} tools — {len(missing)} MISSING: {sorted(missing)}")
        issues.append("missing_tools")
    else:
        extra = f"  (+{len(unexpected)} extra)" if unexpected else ""
        print(f"  {PASS} tools/list: {len(tools)} tools — all {len(server['expected_tools'])} expected present{extra}")

    # Registration check (only if we have a secret)
    if secret:
        reg, err = check_registered(secret, server)
        if err:
            print(f"  {WARN} Registration check skipped: {err}")
        elif not reg:
            print(f"  {FAIL} NOT registered in claude.ai — add via Settings > Integrations")
            issues.append("not_registered")
        else:
            print(f"  {PASS} Registered in claude.ai")

    passed = len(issues) == 0
    return passed, issues

def run(refresh=False, diagnose=False):
    print(f"\n{'='*60}")
    print(f"MCP Health Check — {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
    print(f"{'='*60}\n")

    secret = get_d1_secret()
    if not secret:
        print(f"  {WARN} No D1REST_SECRET in env or ~/.env — cache/registration checks skipped\n")

    all_passed = True

    for server in SERVERS:
        print(f"── {server['name']} ({server['url']}) ──")

        # Proactive refresh if requested
        if refresh and secret:
            ok, err = clear_cache(secret, server)
            if ok:
                print(f"  {PASS} clear_cache: triggered")
            else:
                print(f"  {FAIL} clear_cache failed: {err}")

        passed, issues = check_server(server, secret, diagnose=diagnose)

        # Auto-heal: if checks failed and we haven't already refreshed, clear cache and retry
        if not passed and not refresh and secret:
            print(f"\n  {WARN} Issues detected — auto-clearing cache and retrying...")
            ok, err = clear_cache(secret, server)
            if ok:
                print(f"  {PASS} clear_cache triggered — waiting 4s...")
                time.sleep(4)
                print(f"  Retrying checks:")
                passed, issues = check_server(server, secret)
                if passed:
                    print(f"  {PASS} Fixed after cache clear")
                else:
                    print(f"  {FAIL} Still failing after cache clear")
            else:
                print(f"  {FAIL} clear_cache failed: {err}")

        # Diagnostics on persistent failure
        if not passed and (diagnose or not refresh):
            run_diagnostics(server, secret)

        if not passed:
            all_passed = False

        print()

    print(f"{'='*60}")
    if all_passed:
        print(f"Result: ALL CHECKS PASSED")
        if refresh:
            print(f"        Schema cache cleared — claude.ai will pick up new tool schemas")
    else:
        print(f"Result: ISSUES FOUND — see above")
        if not diagnose:
            print(f"        Re-run with --diagnose for full worker logs and registration details")
    print(f"{'='*60}\n")

    return 0 if all_passed else 1

# ── Entry ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="MCP health check + auto-heal")
    parser.add_argument("--refresh", action="store_true",
                        help="Clear schema cache before checking (always run after schema changes)")
    parser.add_argument("--diagnose", action="store_true",
                        help="Show full diagnostics (worker logs, registration details) on any failure")
    args = parser.parse_args()
    sys.exit(run(refresh=args.refresh, diagnose=args.diagnose))
