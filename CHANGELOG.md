# Changelog

## [Unreleased]

## [2026-05-16] — MCP audit fixes + health-check expanded (`44e9453`)

### Fixed — mcp-health-check.py now covers all 5 custom workers

- **`scripts/mcp-health-check.py`** `SERVERS` list: added `brain`, `Browser` (browser-auth-worker), and `Nguyen API` entries with UUIDs and `expected_tools` lists. `--refresh` and auto-heal now clear the claude.ai schema cache for all 5 workers instead of just Gemini and G Workspace.

### Chore — wrangler.jsonc documentation and tail worker binding

- **`wrangler.jsonc`**: added `tail_consumers` entry pointing to `legal-tail-worker` for cross-worker error aggregation; added inline AI Gateway documentation comment explaining URL-based routing pattern.

## [2026-05-16] — Session 8 (shortsaledfw@gmail.com multi-account Gmail + Drive docket enrichment fix)

### Added — Multi-account Gmail support for shortsaledfw@gmail.com

- **`src/index.js`** — `GoogleOAuthManager.getShortsaleToken(env)`: fetches a fresh access token using `SHORTSALE_CLIENT_ID`/`SHORTSALE_CLIENT_SECRET` + `GOOGLE_REFRESH_TOKEN_SHORTSALE` secrets. Isolate-level cache (60s buffer before expiry) so each request avoids a token exchange round-trip.
- **`src/index.js`** — `GoogleWorkspaceClient._gmailTokenOverride` + `setGmailTokenOverride(token)`: per-request token override that `token()` returns instead of the default `authorityandbrand@gmail.com` token.
- **`src/index.js`** — `callTool()` dispatch: when `gmail_account: "shortsaledfw@gmail.com"` (or `"shortsale"`) is passed on any `gmail_*` tool, calls `getShortsaleToken()` and sets the override before the handler runs.
- **Secrets stored** (via `wrangler secret put`):
  - `GOOGLE_REFRESH_TOKEN_SHORTSALE` — new OAuth2 refresh token for `shortsaledfw@gmail.com` from `authorityandbrand-workspace` project
  - `SHORTSALE_CLIENT_ID` — `see wrangler secret (redacted from changelog)`
  - `SHORTSALE_CLIENT_SECRET` — `see wrangler secret (redacted from changelog)`
- **Usage**: `gmail_search { query: "...", gmail_account: "shortsaledfw@gmail.com" }` — returns messages from Cat's shortsale inbox with its own OAuth token (not authorityandbrand's)

### Fixed — Drive file IDs never injected into docket enrichment Gemini calls

- **`nguyen-legal-app/src/api/docket-sync.ts`** — `drive_catalog.docket_number` stores plain integer strings (`"27"`) but the query was binding `"Dkt-27"` (the formatted label). Fixed to bind `entry.docket_number` (integer) via `CAST(? AS TEXT)`. Result: 13,035+ Drive PDFs are now eligible to be passed as context to Gemini during docket enrichment.
- **`docket-sync.ts`** — `callGemini` updated to use `model: 'gemini-3-pro-advanced'` (web-cookie path model name) with `notebooks: true`.

### Deployed

- Version `e31c6742-0fd3-4a24-ad7a-e558294ee10d` at `https://gws-worker.authorityandbrand.workers.dev`
- Verified: `gmail_search` with `gmail_account: "shortsaledfw@gmail.com"` returns inbox messages (201 results in inbox, 5 returned in test).

## [2026-05-15] — Session 7 (CF AI Gateway routing for Gemini calls)

### Changed — Route all Gemini API calls through CF AI Gateway

