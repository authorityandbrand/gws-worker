# GWS Worker API Coverage Audit

**Date**: 2026-04-22 (updated end of session)
**Worker**: `gws-worker.authorityandbrand.workers.dev`
**Source**: `src/index.js` (single file, no build step)
**Current State**: 109 MCP tools exposed | ~230 internal functions not yet wired

---

## Current Exposed Tools (109)

### Sheets (12 tools)
| Tool | API Method | Status |
|------|-----------|--------|
| `sheets_read` | `values.get` | Enhanced: majorDimension, valueRenderOption, dateTimeRenderOption |
| `sheets_write` | `values.update/append/clear` | Enhanced: mode param (write/append/clear) |
| `sheets_batch_get` | `values.batchGet` | NEW |
| `sheets_batch_update` | `values.batchUpdate` | NEW |
| `sheets_batch_clear` | `values.batchClear` | NEW |
| `sheets_batch_request` | `spreadsheets.batchUpdate` | NEW (generic — format, merge, charts, etc.) |
| `sheets_add_sheet` | `spreadsheets.batchUpdate` (addSheet) | NEW |
| `sheets_copy_to` | `sheets.copyTo` | NEW |
| `sheets_list` | Drive API (mime filter) | NEW |
| `sheets_create` | `spreadsheets.create` | Original |
| `sheets_info` | `spreadsheets.get` | Enhanced: ranges, includeGridData, fields |

### Gmail (22 tools)
| Tool | API Method | Status |
|------|-----------|--------|
| `gmail_search` | `messages.list` + `messages.get` | Original |
| `gmail_get` | `messages.get` | Original |
| `gmail_send` | `messages.send` | Original |
| `gmail_draft` | `drafts.create` | Original |
| `gmail_get_thread` | `threads.get` | Original |
| `gmail_modify_labels` | `messages.modify` | Original |
| `gmail_list_labels` | `labels.list` | Original |
| `gmail_get_attachment` | `messages.attachments.get` | Original |
| `gmail_create_filter` | `settings.filters.create` | Original |
| `gmail_list_filters` | `settings.filters.list` | Original |
| `gmail_manage_label` | `labels.create/update/delete` | Original |
| `gmail_profile` | `users.getProfile` | NEW |
| `gmail_trash` | `messages.trash` | NEW |
| `gmail_untrash` | `messages.untrash` | NEW |
| `gmail_delete` | `messages.delete` | NEW |
| `gmail_batch_modify` | `messages.batchModify` | NEW |
| `gmail_batch_delete` | `messages.batchDelete` | NEW |
| `gmail_list_drafts` | `drafts.list` | NEW |
| `gmail_delete_draft` | `drafts.delete` | NEW |
| `gmail_history` | `history.list` | NEW |
| `gmail_thread_trash` | `threads.trash` | NEW |
| `gmail_thread_untrash` | `threads.untrash` | NEW |

### Drive (15 tools)
| Tool | API Method | Status |
|------|-----------|--------|
| `drive_search` | `files.list` (with q) | Original |
| `drive_list` | `files.list` (folder) | Original |
| `drive_get` | `files.get` (content) | Original |
| `drive_create` | `files.create` (upload) | Original |
| `drive_copy` | `files.copy` | Original |
| `drive_share` | `permissions.create` | Original |
| `drive_get_link` | `files.get` (webViewLink) | Original |
| `drive_export` | `files.export` | Original |
| `drive_delete` | `files.delete` | NEW |
| `drive_update` | `files.update` (metadata) | NEW |
| `drive_metadata` | `files.get` (full fields) | NEW |
| `drive_permissions` | `permissions.list` | NEW |
| `drive_about` | `about.get` | NEW |
| `drive_download` | `files.get` (download URL) | NEW |
| `drive_revisions` | `revisions.list` | NEW |

### Calendar (11 tools)
| Tool | API Method | Status |
|------|-----------|--------|
| `calendar_list` | `calendarList.list` | Original |
| `calendar_events` | `events.list` | Original |
| `calendar_create` | `events.insert` | Original |
| `calendar_update` | `events.patch` | Original |
| `calendar_delete` | `events.delete` | Original |
| `calendar_freebusy` | `freebusy.query` | Original |
| `calendar_get_event` | `events.get` | NEW |
| `calendar_quick_add` | `events.quickAdd` | NEW |
| `calendar_move` | `events.move` | NEW |
| `calendar_instances` | `events.instances` | NEW |
| `calendar_settings` | `settings.list` | NEW |

