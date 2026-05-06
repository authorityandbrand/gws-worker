# Changelog

## [Unreleased]

## [2026-05-06]

### Added
- **Meet tool** — New `meet` grouped MCP tool with 9 actions: `create`, `get`, `update`, `end`, `conferences`, `participants`, `recordings`, `transcripts`, `transcript_entries`. All 7 `GoogleWorkspaceClient` Meet methods were already coded; this wires them as MCP tools. Verified: creates live Meet space in 623ms.
- **Gmail settings actions** — Added 6 new actions to the `gmail` grouped tool: `vacation` (set auto-reply), `get_vacation` (read current settings), `send_as` (list aliases), `delegates` (list delegates), `add_delegate`, `remove_delegate`. All backed by existing `GoogleWorkspaceClient` methods.
- **PropertiesOps.gs in Apps Script** — Added `PropertiesOps.gs` to script `19WZwwof9Fm8aEj2-...` with 8 functions: `getScriptProperty`, `setScriptProperty`, `getAllScriptProperties`, `setScriptProperties`, `deleteScriptProperty`, `getUserProperty`, `setUserProperty`, `getAllUserProperties`. Callable via `script/run` MCP tool with `devMode: true`.
- **BrainAPI.gs properties routes** — Added `prop_get`, `prop_all`, `prop_set`, `prop_set_all`, `prop_delete`, `user_prop_get`, `user_prop_all`, `user_prop_set` to `doGet`/`doPost` Web App endpoints.

### Fixed
- **`script_run` 404 bug** — `runScriptFunction` now passes `devMode: true` by default, resolving 404 "Requested entity was not found" errors on scripts without a published EXECUTION_API deployment. Set `devMode: false` explicitly to require a published deployment.
- **`calendar_freebusy` crash** — Worker crashed with `Cannot read properties of undefined (reading 'map')` when `calendarIds` param was undefined. Now defaults to `["primary"]` and accepts both `calendarIds` and `calendars` param names.
- **`drive_about` missing fields** — `getDriveSupportedFormats` was only requesting `importFormats,exportFormats`. Now requests `user,storageQuota,importFormats,exportFormats`, returning user identity and storage quota.

### Changed
- `script_run` MCP tool description updated to document `devMode` parameter.
- `calendar` grouped tool description updated: `calendarIds` now accepts both spellings (`calendars` alias supported).

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