- **`src/index.js`** — Added `GEMINI_DIRECT_BASE` and `GEMINI_GATEWAY_URL` constants (account `e105d76aa6c851abdbd13d34d901cc7c`, gateway `automation-hub`, provider `google-ai-studio`). Matches the pattern already used in `gemini-webapi-worker`.
- **`googleFetch()`** — Now transparently rewrites any URL starting with `https://generativelanguage.googleapis.com` to the CF AI Gateway equivalent before fetch. Falls back to the direct Google endpoint if the gateway returns a 5xx response. This covers 24 of the 27 Gemini call sites in one patch.
- **`deleteNotebookCorpus()`**, **`geminiUploadFile()`**, **`geminiDeleteFile()`** — Three raw `fetch()` calls that bypassed `googleFetch()` updated individually to use the gateway URL with the same 5xx fallback pattern.
- **`geminiGenerate()` API-key fallback path** — The `GEMINI_API_KEY` fallback branch (OAuth fails → use API key) also routes through the gateway with 5xx fallback to direct endpoint.
- **`wrangler.jsonc`** — Added explanatory comment documenting the gateway approach. URL-based routing used instead of `[[ai_gateways]]` TOML binding (not supported in JSONC format with wrangler 4.87.0).
- **Result**: All 27 call sites to `generativelanguage.googleapis.com` now route through `gateway.ai.cloudflare.com/v1/…/automation-hub/google-ai-studio`. OAuth Bearer tokens pass through unchanged.
- **Deployed**: Version `18f6a458-562b-48bc-ba5d-d9cf3c2a9006` at `https://gws-worker.authorityandbrand.workers.dev`

## [2026-05-15] — Session 6 (CLI Tooling + Google Services Gap Analysis)

### Infrastructure — Local tooling installed

