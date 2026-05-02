# Changelog

## [Unreleased]

## [2026-05-02]

### Changed
- Normalized service binding from `AUTH` to `GOOGLE_AUTH` throughout token refresh cascade
- `GOOGLE_AUTH.fetch()` health check now included in `/health` response (`google_auth_binding_ok`)
- OAuth `/google/auth` endpoint returns informational HTML page when no `redirectUri` is present instead of crashing
- Error message on missing refresh token now references d1-rest worker (not the old direct auth path)
- Removed `chat.bot` scope from `GOOGLE_SCOPES` — requires Chat app approval, not valid for standard OAuth flows
- Updated `cloud-platform` scope comment: clarifies it covers Gemini `generateContent`; `generative-language.*` are sub-scopes for tuning/retrieval only
- Admin SDK comment updated: directory management (write ops) now documented alongside read-only access

### Docs
- `CLAUDE.md`: Corrected line number references throughout (4910→7474, 6529→6542, 6957→6979)
- `CLAUDE.md`: Updated tool counts (109 individual → ~153, ~17 grouped → 17)
- `CLAUDE.md`: Corrected binding name `AUTH` → `GOOGLE_AUTH` in architecture description

## [2026-04-30]

### Changed
- `refactor`: Normalize to `GOOGLE_AUTH` binding, remove direct KV writes, parallel token fallback
- `fix`: Handle 204 No Content and empty JSON bodies in `googleFetch`
