# GWS Port Report — Task #622

**Date**: 2026-05-15
**Source audit**: `/Users/jwin/d1-rest-worker/docs/gws-gap-audit.md`
**Modified file**: `/Users/jwin/gws-worker/src/index.js` (7960 → 9030 lines, +1070 lines)

---

## Summary

Ported A5 (6 Gemini shortcut wrappers) and A7 (24 specialized handler groups, ~154 actions) from d1-rest-worker to gws-worker. All GoogleWorkspaceClient methods already existed in gws-worker — only the `callTool` switch cases and GROUPED_TOOLS definitions were missing.

**Total new callTool cases added**: 136
**Total new GROUPED_TOOLS entries added**: 30 (6 A5 shortcuts + 24 A7 service groups)

---

## Ported: A5 — Gemini Shortcut Wrappers

| Tool name | Description | Notes |
|-----------|-------------|-------|
| `gemini_analyze_image` | Multimodal image analysis via Gemini | Supports image_url, image_data (base64), drive_file_id (native Drive ref), file_uri (Gemini File API) |
| `gemini_generate_json` | Structured JSON output shortcut | Automatically sets `responseMimeType: application/json` |
| `gemini_think` | Thinking/reasoning mode shortcut | Sets `thinkingBudget` (default 8192) + `temperature: 1` |
| `gemini_run_code` | Code execution shortcut | Enables `codeExecution: true`; accepts `code` (Python) or `prompt` |
| `gemini_chat` | Multi-turn chat with KV-persisted history | Sessions keyed `gemini_chat:{sessionId}` in env.CACHE; 24h TTL; max 20 turns |
| `gemini_clear_chat` | Delete a KV chat session | Deletes `gemini_chat:{sessionId}` from env.CACHE |

**Required binding**: `CACHE` (KV namespace) for `gemini_chat` and `gemini_clear_chat`. Gracefully degrades to stateless if CACHE is absent.

---

## Ported: A7 — 24 Specialized Handler Groups

### YouTube Data v3

Tool name: `youtube` | 16 actions

| Action | gws method |
|--------|------------|
| `list_channels` | `gws.listYouTubeChannels()` |
| `search` | `gws.searchYouTube(query, {maxResults})` |
| `get_video` | `gws.getYouTubeVideo(videoId)` |
| `list_videos` | `gws.listYouTubeVideos(channelId, playlistId, maxResults)` |
| `get_comments` | `gws.getYouTubeVideoComments(videoId, maxResults)` |
| `post_comment` | `gws.postYouTubeComment(videoId, text)` |
| `reply_comment` | `gws.replyYouTubeComment(parentId, text)` |
| `list_playlists` | `gws.listYouTubePlaylists()` |
| `create_playlist` | `gws.createYouTubePlaylist(title, description)` |
| `add_to_playlist` | `gws.addVideoToPlaylist(playlistId, videoId)` |
| `get_subscriptions` | `gws.getYouTubeSubscriptions()` |
| `update_video` | `gws.updateYouTubeVideo(videoId, metadata)` |
| `analytics` | `gws.getYouTubeAnalytics({startDate, endDate, metrics})` |
| `get_channel` | `gws.getYouTubeChannel(channelId)` |
| `list_live_streams` | `gws.listYouTubeLiveStreams()` |
| `get_captions` | `gws.getYouTubeCaptions(videoId)` |

Required OAuth scopes: `youtube`, `youtube.force-ssl`, `youtubepartner`

---

### Google Classroom

Tool name: `classroom` | 13 actions

All 13 actions from audit: `list_courses`, `get_course`, `create_course`, `list_students`, `list_teachers`, `list_coursework`, `create_coursework`, `list_submissions`, `grade_submission`, `list_announcements`, `create_announcement`, `list_topics`, `create_topic`.

Required OAuth scope: `classroom.courses`, `classroom.coursework.students`, `classroom.rosters`

---

### Google Keep

Tool name: `keep` | 4 actions: `list_notes`, `get_note`, `create_note`, `delete_note`

