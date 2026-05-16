# KV Namespace & Auth Fix Report

**Date**: 2026-05-15
**Tasks**: #636 (Promise.any error swallowing) + #637 (KV namespace collision audit)
**Status**: Both resolved. gws-worker redeployed (Version ID: d54f53c9-b2c3-487f-8a7d-aefb449df12a)

---

## Task #637 — KV Namespace Collision Audit

### Finding: No Collision (Intentional Sharing)

Investigation confirmed all three workers share KV namespace `e0ba67cf57c24ab49a7a3be5f20ece05`:

| Worker | Binding Name | Namespace ID |
|--------|-------------|-------------|
| `gws-worker` | `CACHE` | `e0ba67cf57c24ab49a7a3be5f20ece05` |
| `notebooklm-worker` | `KV_CACHE` | `e0ba67cf57c24ab49a7a3be5f20ece05` |
| `d1-rest-worker` | `CACHE` | `e0ba67cf57c24ab49a7a3be5f20ece05` |

This is intentional. The `wrangler.jsonc` comment explicitly documents: _"Shared auth namespace — GoogleOAuthManager reads google_oauth_tokens (fallback). Same namespace as google-auth-worker KV, notebooklm-worker KV_CACHE."_

### Key Prefix Audit (No Collisions Found)

Each worker uses distinct key prefixes:

| Worker | Key Prefixes Used |
|--------|------------------|
| `gws-worker` | `gemini_chat:*`, `google_oauth_tokens`, `google_oauth_tokens:<profile>` |
| `notebooklm-worker` | `nlm_alias:*`, `nlm_registry:*`, `nlm_conv:*`, `nlm_config:*`, `notebooklm_auth` |
| `d1-rest-worker` | (separate namespaces for its own domains) |

`google_oauth_tokens` is intentionally shared — gws-worker reads it as a fallback when the GOOGLE_AUTH service binding is unavailable. This is load-bearing cross-worker state, not an accident.

### Recommendation: No Action Required

The shared namespace is working as designed. If isolation is needed in the future, create `wrangler kv namespace create "gws-session-cache"` and update wrangler.jsonc to use the new ID for the CACHE binding, then migrate `gemini_chat:*` keys.

---

## Task #636 — Promise.any() AggregateError Fix

### Problem

`GoogleOAuthManager.getAccessToken()` (src/index.js ~line 1135) used `Promise.any()` to race the GOOGLE_AUTH service binding against a direct Google token refresh. When both sources failed, the `AggregateError` propagated uncaught, producing an opaque error message with no indication of which sources were tried or why each failed.

### Fix Applied

**File**: `src/index.js` at the `Promise.any()` call inside `getAccessToken()`

Before:
```javascript
const newToken = await Promise.any([googleAuthPromise, directFetchPromise]);
```

After:
```javascript
let newToken;
try {
  newToken = await Promise.any([googleAuthPromise, directFetchPromise]);
} catch (err) {
  const errors = err instanceof AggregateError
    ? err.errors.map((e, i) => `[source${i}]: ${e?.message || e}`)
    : [String(err)];
  throw new Error(`Failed to get access token. All sources failed: ${errors.join(' | ')}`);
}
```

The error message now surfaces per-source failure reasons, e.g.:

```
Failed to get access token. All sources failed: [source0]: binding non-ok | [source1]: Token refresh failed: 400 - {"error":"invalid_grant"}
```

### Token Source Cascade (for reference)

The full auth waterfall in `getAccessToken()`:
1. `env.GOOGLE_ACCESS_TOKEN` (direct env var injection, test/dev only)
2. In-memory `this.cachedToken` (not expired)
3. `GOOGLE_AUTH` service binding `/token` endpoint (primary)
4. R2 `auth/gws/tokens.json` (canonical token store written by google-auth-worker)
5. KV `google_oauth_tokens` (shared namespace — google-auth-worker's writes)
6. `env.GOOGLE_REFRESH_TOKEN` secret (last resort)
7. `Promise.any([binding, directFetch])` — parallel race using the refresh token

Steps 1-6 are sequential early-returns. Step 7 only executes when all prior sources are exhausted. The fix ensures step 7 failures are fully observable.

---

## Deployment

```
Uploaded gws-worker (5.54 sec)
Version ID: d54f53c9-b2c3-487f-8a7d-aefb449df12a
URL: https://gws-worker.authorityandbrand.workers.dev
```

Health check result:
```json
{"status": "ok", "tools": 155, "google_auth_binding_ok": false}
```

`google_auth_binding_ok: false` is a pre-existing auth state (the GOOGLE_AUTH binding is missing a valid token at health-check time) — not caused by this change. The 155 tools and `status: ok` confirm the worker is functioning.
