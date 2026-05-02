# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A Cloudflare Worker that wraps the full Google Workspace API surface as an MCP (Model Context Protocol) server. Deployed at `gws-worker.authorityandbrand.workers.dev`. The worker exposes ~153 individual MCP tools across 15 Google API services, consolidated into 17 grouped tools for MCP `tools/list`.

## Build & Deploy

There is no build step — `src/index.js` is the pre-bundled output (from Wrangler bundling `../../src/google-workspace.ts` + `index.ts` in an external monorepo). Edit it directly.

```bash
wrangler deploy              # Deploy to Cloudflare
wrangler dev                 # Local dev server
wrangler tail                # Stream live logs
curl https://gws-worker.authorityandbrand.workers.dev/health  # Verify deployment
```

## Architecture

Single-file worker (`src/index.js`, ~7,500 lines) with three layers:

1. **`GoogleOAuthManager`** (~line 1048) — OAuth2 token lifecycle. Stores tokens in both KV (`CACHE`) and R2 (`R2_AUTH`). Tries `GOOGLE_ACCESS_TOKEN` env var first, then `GOOGLE_AUTH` service binding, then KV/R2 stored refresh tokens, then `GOOGLE_REFRESH_TOKEN` env var as last resort.

2. **`GoogleWorkspaceClient`** (~line 1257) — Typed methods for each Google API call (Gmail, Drive, Calendar, Docs, Sheets, Slides, Tasks, Contacts, Chat, Forms, Apps Script, Gemini, Vision, Web Search, NotebookLM/Discovery Engine). All methods call `googleFetch()` which adds Bearer auth and handles JSON responses.

3. **MCP + HTTP layer** (~line 7474) — Request routing:
   - `/health` — health check
   - `/mcp` — MCP JSON-RPC (Streamable HTTP transport)
   - `/sse` + `/message` — MCP SSE transport (legacy)
   - `/.well-known/oauth-*` + `/oauth/*` — OAuth discovery and token endpoints
   - Auth: `SESSION_KEY` env var checked via Bearer token; if unset, all requests pass

## MCP Tool Architecture

Two tool arrays serve different purposes:

- **`TOOLS`** (~line 4949): ~153 individual tools with full `inputSchema` definitions (e.g., `drive_search`, `gmail_send`). Used for execution dispatch in `callTool()`.
- **`GROUPED_TOOLS`** (~line 6542): 17 grouped tools (e.g., `drive`, `gmail`) with an `action` parameter. Returned by `tools/list`. When called, the action is expanded: `drive` + `action: "search"` → dispatches to `drive_search`.

The `callTool()` function (~line 6979) is a switch statement mapping tool names to `GoogleWorkspaceClient` method calls.

## Environment Bindings

| Binding | Type | Purpose |
|---------|------|---------|
| `SESSION_KEY` | Secret | Bearer token for worker auth (optional — open if unset) |
| `GOOGLE_OAUTH_CLIENT_ID` | Secret | Google OAuth client ID |
| `GOOGLE_OAUTH_CLIENT_SECRET` | Secret | Google OAuth client secret |
| `GOOGLE_REFRESH_TOKEN` | Secret | Fallback refresh token |
| `GOOGLE_ACCESS_TOKEN` | Var | Direct access token override |
| `CACHE` | KV | Token storage (key: `google_oauth_tokens`) |
| `R2_AUTH` | R2 | Token backup storage (path: `auth/gws/tokens.json`) |
| `GOOGLE_AUTH` | Service | Service binding to google-auth-worker |
| `GOOGLE_CLOUD_API_KEY` | Secret | For Vision, Natural Language APIs |
| `GOOGLE_PSE_ENGINE_ID` | Var | Programmable Search Engine ID |

## Google API Services Covered

Gmail (22 tools), Drive (15+12 extended), Calendar (11), Docs (4+7 extended), Sheets (12+5 extended), Tasks (10), Contacts (6), Chat (3), Forms (4), Slides (5), Apps Script (16), Gemini AI (11), Vision (2), Web Search (1), gws_status (1).

See `API-COVERAGE-AUDIT.md` for the complete tool-by-API mapping and ~230 internal functions not yet wired to MCP tools.

## OAuth Scopes

The `GOOGLE_SCOPES` constant (~line 909) requests ~100 OAuth scopes covering all supported services. Scopes are joined into a single space-delimited string.

Key scope notes:
- NotebookLM requires explicit `discoveryengine.readwrite` — `cloud-platform` alone is insufficient.
- Gemini `generateContent` requires `generative-language` — `cloud-platform` alone may fail on some endpoints.
- YouTube/Analytics (`youtube`, `youtube.readonly`, `yt-analytics.readonly`), Keep, Photos, Classroom, and Google Analytics scopes were added 2026-05-01. **Re-authenticate via `/google/auth` to include them in existing tokens.**
- Admin Directory write ops (`createAdminUser`, `createAdminGroup`, etc.) need `admin.directory.user` and `admin.directory.group` (not just the `.readonly` variants).

## Key Patterns

- All Google API calls go through `googleFetch(accessToken, url, options)` (~line 1214) which handles param serialization, auth headers, and JSON parsing.
- Gmail body decoding: `decodeGmailBody()` recursively walks MIME parts, preferring `text/plain` over `text/html`.
- Token refresh cascade: `GOOGLE_AUTH` service binding races against direct Google token fetch (`Promise.any`); binding win skips R2 update since google-auth-worker owns KV. Tokens cached in-memory for the request lifecycle.
- `/v1/` prefix is stripped from paths to support CF AI Gateway routing.