Required OAuth scope: `keep` (note: Google Keep API may require special access approval for non-GSuite apps)

---

### Google Photos

Tool name: `photos` | 7 actions: `list_albums`, `get_album`, `create_album`, `search`, `get_media_item`, `list_media_items`, `share_album`

Required OAuth scope: `photoslibrary`, `photoslibrary.readonly`

---

### Google Analytics / GA4

Tool name: `analytics` | 4 actions: `list_accounts`, `list_properties`, `run_report`, `realtime_report`

Required OAuth scope: `analytics.readonly`

---

### Admin Directory

Tool name: `admin` | 15 actions: `list_users`, `get_user`, `create_user`, `suspend_user`, `list_groups`, `get_group`, `create_group`, `list_group_members`, `add_group_member`, `remove_group_member`, `list_org_units`, `list_domains`, `list_roles`, `audit_activities`, `usage_report`

Required OAuth scope: `admin.directory.user`, `admin.directory.group`, `admin.directory.orgunit`, `admin.reports.audit.readonly`

---

### Gemini Models/Tuning API

Tool name: `gemini_tuning` | 6 actions: `list_models`, `generate_content`, `count_tokens`, `embed_content`, `list_tuned_models`, `create_tuning_job`

Required OAuth scope: `generative-language.tuning`, `generative-language.retriever`

---

### NotebookLM Corpus / Discovery Engine

Tool name: `nlm_corpus` | 9 actions: `list_corpora`, `create_corpus`, `get_corpus`, `delete_corpus`, `list_documents`, `create_document`, `add_chunk`, `query_corpus`, `generate_answer`

Required OAuth scope: `discoveryengine.readwrite` (NOT in current live token — requires re-auth. Discovery Engine API must be enabled in GCP console.)

---

### Blogger

Tool name: `blogger` | 7 actions: `list_blogs`, `list_posts`, `get_post`, `create_post`, `update_post`, `delete_post`, `list_comments`

Required OAuth scope: `blogger`

---

### Search Console

Tool name: `search_console` | 5 actions: `list_sites`, `performance`, `inspect_url`, `list_sitemaps`, `submit_sitemap`

Required OAuth scope: `webmasters.readonly`

---

### Cloud Translation

Tool name: `translate` | 3 actions: `translate_text`, `detect_language`, `list_supported_languages`

Required: `cloud-platform` scope (already included in GOOGLE_SCOPES)

---

### BigQuery REST

Tool name: `bigquery` | 3 actions: `list_datasets`, `list_tables`, `query`

Required OAuth scope: `bigquery` (already in GOOGLE_SCOPES)

---

### Pub/Sub

Tool name: `pubsub` | 5 actions: `list_topics`, `create_topic`, `publish`, `list_subscriptions`, `pull`

Required: `cloud-platform` scope

---

### Firebase Management

Tool name: `firebase` | 2 actions: `list_projects`, `get_project`

Required: `cloud-platform` scope, Firebase Management API enabled in GCP

---

### Cloud Storage

Tool name: `cloud_storage` | 4 actions: `list_buckets`, `list_objects`, `upload`, `delete`

Required: `cloud-platform` scope, `devstorage.full_control`

---

### Tag Manager

Tool name: `tag_manager` | 3 actions: `list_accounts`, `list_containers`, `list_tags`

Required OAuth scope: `tagmanager.readonly`

---

### Speech-to-Text

Tool name: `speech` | 2 actions: `recognize`, `long_running_recognize`

Required: `cloud-platform` scope, Cloud Speech-to-Text API enabled

---

### Text-to-Speech

Tool name: `tts` | 3 actions: `text_to_speech`, `text_to_speech_ssml`, `list_voices`

Required: `cloud-platform` scope, Cloud Text-to-Speech API enabled

---

### Cloud Natural Language

Tool name: `nlp` | 4 actions: `analyze_entities`, `analyze_sentiment`, `classify_text`, `annotate_text`

Required: `cloud-platform` scope, Cloud Natural Language API enabled