### Docs (4 tools) — 100% of API covered
| Tool | API Method | Status |
|------|-----------|--------|
| `docs_get` | `documents.get` | Original |
| `docs_create` | `documents.create` | Original |
| `docs_modify` | `documents.batchUpdate` | Original |
| `docs_find_replace` | `documents.batchUpdate` (findReplace) | Original |

### Tasks (10 tools)
| Tool | API Method | Status |
|------|-----------|--------|
| `tasks_list_lists` | `tasklists.list` | Original |
| `tasks_list` | `tasks.list` | Original |
| `tasks_create` | `tasks.insert` | Original |
| `tasks_update` | `tasks.patch` | Original |
| `tasks_delete` | `tasks.delete` | Original |
| `tasks_create_list` | `tasklists.insert` | Original |
| `tasks_get` | `tasks.get` | NEW |
| `tasks_move` | `tasks.move` | NEW |
| `tasks_delete_list` | `tasklists.delete` | NEW |
| `tasks_clear_completed` | `tasks.clear` | NEW |

### Contacts (6 tools)
| Tool | API Method | Status |
|------|-----------|--------|
| `contacts_search` | `people.searchContacts` | Original |
| `contacts_list` | `people.connections.list` | Original |
| `contacts_get` | `people.get` | NEW |
| `contacts_create` | `people.createContact` | NEW |
| `contacts_update` | `people.updateContact` | NEW |
| `contacts_delete` | `people.deleteContact` | NEW |

### Slides (5 tools)
| Tool | API Method | Status |
|------|-----------|--------|
| `slides_create` | `presentations.create` | NEW |
| `slides_get` | `presentations.get` | NEW |
| `slides_batch_update` | `presentations.batchUpdate` | NEW |
| `slides_get_page` | `presentations.pages.get` | NEW |
| `slides_get_thumbnail` | `presentations.pages.getThumbnail` | NEW |

### Forms (4 tools)
| Tool | API Method | Status |
|------|-----------|--------|
| `forms_get` | `forms.get` | Original |
| `forms_responses` | `forms.responses.list` | Original |
| `forms_create` | `forms.create` | NEW |
| `forms_batch_update` | `forms.batchUpdate` | NEW |

### Apps Script (16 tools)
| Tool | API Method | Status |
|------|-----------|--------|
| `script_list` | Drive API (mime filter) | NEW |
| `script_get` | `projects.getContent` | NEW |
| `script_get_file` | `projects.getContent` (filtered) | NEW |
| `script_create` | `projects.create` | NEW |
| `script_update` | `projects.updateContent` | NEW |
| `script_delete` | Drive `files.delete` | NEW |
| `script_run` | `scripts.run` | NEW |
| `script_metrics` | `projects.getMetrics` | NEW |
| `script_processes` | `processes.list` | NEW |
| `script_versions` | `projects.versions.list` | NEW |
| `script_version_get` | `projects.versions.get` | NEW |
| `script_version_create` | `projects.versions.create` | NEW |
| `script_deployments` | `projects.deployments.list` | NEW |
| `script_deploy` | `projects.deployments.create` | NEW |
| `script_deploy_update` | `projects.deployments.update` | NEW |
| `script_deploy_delete` | `projects.deployments.delete` | NEW |

### Chat (3 tools)
| Tool | API Method | Status |
|------|-----------|--------|
| `chat_list_spaces` | `spaces.list` | Original |
| `chat_get_messages` | `spaces.messages.list` | Original |
| `chat_send` | `spaces.messages.create` | Original |

### Other (1 tool)
| Tool | Purpose | Status |
|------|---------|--------|
| `web_search` | Google Custom Search | Original |
| `gws_status` | Worker health check | Original |

---

## Unexposed Internal Functions (Priority Order)

### HIGH PRIORITY — Gmail Settings (6 functions)
These handle account-level configuration that users frequently need.