- **Printing Press v4.6.1** — Binary at `~/go/bin/printing-press`. 9 skills installed: `printing-press`, `printing-press-catalog`, `printing-press-import`, `printing-press-output-review`, `printing-press-polish`, `printing-press-publish`, `printing-press-reprint`, `printing-press-retro`, `printing-press-score`.
- **arxiv v3.0.0** — Python library for arXiv research paper retrieval (installed via pip3.14 for Python 3.14.3 default).
- **sec-edgar-downloader v5.1.0** — SEC EDGAR filing downloader (installed via pip3.14).
- **sentry-cli v3.4.2** — Sentry error tracking CLI at `/usr/local/bin/sentry-cli`. Auth token configuration pending (task #647).

### Verified — Circuit breaker operational in d1-rest for GWS_WORKER proxy

- d1-rest `gwsHealthOk()` KV-backed health flag correctly fast-fails GWS proxy at `index.ts:13312-13320` when `gws_health_ok` flag is `'false'` in shared CACHE namespace. No code change needed.

## [2026-05-07] — Session 5 (Drive Projects / Workspaces API + Legal Agent Factory)

### Added — Apps Script project (19WZwwof9Fm8...)

- **`AgentFactory.gs`** (new, 20 functions) — Legal Domain Agent Factory with 12 pre-configured domain agents: `foreclosure`, `bankruptcy`, `constitutional`, `respa_tila`, `fay_servicing`, `jpmorgan_chase`, `fannie_mae`, `criminal_rico`, `haf_fraud`, `damages`, `federal_case`, `smoking_guns`. Core: `buildAllAgents()` scaffolds all 12 Drive Projects + agents in one call. `ask(domain, question)` routes to the right specialist. `askAll(question)` fans out to all agents. `buildDomainAgent(domain)` auto-discovers Drive files by search term, creates workspace, adds sources, builds persisted Gemini agent. Domain-specific shortcuts: `askForeclosure`, `askBankruptcy`, `askConstitutional`, `askRespa`, `askFay`, `askDamages`, `askFederal`, `askRico`.

- **`WorkspaceOps.gs`** (new, 11 functions) — Drive "Projects" internal API (`clients6.google.com/drive/v2internal/workspaces`). Full CRUD on workspaces/projects: `listWorkspaces`, `createWorkspace`, `getWorkspace`, `renameWorkspace`, `deleteWorkspace`. Item management: `listWorkspaceItems`, `addFileToWorkspace`, `removeFileFromWorkspace`. Extras: `getPriorityItems` (drive-pa suggested files), `syncFolderToWorkspace` (syncs a ProjectOps folder into a Drive Project), `testWorkspaceAPI` (probes API availability). Auth via `ScriptApp.getOAuthToken()` — no `$rpcToken` CSRF needed from Apps Script context.

### Research — Drive Projects API endpoints

- **API base**: `https://clients6.google.com/drive/v2internal`
- **List all projects**: `GET /workspaces?alt=json`
- **Create project**: `POST /workspaces` → `{"title":"..."}`
- **Get/Patch/Delete project**: `GET|PATCH|DELETE /workspaces/{workspaceId}`
- **List files in project**: `GET /workspaces/{workspaceId}/items`
- **Add file**: `POST /workspaces/{workspaceId}/items` → `{"fileId":"..."}`
- **Remove file**: `DELETE /workspaces/{workspaceId}/items/{fileId}`
- **Suggested files**: `GET https://drive-pa.googleapis.com/v1/workspaces`
- Common params: `alt=json`, `prettyPrint=false`; browser adds `$rpcToken` + `key` CSRF params (not needed from Apps Script OAuth)

## [2026-05-08] — Session 4 (Gemini gap analysis + implementation)

### Added — Apps Script project (19WZwwof9Fm8...)

- **`ProjectOps.gs`** (new, 4 functions) — Standardized case sub-project scaffolding in Drive: `createProject` (folder + 5 subfolders + Case Log sheet), `listProjects`, `getProjectStructure`, `createProjectNote`. Parent defaults to `CASE_ROOT`; override via `projects_root_id` script property. Drive's built-in "Projects" view is a UI label with no folder ID — real folders created in Drive.
- **`ExhibitOps.gs`** (new, 6 functions) — EDTX Local Rule CV-43 exhibit list management: `initExhibitSheet`, `addExhibit` (auto-numbers PX-001+), `buildExhibitListFromSmokingGuns` (auto-populates from /api/smoking-guns), `getExhibitList`, `markExhibitAdmitted`, `exportExhibitReport`.
- **`WorkerOps.gs` — `dailyAutomation()`** (was missing despite CHANGELOG entry) — Orchestrates: `deadlineReminderJob`, `monitorAndAlert`, `checkDocket`, `trialCountdown`. Install via `installDailyAutomation()`.
- **`WorkerOps.gs` — `trialCountdown()`** — Calculates days to trial (Feb 1, 2027). Emails top 5 smoking guns if ≤ 30 days remain.
- **`WorkerOps.gs` — `listProcesses(maxResults)` / `killProcess(operationName)`** — Apps Script Processes API (`script.googleapis.com/v1/processes`) for monitoring trigger executions. Requires `script.processes` OAuth scope (added to manifest).
- **`AIOps.gs` — `analyzeViolation(violationId)`** — Fetches violation row from Worker API, injects full context (type, statute, defendant, factual basis, damages), runs Gemini trial strategy analysis.
- **`AIOps.gs` — `draftViolationArgument(violationId)`** — Calls `analyzeViolation` then drafts a structured trial argument (assertion → facts → legal standard → damages ask).
- **`NotebookOps.gs` refactored** — Now routes all NLM calls through `callGWSMCP` instead of a separate notebook agent script. New functions: `addTextToNotebook`, `syncCaseToNotebook`, `prepDepositionNotebook` (pulls smoking guns + violations per defendant, creates structured depo-prep note in NLM).
- **`CalendarOps.gs` — docket dedup fixed** — `syncDeadlinesFromDocket` now uses `entry_number` stored in event description as the stable dedup key (prevents duplicate events when courts correct dates by 1 day).
- **`appsscript.json`** — Added `script.processes` OAuth scope.
- **`CLI.gs`** — Added dispatches and help entries for all new functions across all 5 updated/new modules.

### Manual steps required (new)

- Run `installDailyAutomation()` from editor — installs daily 7am orchestration trigger (covers deadline, email, docket, trial countdown)
- `run('setScriptProperty', {key:'projects_root_id', value:'<your-projects-folder-id>'})` — optional; defaults to CASE_ROOT
- `run('buildExhibitListFromSmokingGuns')` — auto-populate exhibit list from the 24 smoking guns

## [2026-05-08] — Session 3

### Added — Apps Script project `callGWSMCP` bridge (19WZwwof9Fm8...)

- **`callGWSMCP(toolName, action, args)` in Config.gs** — Universal bridge function routing all AI/GWS calls from Apps Script through the Cloudflare `gemini-webapi-worker`. POSTs MCP JSON-RPC 2.0 to `https://gemini-webapi-worker.authorityandbrand.workers.dev/mcp`. No auth required (SESSION_KEY is unset on that worker). URL overridable via `gws_worker_url` script property; optional `gws_session_key` property for future auth.
- **`MODEL_DEFAULTS` updated** in Config.gs — now points to current Gemini 2.5 models: `LEGAL: 'gemini-2.5-pro'`, `FAST: 'gemini-2.5-flash'`, `THINKING: 'gemini-2.5-pro'`, `CLAUDE: 'claude-sonnet-4-6'`, `HAIKU: 'claude-haiku-4-5'` (was gemini-1.5-pro/flash).
- AIOps.gs `_aiGenerate()` now fully functional — calls `callGWSMCP('gemini', 'generate', {prompt, model, systemInstruction, temperature})` which resolves through the Cloudflare edge worker.

### Fixed — Apps Script project (19WZwwof9Fm8...)

- **Second accidental file deletion** — Update call that passed only 2 files reduced project from 16 to 2 files. Restored all 16 files from `/tmp/all16_files.json` snapshot (includes new Config.gs with `callGWSMCP`).

## [2026-05-08] — Session 2

### Fixed — Apps Script project recovery (19WZwwof9Fm8...)

- **Project fully restored** — An `update_content` call with only 2 files had reduced the project from 13 to 2 files. All 13 files recovered from pre-deletion GET snapshot and restored via `mcp__google-workspace__script` update action.
- **AIOps.gs confirmed correct** — `callGWSMCP` + `MODEL_DEFAULTS.LEGAL` routing verified in restored state; no `gemini-1.5-flash-002` or direct Vertex AI REST calls remain.

### Added — Apps Script project (19WZwwof9Fm8...)

- **`EmailMonitorOps.gs`** (new file, 8 functions) — Gmail monitoring for opposing counsel and case keywords: `scanOpposingCounsel`, `scanCaseCommunications`, `getUnreadCaseEmails`, `flagImportantEmail`, `createEmailSummary`, `monitorAndAlert`, `installEmailMonitor`, `setupEmailLabels`. Set `opposing_domains` via `run('setScriptProperty', {key:'opposing_domains', value:'firm1.com,firm2.com'})`.
- **`CalendarOps.gs` upgraded** (7 functions) — Replaced basic 6-function version with deadline-focused implementation: `getUpcomingDeadlines`, `addDeadline`, `listHearingDates`, `deadlineReport`, `syncDeadlinesFromDocket` (pulls `/api/docket` from legal worker, dedupes), `deadlineReminderJob` (trigger target), `installDeadlineReminders` (daily 8am trigger).
- **`CLI.gs` updated** — Added dispatches for all new CalendarOps + EmailMonitorOps functions. Added inline `setScriptProperty`, `getScriptProperty`, `deleteScriptProperty` dispatches (no separate PropertiesOps file needed). Removed stale old CalendarOps dispatches.

### Manual steps required

- Run `installDeadlineReminders()` from Apps Script editor — installs daily 8am deadline alert trigger
- Run `installEmailMonitor()` from Apps Script editor — installs 6-hour email scan trigger
- Set `opposing_domains`: `run('setScriptProperty', {key:'opposing_domains', value:'firm1.com,firm2.com'})`
- Run `setupEmailLabels()` once to create Gmail labels (Opposing-Counsel, Case-Important, Court-Filing, Case-Correspondence)

## [2026-05-08]

### Added — Apps Script project automation expansion (19WZwwof9Fm8...)

- **`CalendarOps.gs`** (new file, 8 functions) — Court deadline and hearing tracking via CalendarApp:
  - `getUpcomingDeadlines(days)` — events in next N days from the case calendar
  - `addDeadline(title, dateStr, notes, isHearing)` — create all-day case deadline events
  - `listHearingDates()` — filter events matching hearing/trial/conference/deposition/argument
  - `deadlineReport(days)` — emoji-coded formatted summary with urgency indicators (7d=🚨, 14d=⚠️)
  - `syncDeadlinesFromDocket()` — pull legal API `/api/docket` entries and create calendar events (deduped)
  - `deadlineReminderJob()` — trigger target: emails if events within 7 days
  - `installDeadlineReminders()` — installs daily 8am trigger (run from editor)

- **`EmailMonitorOps.gs`** (new file, 8 functions) — Gmail monitoring for opposing counsel:
  - `scanOpposingCounsel(days)` — search by domains from `opposing_domains` script property
  - `scanCaseCommunications(days)` — full-text scan for case keywords (Nguyen, Fay Servicing, QWR, etc.)
  - `getUnreadCaseEmails(days)` — unread case-related emails
  - `flagImportantEmail(threadId, labelName)` — create label if needed and apply to thread
  - `createEmailSummary(days)` — formatted report with opposing + unread sections
  - `monitorAndAlert()` — trigger target: emails if any opposing/unread in past 24h
  - `installEmailMonitor()` — installs 6-hour trigger (run from editor)
  - `setupEmailLabels()` — creates Opposing-Counsel / Case-Important / Court-Filing / Case-Correspondence labels

### Fixed — Apps Script project

- **`CitationOps.gs`** — Moved hardcoded CourtListener token to `PropertiesService` via `_clToken()` helper (fallback to original value). `getDocket()` now accepts optional `docketId` param, reads from `cl_docket_id` property. Added `setupCitationProperties()` (run once; already executed — token and docket ID now in script properties).
- **`MemoryOps.gs`** — `memoryCompile()` now calls `zkCreateLink()` to link compiled notes to ZK hub (prevents orphans). Cross-links notes compiled in the same session to each other. `memoryLogs(days)` now accepts optional `days` filter. `sendMail()` signature unified to `(subject, body)` — sends to self.
- **`CLI.gs`** — `help()` fixed: removed stale `VertexOps_new` namespace, merged into `VertexOps`. Added `deleteJsFile` to JsOps list. Added `CalendarOps` and `EmailMonitorOps` namespaces. Added dispatches for all 14 new functions.
- **`BrainAPI.gs`** — Added Calendar and Email routes to Web App: `calendar_upcoming`, `calendar_hearings`, `calendar_report` (GET), `calendar_add`, `calendar_sync_docket` (POST), `email_opposing`, `email_unread`, `email_scan`, `email_summary` (GET), `email_flag`, `email_labels`, `email_monitor` (POST).
- **`OrganizeOps.gs`** — Replaced stale hardcoded file IDs in `organizeAll()` with a configurable moves array (empty by default — add entries as needed). `pendingMoves()` now dynamically returns Working Drafts files older than 7 days with suggestions.
- **`SheetsOps.gs`** — All functions now accept optional `sheetId` parameter, enabling reads/writes to ZK_INDEX or any other workbook (no longer locked to MASTER_WORKBOOK).
- **`WorkerOps.gs`** — `dailyAutomation()` now includes `deadlineCheck` (calls `deadlineReminderJob`) and `emailMonitor` (calls `monitorAndAlert`) in the daily sweep.

### Manual steps required

- Run `installDeadlineReminders()` from Apps Script editor to install the daily 8am deadline alert trigger
- Run `installEmailMonitor()` from Apps Script editor to install the 6-hour email monitoring trigger  
- Set `opposing_domains` property: `run('setScriptProperty', {key:'opposing_domains', value:'firm1.com,firm2.com'})`
- Re-auth at `google-auth-worker.authorityandbrand.workers.dev/auth` to pick up `drive.labels` and Meet scopes added in 2026-05-07

## [2026-05-07]

### Added
- **Full Apps Script expansion** — `script` grouped tool now has 24 actions (was 16). New actions:
  - `get_info` — project metadata (title, parentId, createTime, updateTime) via `GET /v1/projects/{id}`, separate from the source content endpoint
  - `add_file` — add or replace a single `.gs`/`.html`/`.json` file without touching other files (GET + merge + PUT)
  - `delete_file` — remove one file by name without affecting others
  - `manifest` — get the parsed `appsscript.json` manifest object
  - `set_manifest` — update the manifest, merging with existing by default
  - `add_scope` — surgically add one OAuth scope URL to `oauthScopes` (non-destructive)
  - `run_batch` — execute multiple functions sequentially in one call, with per-call `stopOnError`
  - `trigger_code` — generate ready-to-paste installable trigger code (time/calendar/spreadsheet/form triggers)
- **Drive Labels actions** — Wired 6 new actions to the `drive` grouped tool: `labels` (list all), `get_label`, `create_label`, `apply_label` (attach label to file with field values), `file_labels` (list labels on a file), `remove_label`. Backed by existing `GoogleWorkspaceClient` methods (lines 4826–4858). Requires `drive.labels` scope re-auth.
- **`drive.labels` OAuth scope** — Added to `google-auth-worker` `GOOGLE_SCOPES` and re-deployed; new re-auth via `/auth` will include Drive Labels access.
- **Meet OAuth scopes** — Added `meetings.space.created` and `meetings.space.readonly` to `google-auth-worker`; wired Meet tool from prior session now has correct scope grant on next re-auth.

### Fixed
- **Drive Labels inputSchema** — Added `labelId`, `labelType`, `fields` params to `drive` tool's inputSchema properties.

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