---

### Workspace Events API

Tool name: `workspace_events` | 3 actions: `create_subscription`, `list_subscriptions`, `delete_subscription`

Required: `cloud-platform` scope, Workspace Events API enabled. Requires a Pub/Sub topic to route events.

---

### Google Maps

Tool name: `maps` | 6 actions: `geocode`, `reverse_geocode`, `search_places`, `place_details`, `directions`, `distance_matrix`

Note: Maps APIs use `GOOGLE_CLOUD_API_KEY` (not OAuth). The key must be set as a wrangler secret on gws-worker. All 6 actions call the `maps.googleapis.com` endpoints via the existing GoogleWorkspaceClient methods.

---

### Drive Activity API

Tool name: `drive_activity` (grouped with action `query`) | 1 action

Note: There is also an existing flat `drive_activity` tool in the `TOOLS` array (no action parameter) that maps directly to `gws.queryDriveActivity(args)`. The new grouped version (`action: "query"`) maps to `drive_activity_query` in callTool and is equivalent. Both paths work — callers can use either.

Required OAuth scope: `drive.activity.readonly` (already in GOOGLE_SCOPES)

---

### Gemini File API

Tool name: `gemini_file` | 4 actions: `upload`, `list`, `get`, `delete`

Note: These are distinct from the already-existing flat tools `gemini_upload_file`, `gemini_list_files`, `gemini_get_file`, `gemini_delete_file` in the `TOOLS` array (which use camelCase `displayName`, `mimeType`). The new grouped tool provides the same functionality under grouped dispatch.

Required: `GEMINI_API_KEY` or OAuth `cloud-platform` scope

---

### Long-Running Operations

Tool name: `operation` | 1 action: `get_status`

Routes to `gws.getGenaiOperation()` for Gemini/generativelanguage operations and `gws.getOperation()` for other Cloud operations, auto-detected by operation name prefix.

---

## Skipped (with reasons)

| Section | Item | Reason |
|---------|------|--------|
| A1 | D1/KV/R2 ↔ Drive sync | gws-worker has no D1/KV/R2 bindings — must stay in d1-rest permanently |
| A2 | Drive → NotebookLM add-to-notebook | Depends on NLM migration; skip until notebooklm-rpc → NLM_WORKER binding is complete |
| A3 | `/workspace/drive/*` REST routes | CF-specific (D1/R2 bindings required); stay in d1-rest permanently |
| A4 | `/workspace/automation/*` routes | Depends on gws-automation.ts module not present in gws-worker; skip for now |
| A6 | gemini_worker proxy tools | gws-worker does not have (and should not have) a GEMINI_WORKER service binding — that's a d1-rest concern. Skip. |

---

## OAuth Scope Notes

The current `GOOGLE_SCOPES` list in gws-worker already covers the vast majority of required scopes via `cloud-platform`. Gaps:

- **Google Keep**: May require special API access approval
- **NotebookLM/Discovery Engine**: `discoveryengine.readwrite` scope is commented out in GOOGLE_SCOPES — requires re-auth to activate after enabling the API in GCP console
- **Google Maps**: Uses `GOOGLE_CLOUD_API_KEY` secret (not OAuth) — must be set via `wrangler secret put GOOGLE_CLOUD_API_KEY --name gws-worker`

---

## Implementation Notes

1. All new `callTool` cases use dual-format parameter handling (camelCase and snake_case both accepted, e.g. `args.videoId ?? args.video_id`) to match both gws-worker callers (camelCase) and d1-rest proxy callers (snake_case).
2. The `gemini_chat` and `gemini_clear_chat` tools require `env.CACHE` (KV). If CACHE is absent, chat history is not persisted (stateless mode, no error thrown).
3. All methods delegate to the existing `GoogleWorkspaceClient` instance — no new API client code was added.
4. GROUPED_TOOLS dispatch pattern: `{toolName}_{action}` → callTool case. E.g., calling tool `youtube` with `action: "search"` dispatches to `youtube_search` case.