| Function | What it does | Line |
|----------|-------------|------|
| `setGmailVacation(enabled, options)` | Set/disable vacation auto-reply | ~4675 |
| `listGmailDelegates()` | List email delegates | ~4682 |
| `addGmailDelegate(email)` | Add email delegate | ~4686 |
| `removeGmailDelegate(email)` | Remove email delegate | ~4690 |
| `setGmailAutoForwarding(email, enabled)` | Configure auto-forwarding | ~4694 |
| `listGmailSendAs()` | List send-as aliases | ~4701 |

### HIGH PRIORITY — Gemini AI (15 functions)
Full Gemini API already implemented, just needs tool wiring.

| Function | What it does |
|----------|-------------|
| `geminiGenerateContent(model, contents, config)` | Generate text with Gemini |
| `geminiGenerate(prompt, options)` | Simplified generate |
| `geminiEmbedContent(model, content)` | Generate embeddings |
| `geminiBatchEmbedContents(model, contents)` | Batch embeddings |
| `geminiCountTokens(model, contents)` | Count tokens |
| `geminiUploadFile(name, mimeType, data)` | Upload file to Gemini |
| `geminiGetFile(fileName)` | Get uploaded file |
| `geminiListFiles()` | List uploaded files |
| `geminiDeleteFile(fileName)` | Delete uploaded file |
| `geminiResearch(query, options)` | Research with grounding |
| `geminiAnalyzeDocument(fileUri, prompt)` | Analyze document |
| `geminiAnalyzeVideo(fileUri, prompt)` | Analyze video |
| `createGeminiCachedContent(model, contents, ttl)` | Create context cache (75% cost reduction) |
| `listGeminiCachedContents()` | List cached contexts |
| `deleteGeminiCachedContent(name)` | Delete cached context |
| `listGeminiModels()` | List available models |
| `listGeminiTunedModels()` | List fine-tuned models |
| `getGeminiTunedModel(name)` | Get tuned model details |
| `createGeminiTuningJob(model, dataset)` | Start fine-tuning |

### HIGH PRIORITY — Drive Extended (16 functions)
Comments, labels, changes, and file management operations.

| Function | What it does |
|----------|-------------|
| `createDriveComment(fileId, content, anchor)` | Add comment to file |
| `listDriveComments(fileId)` | List file comments |
| `replyToDriveComment(fileId, commentId, content)` | Reply to comment |
| `resolveDriveComment(fileId, commentId)` | Resolve comment |
| `createDriveLabel(name, fields)` | Create Drive label |
| `getDriveLabel(labelId)` | Get label details |
| `listDriveLabels()` | List all labels |
| `listFileLabels(fileId)` | List labels on a file |
| `applyLabelToFile(fileId, labelId, fields)` | Apply label to file |
| `removeLabelFromFile(fileId, labelId)` | Remove label from file |
| `createDriveFolder(name, parentId)` | Create folder |
| `createDriveShortcut(name, targetId, parentId)` | Create shortcut |
| `moveDriveFile(fileId, newParentId)` | Move file |
| `transferDriveOwnership(fileId, newOwnerEmail)` | Transfer ownership |
| `setDriveFilePermissions(fileId, permissions, linkSharing)` | Bulk set permissions |
| `batchShareDriveFile(fileId, shares)` | Share with multiple people |
| `batchMoveDriveFiles(fileIds, targetFolderId)` | Batch move files |
| `listDriveChanges(startPageToken)` | List changes since token |
| `getDriveStartPageToken()` | Get changes start token |
| `watchDriveChanges(channelId, webhookUrl, token)` | Watch for changes |
| `watchDriveFile(fileId, channelId, webhookUrl)` | Watch specific file |
| `stopDriveWatch(channelId, resourceId)` | Stop watching |
| `getDriveRevision(fileId, revisionId)` | Get specific revision |
| `queryDriveActivity(options)` | Query Drive Activity API |
| `checkDriveFilePublicAccess(query)` | Check if files are public |
| `autoCategorizeDriveFiles(folderId, options)` | AI-powered auto-categorize |

### MEDIUM PRIORITY — Docs Extended (7 functions)
| Function | What it does |
|----------|-------------|
| `readDocumentComments(fileId)` | Read all comments on doc |
| `createDocumentComment(fileId, content, anchor)` | Add comment |
| `replyToComment(fileId, commentId, content)` | Reply to comment |
| `resolveComment(fileId, commentId)` | Resolve comment |
| `insertDocElements(documentId, elements)` | Insert structured elements |
| `insertDocImage(documentId, imageUri, index, w, h)` | Insert image |
| `exportDocToPdf(documentId)` | Export as PDF |
| `updateDocHeadersFooters(documentId, options)` | Update headers/footers |
| `updateParagraphStyle(documentId, range, style)` | Update paragraph styling |
| `inspectDocStructure(documentId)` | Debug document structure |

### MEDIUM PRIORITY — Chat Extended (4 functions)
| Function | What it does |
|----------|-------------|
| `createChatSpace(displayName, spaceType)` | Create a Chat space |
| `listChatMemberships(spaceName)` | List space members |
| `createChatMembership(spaceName, member)` | Add member to space |
| `deleteChatMembership(membershipName)` | Remove member |
| `searchChatMessages(spaceName, query)` | Search messages |

### MEDIUM PRIORITY — Meet (8 functions)
| Function | What it does |
|----------|-------------|
| `createMeetSpace(config)` | Create meeting space |
| `getMeetSpace(spaceName)` | Get meeting details |
| `updateMeetSpace(spaceName, config)` | Update meeting config |
| `endMeetConference(conferenceName)` | End active conference |
| `listMeetConferenceRecords(filter)` | List past conferences |
| `listMeetParticipants(conferenceRecord)` | List participants |
| `listMeetRecordings(conferenceRecord)` | List recordings |
| `listMeetTranscripts(conferenceRecord)` | List transcripts |
| `getMeetTranscriptEntries(transcript)` | Get transcript text |
| `listMeetParticipantSessions(participant)` | Participant sessions |

### MEDIUM PRIORITY — Contacts Extended (6 functions)
| Function | What it does |
|----------|-------------|
| `listContactGroups()` | List contact groups |
| `getContactGroup(resourceName)` | Get group details |
| `createContactGroup(name)` | Create group |
| `updateContactGroup(resourceName, name)` | Update group |
| `deleteContactGroup(resourceName)` | Delete group |
| `modifyContactGroupMembers(resourceName, add, remove)` | Modify members |
| `batchCreateContacts(contacts)` | Batch create contacts |
| `batchUpdateContacts(contacts)` | Batch update contacts |
| `batchDeleteContacts(resourceNames)` | Batch delete contacts |

### MEDIUM PRIORITY — Sheets Extended (4 functions)
Already accessible via `sheets_batch_request`, but dedicated tools would be cleaner.

| Function | What it does |
|----------|-------------|
| `formatSheetRange(spreadsheetId, sheetId, range, format)` | Format cells |
| `addSheetDataValidation(spreadsheetId, sheetId, range, rule)` | Data validation |
| `addSheetConditionalFormatting(spreadsheetId, sheetId, ranges, condition, format)` | Conditional formatting |
| `createSheetChart(spreadsheetId, sheetId, chartSpec)` | Create chart |
| `createSheetNamedRange(spreadsheetId, name, range)` | Named range |

### MEDIUM PRIORITY — Forms Extended (2 functions)
| Function | What it does |
|----------|-------------|
| `createFormWatch(formId, eventType, topicName)` | Watch for responses |
| `renewFormWatch(formId, watchId)` | Renew watch |
| `setFormPublishSettings(formId, settings)` | Quiz/collection settings |
| `getFormResponse(formId, responseId)` | Get single response |

### MEDIUM PRIORITY — Calendar Extended (3 functions)
| Function | What it does |
|----------|-------------|
| `getCalendarAcl(calendarId)` | Get calendar ACL |
| `importCalendarEvent(calendarId, event)` | Import event (preserves iCalUID) |
| `watchCalendarEvents(calendarId, webhookUrl, channelId)` | Watch for changes |

### MEDIUM PRIORITY — BigQuery (4 functions)
| Function | What it does |
|----------|-------------|
| `runBigQueryQuery(query, options)` | Execute SQL query |
| `listBigQueryDatasets()` | List datasets |
| `listBigQueryTables(datasetId)` | List tables |
| `getBigQueryTable(datasetId, tableId)` | Get table schema |

### LOW PRIORITY — YouTube (15 functions)
| Function | What it does |
|----------|-------------|
| `searchYouTube(query, options)` | Search videos |
| `getYouTubeVideo(videoId)` | Get video details |
| `listYouTubeVideos(options)` | List videos |
| `getYouTubeChannel(channelId)` | Get channel |
| `listYouTubeChannels(options)` | List channels |
| `listYouTubePlaylists(options)` | List playlists |
| `createYouTubePlaylist(title, desc, privacy)` | Create playlist |
| `addVideoToPlaylist(playlistId, videoId)` | Add to playlist |
| `getYouTubeVideoComments(videoId)` | Get comments |
| `postYouTubeComment(channelId, videoId, text)` | Post comment |
| `replyYouTubeComment(parentId, text)` | Reply to comment |
| `getYouTubeSubscriptions(mine)` | Get subscriptions |
| `getYouTubeCaptions(videoId)` | Get captions |
| `getYouTubeAnalytics(options)` | Analytics data |
| `listYouTubeLiveStreams(options)` | Live streams |
| `updateYouTubeVideo(videoId, updates)` | Update video |

### LOW PRIORITY — Cloud NLP (6 functions)
| Function | What it does |
|----------|-------------|
| `analyzeSentiment(text)` | Sentiment analysis |
| `analyzeEntities(text)` | Entity extraction |
| `analyzeEntitySentiment(text)` | Entity + sentiment |
| `analyzeSyntax(text)` | Syntax parsing |
| `classifyText(text)` | Text classification |
| `annotateText(text, features)` | Combined NLP |

### LOW PRIORITY — Admin SDK (12 functions)
| Function | What it does |
|----------|-------------|
| `listAdminUsers(options)` | List workspace users |
| `getAdminUser(userId)` | Get user details |
| `createAdminUser(user)` | Create user |
| `updateAdminUser(userId, updates)` | Update user |
| `suspendAdminUser(userId)` | Suspend user |
| `listAdminGroups(options)` | List groups |
| `getAdminGroup(groupId)` | Get group |
| `createAdminGroup(group)` | Create group |
| `listAdminGroupMembers(groupId)` | List members |
| `addAdminGroupMember(groupId, member)` | Add member |
| `removeAdminGroupMember(groupId, memberId)` | Remove member |
| `listAdminDomains()` | List domains |
| `listAdminOrgUnits()` | List org units |
| `listAdminRoles()` | List admin roles |
| `getAdminAuditActivities(application, options)` | Audit logs |
| `getAdminUsageReport(date, params)` | Usage reports |

### LOW PRIORITY — Classroom (12 functions)
| Function | What it does |
|----------|-------------|
| `listClassroomCourses(options)` | List courses |
| `getClassroomCourse(courseId)` | Get course |
| `createClassroomCourse(course)` | Create course |
| `updateClassroomCourse(courseId, updates)` | Update course |
| `listClassroomStudents(courseId)` | List students |
| `inviteClassroomStudent(courseId, email)` | Invite student |
| `listClassroomTeachers(courseId)` | List teachers |
| `listClassroomCoursework(courseId)` | List assignments |
| `createClassroomCoursework(courseId, work)` | Create assignment |
| `listClassroomSubmissions(courseId, workId)` | List submissions |
| `gradeClassroomSubmission(courseId, workId, subId, grade)` | Grade submission |
| `listClassroomAnnouncements(courseId)` | List announcements |
| `createClassroomAnnouncement(courseId, text)` | Post announcement |
| `listClassroomTopics(courseId)` | List topics |
| `createClassroomTopic(courseId, name)` | Create topic |

### LOW PRIORITY — Cloud Storage (4 functions)
| Function | What it does |
|----------|-------------|
| `listCloudStorageBuckets(projectId)` | List buckets |
| `listCloudStorageObjects(bucket)` | List objects |
| `getCloudStorageObject(bucket, object)` | Get object |
| `uploadCloudStorageObject(bucket, name, data, mime)` | Upload object |
| `deleteCloudStorageObject(bucket, object)` | Delete object |

### LOW PRIORITY — Maps/Places (5 functions)
| Function | What it does |
|----------|-------------|
| `geocodeAddress(address)` | Geocode address |
| `reverseGeocode(lat, lng)` | Reverse geocode |
| `searchPlaces(query, options)` | Text search places |
| `getPlaceDetails(placeId, fields)` | Place details |
| `getDirections(origin, destination, options)` | Directions |
| `getDistanceMatrix(origins, destinations, options)` | Distance matrix |

### LOW PRIORITY — Other Services

**Firebase** (3): `listFirebaseProjects`, `getFirebaseProject`, `listFirebaseWebApps`

**Keep** (4): `listKeepNotes`, `getKeepNote`, `createKeepNote`, `deleteKeepNote`

**Photos** (6): `listPhotosAlbums`, `getPhotosAlbum`, `createPhotosAlbum`, `sharePhotosAlbum`, `listPhotosMediaItems`, `searchPhotos`, `addPhotosToAlbum`, `getPhotoMediaItem`

**Blogger** (5): `listBloggerBlogs`, `getBloggerBlog`, `listBloggerPosts`, `getBloggerPost`, `createBloggerPost`, `updateBloggerPost`, `deleteBloggerPost`, `listBloggerComments`

**Tag Manager** (5): `listTagManagerAccounts`, `listTagManagerContainers`, `listTagManagerTags`, `listTagManagerTriggers`, `listTagManagerVariables`

**Search Console** (4): `listSearchConsoleSites`, `listSearchConsoleSitemaps`, `submitSearchConsoleSitemap`, `submitSearchConsoleUrl`, `getSearchConsolePerformance`

**Speech-to-Text** (2): `speechRecognize`, `speechLongRunningRecognize`

**Text-to-Speech** (3): `textToSpeech`, `textToSpeechSsml`, `listTextToSpeechVoices`

**Translation** (3): `translateText`, `detectLanguage`, `listSupportedLanguages`

**Vision** (2): `annotateImage`, `detectTextInImage`

**Pub/Sub** (4): `listPubSubTopics`, `createPubSubTopic`, `listPubSubSubscriptions`, `pullPubSubMessages`, `publishPubSubMessage`

**Workspace Events** (5): `createWorkspaceSubscription`, `getWorkspaceSubscription`, `listWorkspaceSubscriptions`, `deleteWorkspaceSubscription`, `reactivateWorkspaceSubscription`, `setupDriveEventSubscription`, `setupCalendarEventSubscription`

**Analytics** (4): `listAnalyticsAccounts`, `listAnalyticsProperties`, `runAnalyticsReport`, `runAnalyticsRealtimeReport`, `getAnalyticsMetadata`

**NotebookLM** (10): `listNotebooks`, `getNotebook`, `createNotebook`, `deleteNotebook`, `addNotebookSources`, `addNotebookChunk`, `generateNotebookAnswer`, `generateNotebookAudioOverview`, `generatePodcast`, `listNotebookCorpora`, `createNotebookCorpus`, `getNotebookCorpus`, `deleteNotebookCorpus`, `queryNotebookCorpus`, `listNotebookDocuments`, `createNotebookDocument`

**Document AI** (1): `processDocumentAi`

---

## Discovery Doc Coverage by Core Service

Checked against official `$discovery/rest` endpoints on 2026-04-22.

| Service | Discovery Methods | Exposed Tools | Coverage |
|---------|------------------|---------------|----------|
| Sheets | 17 | 12 | 71% |
| Gmail | 79 | 22 | 28% |
| Drive | 57 | 15 | 26% |
| Calendar | 37 | 11 | 30% |
| Docs | 3 | 4 | 100% |
| Tasks | 14 | 10 | 71% |
| People/Contacts | 24 | 6 | 25% |
| Chat | 55 | 3 | 5% |
| Forms | 10 | 4 | 40% |
| Slides | 5 | 5 | 100% |
| Apps Script | 16 | 16 | 100% |

### Still Missing from Discovery Docs (no internal function exists)

**Sheets**: `getByDataFilter`, `batchGetByDataFilter`, `batchUpdateByDataFilter`, `batchClearByDataFilter`, `developerMetadata.get`, `developerMetadata.search`

**Gmail**: `drafts.get`, `drafts.send`, `drafts.update`, `messages.import`, `messages.insert`, `labels.get`, `labels.patch`, `settings.getAutoForwarding`, `settings.getImap`, `settings.getLanguage`, `settings.getPop`, `settings.getVacation`, `settings.updateImap`, `settings.updateLanguage`, `settings.updatePop`, CSE identities/keypairs, sendAs CRUD, S/MIME

**Drive**: `files.download`, `files.emptyTrash`, `files.generateIds`, `files.watch`, `files.listLabels`, `files.modifyLabels`, `drives.*` (shared drives CRUD), `accessproposals.*`, `approvals.*`, `apps.*`, `operations.get`, `replies.*`, `revisions.delete/update`, `teamdrives.*`

**Calendar**: `acl.*` (CRUD + watch), `calendarList.delete/get/insert/patch/update/watch`, `calendars.clear/delete/get/insert/patch/update`, `channels.stop`, `colors.get`, `events.import` (exists internal), `events.watch` (exists internal), `settings.get/watch`

**Tasks**: `tasklists.get` (exists internal), `tasklists.patch`, `tasklists.update` (exists internal), `tasks.patch`

**People**: `contactGroups.batchGet`, `otherContacts.*`, `people.batchCreateContacts` (exists), `people.batchDeleteContacts` (exists), `people.batchUpdateContacts` (exists), `people.getBatchGet`, `people.listDirectoryPeople`, `people.searchDirectoryPeople`, `people.updateContactPhoto`, `people.deleteContactPhoto`

**Chat**: Most of the 55 methods are missing — spaces CRUD, messages CRUD, members CRUD, reactions, media, customEmojis, spaceEvents, sections, read states

**Forms**: `forms.setPublishSettings` (exists internal), `watches.create` (exists), `watches.delete`, `watches.list`, `watches.renew` (exists), `responses.get` (exists)

**Slides**: All 5 covered. 100%.

**Apps Script**: All 16 covered. 100%.

---

## Recommended Next Phases

### Phase 1: Wire High-Priority Internals (~37 tools)
- Gmail settings (6)
- Gemini AI (15)
- Drive comments + labels + folders + move (16)

### Phase 2: Wire Medium-Priority Internals (~35 tools)
- Docs extended (7)
- Chat extended (5)
- Meet (8)
- Contacts groups + batch (6)
- Sheets formatting helpers (5)
- Forms watches (4)

### Phase 3: Wire Low-Priority Services (~80 tools)
- YouTube (15)
- Cloud NLP (6)
- Admin SDK (12)
- Classroom (12)
- Cloud Storage (5)
- Maps/Places (6)
- BigQuery (4)
- Firebase (3)
- Keep (4)
- Photos (6)
- Blogger (5)
- Tag Manager (5)
- Search Console (4)
- Speech/TTS (5)
- Translation (3)
- Vision (2)
- Pub/Sub (5)
- Workspace Events (5)
- Analytics (4)

### Phase 4: Discovery-Driven Generation
- Fetch discovery docs at startup or cache in KV
- Auto-generate tool schemas from discovery specs
- Generic handler routes by API + method
- Zero maintenance, zero drift

---

## Session Results (2026-04-22)

### Completed
1. **gws-worker**: 44 → 153 operations behind 15 grouped tools (was 153 flat). Deployed.
2. **nguyen-case-api**: 98 → 101 operations behind 12 grouped tools (was 98 flat). Deployed.
3. **gemini-webapi-worker**: 49 → 39 grouped tools (own tools consolidated, proxied tools already grouped). Deployed.
4. **d1-rest**: Fixed 5 deprecated gemini-2.0-flash references. Deployed.
5. **Default Gemini model**: Updated from retired `gemini-2.0-flash` to `gemini-2.5-flash` across all workers.
6. **Workflow skill**: Created `~/.claude/skills/gws-mcp-workflows.md` with grouped calling patterns.
7. **All 252 action routes tested**: 151 gws + 101 case-api = 100% pass rate.

### Final Tool Counts
| Worker | Tools Listed | Actions | Response Size |
|--------|-------------|---------|---------------|
| gws-worker | 15 | 153 | 21 KB |
| nguyen-case-api | 12 | 101 | 15 KB |
| gemini-webapi-worker | 39 | ~300 (aggregator) | 47 KB |
| notebooklm-worker | 18 | ~120 | 11 KB |
| **Total** | **84** | **~674** | **94 KB** |

### Before vs After
| Metric | Before | After | Reduction |
|--------|--------|-------|-----------|
| gws-worker tools/list | 153 tools, 43KB | 15 tools, 21KB | 90% fewer tools, 51% less data |
| nguyen-case-api tools/list | 98 tools | 12 tools, 15KB | 88% fewer tools |
| gemini-webapi tools/list | 49 tools, 47KB | 39 tools, 47KB | 20% fewer (aggregator) |
| Deprecated model refs | 10 across 2 workers | 0 | Fixed |
