var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../../node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../../node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../../node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../../node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return "";
  }
  get versions() {
    return {};
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  ref() {
  }
  unref() {
  }
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  mainModule = void 0;
  domain = void 0;
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var { exit, platform, nextTick } = getBuiltinModule(
  "node:process"
);
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  nextTick
});
var {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  finalization,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  on,
  off,
  once,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// ../../src/google-workspace.ts
var R2_GWS_PATH = "auth/gws/tokens.json";
var GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
var GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
var GOOGLE_SCOPES = [
  // --- Identity ---
  "openid",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  // --- Gmail (case correspondence) ---
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.labels",
  "https://www.googleapis.com/auth/gmail.settings.basic",
  // --- Calendar (court dates, deadlines) ---
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/calendar.settings.readonly",
  // --- Drive (case file storage) ---
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.activity.readonly",
  // --- Docs / Sheets / Slides (legal documents, billing, court presentations) ---
  "https://www.googleapis.com/auth/documents",
  "https://www.googleapis.com/auth/documents.readonly",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
  "https://www.googleapis.com/auth/presentations",
  "https://www.googleapis.com/auth/presentations.readonly",
  // --- Forms (client intake) ---
  "https://www.googleapis.com/auth/forms.body",
  "https://www.googleapis.com/auth/forms.body.readonly",
  "https://www.googleapis.com/auth/forms.responses.readonly",
  // --- Tasks (deadline tracking) ---
  "https://www.googleapis.com/auth/tasks",
  "https://www.googleapis.com/auth/tasks.readonly",
  // --- Contacts / People (clients, opposing counsel) ---
  "https://www.googleapis.com/auth/contacts",
  "https://www.googleapis.com/auth/contacts.readonly",
  "https://www.googleapis.com/auth/directory.readonly",
  // --- Google Meet (client video meetings) ---
  "https://www.googleapis.com/auth/meetings.space.readonly",
  "https://www.googleapis.com/auth/meetings.space.created",
  // --- Admin SDK (org structure lookup + directory management) ---
  "https://www.googleapis.com/auth/admin.directory.user.readonly",
  "https://www.googleapis.com/auth/admin.directory.group.readonly",
  "https://www.googleapis.com/auth/admin.directory.orgunit.readonly",
  "https://www.googleapis.com/auth/admin.directory.domain.readonly",
  // --- Google Cloud Platform ---
  // Single scope covers: Vertex AI, NotebookLM (Discovery Engine),
  // Document AI, Cloud Vision, Speech, Translation, Natural Language, etc.
  "https://www.googleapis.com/auth/cloud-platform",
  // cloud-platform covers Gemini generateContent; generative-language.* are sub-scopes for tuning/retrieval
  "https://www.googleapis.com/auth/generative-language.tuning",
  "https://www.googleapis.com/auth/generative-language.retriever",
  // --- Blogger ---
  "https://www.googleapis.com/auth/blogger",
  "https://www.googleapis.com/auth/blogger.readonly",
  // --- Google Search Console ---
  "https://www.googleapis.com/auth/webmasters",
  "https://www.googleapis.com/auth/webmasters.readonly",
  // --- Google Tag Manager ---
  "https://www.googleapis.com/auth/tagmanager.readonly",
  "https://www.googleapis.com/auth/tagmanager.edit.containers",
  "https://www.googleapis.com/auth/tagmanager.manage.accounts",
  "https://www.googleapis.com/auth/tagmanager.publish",
  // --- Google Ads ---
  "https://www.googleapis.com/auth/adwords",
  // --- Google Cloud Storage ---
  "https://www.googleapis.com/auth/devstorage.full_control",
  "https://www.googleapis.com/auth/devstorage.read_write",
  // --- Pub/Sub ---
  "https://www.googleapis.com/auth/pubsub",
  // --- BigQuery ---
  "https://www.googleapis.com/auth/bigquery",
  "https://www.googleapis.com/auth/bigquery.readonly",
  // --- Cloud Logging & Monitoring ---
  "https://www.googleapis.com/auth/logging.read",
  "https://www.googleapis.com/auth/logging.write",
  "https://www.googleapis.com/auth/monitoring",
  "https://www.googleapis.com/auth/monitoring.read",
  "https://www.googleapis.com/auth/monitoring.write",
  // --- Firebase ---
  "https://www.googleapis.com/auth/firebase",
  "https://www.googleapis.com/auth/firebase.readonly",
  // --- Cloud Translation ---
  "https://www.googleapis.com/auth/cloud-translation",
  // --- Cloud Vision ---
  "https://www.googleapis.com/auth/cloud-vision",
  // --- Cloud Speech-to-Text / Text-to-Speech ---
  "https://www.googleapis.com/auth/cloud-speech",
  // --- Cloud Natural Language ---
  "https://www.googleapis.com/auth/cloud-language",
  // --- Google Chat (chat.bot removed — requires Chat app approval, not for standard OAuth) ---
  "https://www.googleapis.com/auth/chat.messages",
  "https://www.googleapis.com/auth/chat.spaces",
  "https://www.googleapis.com/auth/chat.memberships",
  // --- Apps Script ---
  "https://www.googleapis.com/auth/script.projects",
  "https://www.googleapis.com/auth/script.deployments",
  "https://www.googleapis.com/auth/script.metrics",
  "https://www.googleapis.com/auth/script.processes",
  "https://www.googleapis.com/auth/script.external_request",
  // --- Custom Search Engine ---
  "https://www.googleapis.com/auth/cse",
  // --- Google Books ---
  "https://www.googleapis.com/auth/books",
  // --- Google Site Verification ---
  "https://www.googleapis.com/auth/siteverification",
  "https://www.googleapis.com/auth/siteverification.verify_only",
  // --- AdSense ---
  "https://www.googleapis.com/auth/adsense",
  "https://www.googleapis.com/auth/adsense.readonly",
  // --- Google Play (Android) ---
  "https://www.googleapis.com/auth/androidpublisher",
  // --- Google Datastore ---
  "https://www.googleapis.com/auth/datastore",
  // --- Cloud DNS ---
  "https://www.googleapis.com/auth/ndev.clouddns.readwrite",
  "https://www.googleapis.com/auth/ndev.clouddns.readonly",
  // --- Compute Engine ---
  "https://www.googleapis.com/auth/compute",
  "https://www.googleapis.com/auth/compute.readonly",
  // --- Source Repositories ---
  "https://www.googleapis.com/auth/source.read_only",
  "https://www.googleapis.com/auth/source.read_write",
  // --- Service Management ---
  "https://www.googleapis.com/auth/service.management",
  "https://www.googleapis.com/auth/service.management.readonly",
  "https://www.googleapis.com/auth/servicecontrol",
  // --- NotebookLM / Discovery Engine ---
  // cloud-platform scope alone is insufficient for NotebookLM Enterprise v1alpha API.
  // The explicit discoveryengine scopes are required for OAuth token access.
  "https://www.googleapis.com/auth/discoveryengine.readwrite",
  "https://www.googleapis.com/auth/apps.licensing"
].join(" ");
var GoogleOAuthManager = class {
  static {
    __name(this, "GoogleOAuthManager");
  }
  constructor(env2, profile3) {
    this.clientId = env2.GOOGLE_OAUTH_CLIENT_ID || "";
    this.clientSecret = env2.GOOGLE_OAUTH_CLIENT_SECRET || "";
    this.kv = env2.CACHE;
    this.r2 = env2.R2_AUTH;
    this.profile = (profile3 || "default").replace(/[^a-zA-Z0-9_-]/g, "") || "default";
  }
  /** KV key for this profile's OAuth tokens */
  get kvKey() {
    return this.profile === "default" ? "google_oauth_tokens" : `google_oauth_tokens:${this.profile}`;
  }
  /** Generate OAuth authorization URL for user consent */
  getAuthUrl(redirectUri, state) {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: GOOGLE_SCOPES,
      access_type: "offline",
      prompt: "consent"
    });
    if (state) params.set("state", state);
    return `${GOOGLE_AUTH_URL}?${params.toString()}`;
  }
  /** Exchange authorization code for tokens */
  async exchangeCode(code, redirectUri) {
    const resp = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
      })
    });
    if (!resp.ok) {
      const err = await resp.text();
      throw new Error(`Token exchange failed: ${resp.status} - ${err}`);
    }
    const data = await resp.json();
    const tokens = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      token_type: data.token_type,
      expires_at: Date.now() + data.expires_in * 1e3 - 6e4,
      // 1 min buffer
      scope: data.scope
    };
    const payload = JSON.stringify({ ...tokens, saved_at: (/* @__PURE__ */ new Date()).toISOString(), method: "oauth-exchange" });
    if (this.r2) {
      try {
        await this.r2.put(R2_GWS_PATH, payload, { httpMetadata: { contentType: "application/json" } });
      } catch {
      }
    }
    // KV write intentionally removed: google-auth-worker owns google_oauth_tokens in KV.
    // R2 write above is retained as a secondary canonical store.
    this.cachedToken = { access_token: tokens.access_token, expires_at: tokens.expires_at };
    return tokens;
  }
  /** Get a valid access token, refreshing if necessary */
  async getAccessToken(env2) {
    if (env2.GOOGLE_ACCESS_TOKEN) {
      return env2.GOOGLE_ACCESS_TOKEN;
    }
    if (this.cachedToken && Date.now() < this.cachedToken.expires_at) {
      return this.cachedToken.access_token;
    }
    if (env2.GOOGLE_AUTH) {
      try {
        const r = await env2.GOOGLE_AUTH.fetch(new Request("http://internal/token"));
        if (r.ok) {
          const d = await r.json();
          if (d.access_token) {
            this.cachedToken = { access_token: d.access_token, expires_at: Date.now() + 35e5 };
            return d.access_token;
          }
        }
      } catch {
      }
    }
    let refreshToken;
    if (this.r2) {
      try {
        const obj = await this.r2.get(R2_GWS_PATH);
        if (obj) {
          const tokens = JSON.parse(await obj.text());
          if (tokens.access_token && Date.now() < tokens.expires_at) {
            this.cachedToken = { access_token: tokens.access_token, expires_at: tokens.expires_at };
            return tokens.access_token;
          }
          refreshToken = tokens.refresh_token;
        }
      } catch {
      }
    }
    if (!refreshToken && this.kv) {
      const stored = await this.kv.get(this.kvKey);
      if (stored) {
        try {
          const tokens = JSON.parse(stored);
          if (tokens.access_token && Date.now() < tokens.expires_at) {
            this.cachedToken = { access_token: tokens.access_token, expires_at: tokens.expires_at };
            return tokens.access_token;
          }
          refreshToken = tokens.refresh_token;
        } catch {
        }
      }
    }
    if (!refreshToken) {
      refreshToken = env2.GOOGLE_REFRESH_TOKEN;
    }
    if (!refreshToken) {
      throw new Error("No Google refresh token available. Authenticate via d1-rest worker.");
    }
    // Parallelize: race GOOGLE_AUTH binding against direct Google token fetch.
    // GOOGLE_AUTH owns canonical KV — if it wins, no R2 update needed.
    // Direct fetch wins if binding is unavailable or slow — updates R2 only.
    const googleAuthPromise = env2.GOOGLE_AUTH
      ? env2.GOOGLE_AUTH.fetch(new Request("http://internal/token"))
          .then(async (r) => {
            if (!r.ok) throw new Error("binding non-ok");
            const d = await r.json();
            if (!d.access_token) throw new Error("no access_token");
            return { access_token: d.access_token, expires_at: Date.now() + 35e5, _source: "binding" };
          })
      : Promise.reject(new Error("no binding"));
    const directFetchPromise = fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: "refresh_token"
      })
    }).then(async (resp) => {
      if (!resp.ok) {
        const err = await resp.text();
        throw new Error(`Token refresh failed: ${resp.status} - ${err}`);
      }
      const data = await resp.json();
      return {
        access_token: data.access_token,
        expires_at: Date.now() + data.expires_in * 1e3 - 6e4,
        _source: "direct"
      };
    });
    const newToken = await Promise.any([googleAuthPromise, directFetchPromise]);
    this.cachedToken = { access_token: newToken.access_token, expires_at: newToken.expires_at };
    // Update R2 only when the direct path won — google-auth-worker owns google_oauth_tokens in KV.
    if (newToken._source === "direct" && this.r2) {
      try {
        const obj = await this.r2.get(R2_GWS_PATH);
        if (obj) {
          const tokens = JSON.parse(await obj.text());
          tokens.access_token = newToken.access_token;
          tokens.expires_at = newToken.expires_at;
          tokens.saved_at = (/* @__PURE__ */ new Date()).toISOString();
          await this.r2.put(R2_GWS_PATH, JSON.stringify(tokens), { httpMetadata: { contentType: "application/json" } });
        }
      } catch {
      }
    }
    return newToken.access_token;
  }
};
async function googleFetch(accessToken, url, options = {}) {
  const fullUrl = new URL(url);
  if (options.params) {
    for (const [k, v] of Object.entries(options.params)) {
      if (v !== void 0 && v !== null && v !== "") fullUrl.searchParams.set(k, v);
    }
  }
  const headers = {
    "Authorization": `Bearer ${accessToken}`,
    ...options.headers
  };
  if (options.body && !options.headers?.["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  const resp = await fetch(fullUrl.toString(), {
    method: options.method || "GET",
    headers,
    body: options.body ? typeof options.body === "string" ? options.body : JSON.stringify(options.body) : void 0
  });
  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Google API error ${resp.status}: ${errText}`);
  }
  if (resp.status === 204 || resp.headers.get("content-length") === "0") {
    return { success: true };
  }
  const contentType = resp.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const text = await resp.text();
    if (!text || !text.trim()) return { success: true };
    return JSON.parse(text);
  }
  return resp.text();
}
__name(googleFetch, "googleFetch");
var GoogleWorkspaceClient = class _GoogleWorkspaceClient {
  static {
    __name(this, "GoogleWorkspaceClient");
  }
  constructor(env2) {
    this.env = env2;
    this.oauth = new GoogleOAuthManager(env2);
  }
  get authManager() {
    return this.oauth;
  }
  async token() {
    return this.oauth.getAccessToken(this.env);
  }
  // ============================================
  // GMAIL
  // ============================================
  async searchGmailMessages(query, maxResults = 20) {
    const t = await this.token();
    const data = await googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/messages", {
      params: { q: query, maxResults: String(maxResults) }
    });
    if (!data.messages || data.messages.length === 0) return { messages: [], resultSizeEstimate: 0 };
    const messages = await Promise.all(
      data.messages.slice(0, maxResults).map(async (m) => {
        const msg = await googleFetch(t, `https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}`, {
          params: { format: "metadata", metadataHeaders: "Subject,From,To,Date" }
        });
        return {
          id: msg.id,
          threadId: msg.threadId,
          snippet: msg.snippet,
          subject: msg.payload?.headers?.find((h) => h.name === "Subject")?.value,
          from: msg.payload?.headers?.find((h) => h.name === "From")?.value,
          to: msg.payload?.headers?.find((h) => h.name === "To")?.value,
          date: msg.payload?.headers?.find((h) => h.name === "Date")?.value,
          labelIds: msg.labelIds
        };
      })
    );
    return { messages, resultSizeEstimate: data.resultSizeEstimate };
  }
  async getGmailMessage(messageId, format = "full") {
    const t = await this.token();
    const msg = await googleFetch(t, `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`, {
      params: { format }
    });
    if (format === "full" && msg.payload) {
      msg._decodedBody = this.decodeGmailBody(msg.payload);
    }
    return msg;
  }
  decodeGmailBody(payload) {
    if (payload.body?.data) {
      return atob(payload.body.data.replace(/-/g, "+").replace(/_/g, "/"));
    }
    if (payload.parts) {
      for (const part of payload.parts) {
        if (part.mimeType === "text/plain" && part.body?.data) {
          return atob(part.body.data.replace(/-/g, "+").replace(/_/g, "/"));
        }
      }
      for (const part of payload.parts) {
        if (part.mimeType === "text/html" && part.body?.data) {
          return atob(part.body.data.replace(/-/g, "+").replace(/_/g, "/"));
        }
      }
      for (const part of payload.parts) {
        const nested = this.decodeGmailBody(part);
        if (nested) return nested;
      }
    }
    return "";
  }
  async sendGmailMessage(to, subject, body, options) {
    const t = await this.token();
    let raw = `To: ${to}\r
Subject: ${subject}\r
`;
    if (options?.cc) raw += `Cc: ${options.cc}\r
`;
    if (options?.bcc) raw += `Bcc: ${options.bcc}\r
`;
    if (options?.replyToMessageId) raw += `In-Reply-To: ${options.replyToMessageId}\r
References: ${options.replyToMessageId}\r
`;
    if (options?.htmlBody) {
      raw += `Content-Type: text/html; charset=UTF-8\r
\r
${options.htmlBody}`;
    } else {
      raw += `Content-Type: text/plain; charset=UTF-8\r
\r
${body}`;
    }
    const encoded = btoa(unescape(encodeURIComponent(raw))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      body: { raw: encoded, ...options?.threadId ? { threadId: options.threadId } : {} }
    });
  }
  async draftGmailMessage(to, subject, body, options) {
    const t = await this.token();
    let raw = `To: ${to}\r
Subject: ${subject}\r
`;
    if (options?.cc) raw += `Cc: ${options.cc}\r
`;
    if (options?.bcc) raw += `Bcc: ${options.bcc}\r
`;
    if (options?.htmlBody) {
      raw += `Content-Type: text/html; charset=UTF-8\r
\r
${options.htmlBody}`;
    } else {
      raw += `Content-Type: text/plain; charset=UTF-8\r
\r
${body}`;
    }
    const encoded = btoa(unescape(encodeURIComponent(raw))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/drafts", {
      method: "POST",
      body: { message: { raw: encoded } }
    });
  }
  async getGmailThread(threadId) {
    const t = await this.token();
    return googleFetch(t, `https://gmail.googleapis.com/gmail/v1/users/me/threads/${threadId}`, {
      params: { format: "full" }
    });
  }
  async modifyGmailLabels(messageId, addLabels, removeLabels) {
    const t = await this.token();
    return googleFetch(t, `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/modify`, {
      method: "POST",
      body: { addLabelIds: addLabels || [], removeLabelIds: removeLabels || [] }
    });
  }
  async listGmailLabels() {
    const t = await this.token();
    return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/labels");
  }
  // ============================================
  // GOOGLE CALENDAR
  // ============================================
  async listCalendars() {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/calendar/v3/users/me/calendarList");
  }
  async getCalendarEvents(calendarId = "primary", options) {
    const t = await this.token();
    const params = {
      orderBy: "startTime",
      singleEvents: String(options?.singleEvents !== false)
    };
    if (options?.timeMin) params.timeMin = options.timeMin;
    if (options?.timeMax) params.timeMax = options.timeMax;
    if (options?.maxResults) params.maxResults = String(options.maxResults);
    if (options?.query) params.q = options.query;
    return googleFetch(t, `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`, { params });
  }
  async createCalendarEvent(calendarId = "primary", event) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`, {
      method: "POST",
      body: event,
      params: { sendUpdates: "all" }
    });
  }
  async modifyCalendarEvent(calendarId = "primary", eventId, updates) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${eventId}`, {
      method: "PATCH",
      body: updates,
      params: { sendUpdates: "all" }
    });
  }
  async deleteCalendarEvent(calendarId = "primary", eventId) {
    const t = await this.token();
    const resp = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${eventId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) {
      throw new Error(`Delete event failed: ${resp.status}`);
    }
    return { deleted: true };
  }
  // ============================================
  // GOOGLE DRIVE
  // ============================================
  /**
   * Convert fileType shortcuts to Google Drive MIME types
   * Supports wildcard patterns for broader matching
   */
  fileTypeToMimeType(fileType) {
    const mimeTypeMap = {
      "document": "application/vnd.google-apps.document",
      "spreadsheet": "application/vnd.google-apps.spreadsheet",
      "presentation": "application/vnd.google-apps.presentation",
      "form": "application/vnd.google-apps.form",
      "drawing": "application/vnd.google-apps.drawing",
      "pdf": "application/pdf",
      "image": "image/",
      "video": "video/",
      "audio": "audio/",
      "text": "text/",
      "word": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "excel": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "powerpoint": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "zip": "application/zip",
      "folder": "application/vnd.google-apps.folder"
    };
    return mimeTypeMap[fileType.toLowerCase()] || null;
  }
  /**
   * Build Drive API query string with filters
   */
  buildDriveQuery(options) {
    const conditions = [];
    if (options.folderId) {
      conditions.push(`'${options.folderId}' in parents`);
    }
    if (!options.includeShared) {
      conditions.push("trashed = false");
    }
    if (options.mimeType) {
      if (options.mimeType.endsWith("/")) {
        conditions.push(`mimeType contains '${options.mimeType.slice(0, -1)}'`);
      } else {
        conditions.push(`mimeType = '${options.mimeType}'`);
      }
    }
    if (options.fileType) {
      const mime = this.fileTypeToMimeType(options.fileType);
      if (mime) {
        if (mime.endsWith("/")) {
          conditions.push(`mimeType contains '${mime.slice(0, -1)}'`);
        } else {
          conditions.push(`mimeType = '${mime}'`);
        }
      }
    }
    if (options.modifiedAfter) {
      conditions.push(`modifiedTime > '${options.modifiedAfter}'`);
    }
    if (options.modifiedBefore) {
      conditions.push(`modifiedTime < '${options.modifiedBefore}'`);
    }
    if (options.searchQuery) {
      conditions.push(`name contains '${options.searchQuery.replace(/'/g, "\\'")}'`);
    }
    return conditions.join(" and ");
  }
  async searchDriveFiles(query, maxResults = 20, options) {
    const t = await this.token();
    let finalQuery = query;
    if (options) {
      const filterQuery = this.buildDriveQuery({
        mimeType: options.mimeType,
        fileType: options.fileType,
        modifiedAfter: options.modifiedAfter,
        modifiedBefore: options.modifiedBefore,
        includeShared: options.includeShared
      });
      if (filterQuery) {
        finalQuery = query ? `(${query}) and ${filterQuery}` : filterQuery;
      }
    }
    const params = {
      q: finalQuery,
      pageSize: String(maxResults),
      fields: "files(id,name,mimeType,modifiedTime,size,parents,webViewLink,owners)"
    };
    if (options?.orderBy) {
      params.orderBy = options.orderBy;
    } else {
      params.orderBy = "modifiedTime desc";
    }
    if (options?.includeShared) {
      params.corpora = "allDrives";
      params.includeItemsFromAllDrives = "true";
      params.supportsAllDrives = "true";
    }
    return googleFetch(t, "https://www.googleapis.com/drive/v3/files", { params });
  }
  async getDriveFileContent(fileId) {
    const t = await this.token();
    const meta = await googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}`, {
      params: { fields: "id,name,mimeType,size,modifiedTime" }
    });
    const exportMap = {
      "application/vnd.google-apps.document": "text/plain",
      "application/vnd.google-apps.spreadsheet": "text/csv",
      "application/vnd.google-apps.presentation": "text/plain",
      "application/vnd.google-apps.drawing": "image/png"
    };
    if (exportMap[meta.mimeType]) {
      const content2 = await googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/export`, {
        params: { mimeType: exportMap[meta.mimeType] }
      });
      return { metadata: meta, content: content2 };
    }
    const content = await googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}`, {
      params: { alt: "media" }
    });
    return { metadata: meta, content };
  }
  async createDriveFile(name, content, mimeType = "text/plain", folderId, options) {
    const t = await this.token();
    const metadata = { name };
    metadata.mimeType = options?.convertTo || mimeType;
    if (folderId) metadata.parents = [folderId];
    const boundary = "-------314159265358979323846";
    const body = [
      `--${boundary}`,
      "Content-Type: application/json; charset=UTF-8",
      "",
      JSON.stringify(metadata),
      `--${boundary}`,
      `Content-Type: ${mimeType}`,
      "",
      content,
      `--${boundary}--`
    ].join("\r\n");
    const params = { uploadType: "multipart" };
    if (options?.ocrLanguage) params.ocrLanguage = options.ocrLanguage;
    return googleFetch(t, "https://www.googleapis.com/upload/drive/v3/files", {
      method: "POST",
      params,
      headers: { "Content-Type": `multipart/related; boundary=${boundary}` },
      body
    });
  }
  /** Export a Google Workspace file to a specific format */
  async exportDriveFile(fileId, exportMimeType) {
    const t = await this.token();
    const resp = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=${encodeURIComponent(exportMimeType)}`,
      { headers: { Authorization: `Bearer ${t}` } }
    );
    if (!resp.ok) throw new Error(`Export failed: ${resp.status} ${resp.statusText}`);
    return resp;
  }
  /** Get available import/export formats from Drive API */
  async getDriveSupportedFormats() {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/drive/v3/about", {
      params: { fields: "user,storageQuota,importFormats,exportFormats" }
    });
  }
  async shareDriveFile(fileId, email, role = "reader", type = "user") {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
      method: "POST",
      body: { role, type, emailAddress: email },
      params: { sendNotificationEmail: "true" }
    });
  }
  async listDriveItems(folderId = "root", maxResults = 50, options) {
    const t = await this.token();
    const queryOptions = { folderId };
    if (options) {
      Object.assign(queryOptions, options);
    }
    const q = this.buildDriveQuery(queryOptions);
    const params = {
      q: q || `'${folderId}' in parents and trashed = false`,
      pageSize: String(maxResults),
      fields: "files(id,name,mimeType,modifiedTime,size,parents,webViewLink,owners)",
      orderBy: options?.orderBy || "modifiedTime desc"
    };
    if (options?.includeShared) {
      params.corpora = "allDrives";
      params.includeItemsFromAllDrives = "true";
      params.supportsAllDrives = "true";
    }
    return googleFetch(t, "https://www.googleapis.com/drive/v3/files", { params });
  }
  async copyDriveFile(fileId, name, folderId) {
    const t = await this.token();
    const body = {};
    if (name) body.name = name;
    if (folderId) body.parents = [folderId];
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/copy`, {
      method: "POST",
      body
    });
  }
  async getShareableLink(fileId) {
    const t = await this.token();
    const file = await googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}`, {
      params: { fields: "id,name,webViewLink,webContentLink" }
    });
    return file;
  }
  // ============================================
  // GOOGLE DOCS
  // ============================================
  async getDocContent(documentId) {
    const t = await this.token();
    return googleFetch(t, `https://docs.googleapis.com/v1/documents/${documentId}`);
  }
  async createDoc(title2, content) {
    const t = await this.token();
    const doc = await googleFetch(t, "https://docs.googleapis.com/v1/documents", {
      method: "POST",
      body: { title: title2 }
    });
    if (content) {
      await googleFetch(t, `https://docs.googleapis.com/v1/documents/${doc.documentId}:batchUpdate`, {
        method: "POST",
        body: {
          requests: [{ insertText: { location: { index: 1 }, text: content } }]
        }
      });
    }
    return doc;
  }
  async modifyDocText(documentId, operations) {
    const t = await this.token();
    const requests = [];
    const sorted = [...operations].sort((a, b) => (b.index || b.startIndex || 0) - (a.index || a.startIndex || 0));
    for (const op of sorted) {
      if (op.type === "insert" && op.text && op.index !== void 0) {
        requests.push({ insertText: { location: { index: op.index }, text: op.text } });
      } else if (op.type === "delete" && op.startIndex !== void 0 && op.endIndex !== void 0) {
        requests.push({ deleteContentRange: { range: { startIndex: op.startIndex, endIndex: op.endIndex } } });
      } else if (op.type === "replace" && op.text && op.startIndex !== void 0 && op.endIndex !== void 0) {
        requests.push({ deleteContentRange: { range: { startIndex: op.startIndex, endIndex: op.endIndex } } });
        requests.push({ insertText: { location: { index: op.startIndex }, text: op.text } });
      }
    }
    return googleFetch(t, `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
      method: "POST",
      body: { requests }
    });
  }
  async findAndReplaceDoc(documentId, find, replace, matchCase = false) {
    const t = await this.token();
    return googleFetch(t, `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
      method: "POST",
      body: {
        requests: [{
          replaceAllText: {
            containsText: { text: find, matchCase },
            replaceText: replace
          }
        }]
      }
    });
  }
  async batchUpdateDoc(documentId, requests) {
    const t = await this.token();
    return googleFetch(t, `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
      method: "POST",
      body: { requests }
    });
  }
  // ============================================
  // GOOGLE SHEETS
  // ============================================
  async readSheetValues(spreadsheetId, range, options) {
    const t = await this.token();
    const params = {};
    if (options?.majorDimension) params.majorDimension = options.majorDimension;
    if (options?.valueRenderOption) params.valueRenderOption = options.valueRenderOption;
    if (options?.dateTimeRenderOption) params.dateTimeRenderOption = options.dateTimeRenderOption;
    return googleFetch(t, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`, { params });
  }
  async batchGetSheetValues(spreadsheetId, ranges, options) {
    const t = await this.token();
    const params = { ranges };
    if (options?.majorDimension) params.majorDimension = options.majorDimension;
    if (options?.valueRenderOption) params.valueRenderOption = options.valueRenderOption;
    if (options?.dateTimeRenderOption) params.dateTimeRenderOption = options.dateTimeRenderOption;
    return googleFetch(t, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet`, { params });
  }
  async batchUpdateSheetValues(spreadsheetId, data, valueInputOption = "USER_ENTERED") {
    const t = await this.token();
    return googleFetch(t, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
      method: "POST",
      body: { valueInputOption, data }
    });
  }
  async batchClearSheetValues(spreadsheetId, ranges) {
    const t = await this.token();
    return googleFetch(t, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchClear`, {
      method: "POST",
      body: { ranges }
    });
  }
  async copySheetTo(spreadsheetId, sheetId, destinationSpreadsheetId) {
    const t = await this.token();
    return googleFetch(t, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/sheets/${sheetId}:copyTo`, {
      method: "POST",
      body: { destinationSpreadsheetId }
    });
  }
  async batchUpdateSpreadsheet(spreadsheetId, requests) {
    const t = await this.token();
    return googleFetch(t, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: "POST",
      body: { requests }
    });
  }
  async modifySheetValues(spreadsheetId, range, values, options) {
    const t = await this.token();
    const mode = options?.mode || "write";
    const valueInputOption = options?.valueInputOption || "USER_ENTERED";
    if (mode === "clear") {
      return googleFetch(t, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:clear`, {
        method: "POST",
        body: {}
      });
    }
    if (mode === "append") {
      return googleFetch(t, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append`, {
        method: "POST",
        params: { valueInputOption, insertDataOption: "INSERT_ROWS" },
        body: { range, values }
      });
    }
    return googleFetch(t, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`, {
      method: "PUT",
      params: { valueInputOption },
      body: { range, values }
    });
  }
  async createSpreadsheet(title2, sheetTitles) {
    const t = await this.token();
    const body = { properties: { title: title2 } };
    if (sheetTitles && sheetTitles.length > 0) {
      body.sheets = sheetTitles.map((t2) => ({ properties: { title: t2 } }));
    }
    return googleFetch(t, "https://sheets.googleapis.com/v4/spreadsheets", {
      method: "POST",
      body
    });
  }
  async getSpreadsheetInfo(spreadsheetId, options) {
    const t = await this.token();
    const params = { fields: options?.fields || "spreadsheetId,properties,sheets.properties" };
    if (options?.ranges) params.ranges = options.ranges;
    if (options?.includeGridData) params.includeGridData = "true";
    return googleFetch(t, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`, { params });
  }
  async formatSheetRange(spreadsheetId, sheetId, range, format) {
    const t = await this.token();
    const cellFormat = {};
    const fields = [];
    if (format.bold !== void 0 || format.italic !== void 0 || format.fontSize !== void 0 || format.textColor) {
      cellFormat.textFormat = {};
      if (format.bold !== void 0) {
        cellFormat.textFormat.bold = format.bold;
        fields.push("userEnteredFormat.textFormat.bold");
      }
      if (format.italic !== void 0) {
        cellFormat.textFormat.italic = format.italic;
        fields.push("userEnteredFormat.textFormat.italic");
      }
      if (format.fontSize !== void 0) {
        cellFormat.textFormat.fontSize = format.fontSize;
        fields.push("userEnteredFormat.textFormat.fontSize");
      }
      if (format.textColor) {
        cellFormat.textFormat.foregroundColorStyle = { rgbColor: format.textColor };
        fields.push("userEnteredFormat.textFormat.foregroundColorStyle");
      }
    }
    if (format.backgroundColor) {
      cellFormat.backgroundColorStyle = { rgbColor: format.backgroundColor };
      fields.push("userEnteredFormat.backgroundColorStyle");
    }
    if (format.numberFormat) {
      cellFormat.numberFormat = format.numberFormat;
      fields.push("userEnteredFormat.numberFormat");
    }
    if (format.horizontalAlignment) {
      cellFormat.horizontalAlignment = format.horizontalAlignment;
      fields.push("userEnteredFormat.horizontalAlignment");
    }
    if (format.wrapStrategy) {
      cellFormat.wrapStrategy = format.wrapStrategy;
      fields.push("userEnteredFormat.wrapStrategy");
    }
    return googleFetch(t, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: "POST",
      body: {
        requests: [{
          repeatCell: {
            range: { sheetId, ...range },
            cell: { userEnteredFormat: cellFormat },
            fields: fields.join(",")
          }
        }]
      }
    });
  }
  // ============================================
  // GOOGLE SLIDES
  // ============================================
  async createPresentation(title2) {
    const t = await this.token();
    return googleFetch(t, "https://slides.googleapis.com/v1/presentations", {
      method: "POST",
      body: { title: title2 }
    });
  }
  async getPresentation(presentationId) {
    const t = await this.token();
    return googleFetch(t, `https://slides.googleapis.com/v1/presentations/${presentationId}`);
  }
  async batchUpdatePresentation(presentationId, requests) {
    const t = await this.token();
    return googleFetch(t, `https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`, {
      method: "POST",
      body: { requests }
    });
  }
  async getSlidePage(presentationId, pageObjectId) {
    const t = await this.token();
    return googleFetch(t, `https://slides.googleapis.com/v1/presentations/${presentationId}/pages/${pageObjectId}`);
  }
  async getSlidePageThumbnail(presentationId, pageObjectId) {
    const t = await this.token();
    return googleFetch(t, `https://slides.googleapis.com/v1/presentations/${presentationId}/pages/${pageObjectId}/thumbnail`, {
      params: { "thumbnailProperties.thumbnailSize": "LARGE" }
    });
  }
  // ============================================
  // GOOGLE FORMS
  // ============================================
  async createForm(title2, documentTitle) {
    const t = await this.token();
    return googleFetch(t, "https://forms.googleapis.com/v1/forms", {
      method: "POST",
      body: { info: { title: title2, documentTitle: documentTitle || title2 } }
    });
  }
  async getForm(formId) {
    const t = await this.token();
    return googleFetch(t, `https://forms.googleapis.com/v1/forms/${formId}`);
  }
  async listFormResponses(formId, pageSize = 50) {
    const t = await this.token();
    return googleFetch(t, `https://forms.googleapis.com/v1/forms/${formId}/responses`, {
      params: { pageSize: String(pageSize) }
    });
  }
  async getFormResponse(formId, responseId) {
    const t = await this.token();
    return googleFetch(t, `https://forms.googleapis.com/v1/forms/${formId}/responses/${responseId}`);
  }
  async batchUpdateForm(formId, requests) {
    const t = await this.token();
    return googleFetch(t, `https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
      method: "POST",
      body: { requests }
    });
  }
  // ============================================
  // GOOGLE TASKS
  // ============================================
  async listTaskLists() {
    const t = await this.token();
    return googleFetch(t, "https://tasks.googleapis.com/tasks/v1/users/@me/lists");
  }
  async listTasks(taskListId, options) {
    const t = await this.token();
    const params = {};
    if (options?.showCompleted !== void 0) params.showCompleted = String(options.showCompleted);
    if (options?.showHidden !== void 0) params.showHidden = String(options.showHidden);
    if (options?.maxResults) params.maxResults = String(options.maxResults);
    return googleFetch(t, `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks`, { params });
  }
  async createTask(taskListId, task) {
    const t = await this.token();
    const body = { title: task.title };
    if (task.notes) body.notes = task.notes;
    if (task.due) body.due = task.due;
    const url = `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks`;
    const params = {};
    if (task.parent) params.parent = task.parent;
    return googleFetch(t, url, { method: "POST", body, params });
  }
  async updateTask(taskListId, taskId, updates) {
    const t = await this.token();
    return googleFetch(t, `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks/${taskId}`, {
      method: "PATCH",
      body: updates
    });
  }
  async deleteTask(taskListId, taskId) {
    const t = await this.token();
    const resp = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks/${taskId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Delete task failed: ${resp.status}`);
    return { deleted: true };
  }
  async createTaskList(title2) {
    const t = await this.token();
    return googleFetch(t, "https://tasks.googleapis.com/tasks/v1/users/@me/lists", {
      method: "POST",
      body: { title: title2 }
    });
  }
  // ============================================
  // GOOGLE CONTACTS (People API)
  // ============================================
  async searchContacts(query, maxResults = 20) {
    const t = await this.token();
    return googleFetch(t, "https://people.googleapis.com/v1/people:searchContacts", {
      params: {
        query,
        readMask: "names,emailAddresses,phoneNumbers,organizations,addresses",
        pageSize: String(maxResults)
      }
    });
  }
  async listContacts(pageSize = 50, pageToken) {
    const t = await this.token();
    const params = {
      personFields: "names,emailAddresses,phoneNumbers,organizations,addresses,photos",
      pageSize: String(pageSize),
      sortOrder: "LAST_NAME_ASCENDING"
    };
    if (pageToken) params.pageToken = pageToken;
    return googleFetch(t, "https://people.googleapis.com/v1/people/me/connections", { params });
  }
  async getContact(resourceName) {
    const t = await this.token();
    return googleFetch(t, `https://people.googleapis.com/v1/${resourceName}`, {
      params: { personFields: "names,emailAddresses,phoneNumbers,organizations,addresses,biographies,urls,photos" }
    });
  }
  async createContact(contact) {
    const t = await this.token();
    const body = {
      names: [{ givenName: contact.givenName, familyName: contact.familyName }]
    };
    if (contact.email) body.emailAddresses = [{ value: contact.email }];
    if (contact.phone) body.phoneNumbers = [{ value: contact.phone }];
    if (contact.organization) body.organizations = [{ name: contact.organization, title: contact.title }];
    return googleFetch(t, "https://people.googleapis.com/v1/people:createContact", {
      method: "POST",
      body
    });
  }
  async updateContact(resourceName, contact) {
    const t = await this.token();
    const body = { etag: contact.etag };
    const updateFields = [];
    if (contact.givenName || contact.familyName) {
      body.names = [{ givenName: contact.givenName, familyName: contact.familyName }];
      updateFields.push("names");
    }
    if (contact.email) {
      body.emailAddresses = [{ value: contact.email }];
      updateFields.push("emailAddresses");
    }
    if (contact.phone) {
      body.phoneNumbers = [{ value: contact.phone }];
      updateFields.push("phoneNumbers");
    }
    return googleFetch(t, `https://people.googleapis.com/v1/${resourceName}:updateContact`, {
      method: "PATCH",
      params: { updatePersonFields: updateFields.join(",") },
      body
    });
  }
  async deleteContact(resourceName) {
    const t = await this.token();
    const resp = await fetch(`https://people.googleapis.com/v1/${resourceName}:deleteContact`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Delete contact failed: ${resp.status}`);
    return { deleted: true };
  }
  async listContactGroups() {
    const t = await this.token();
    return googleFetch(t, "https://people.googleapis.com/v1/contactGroups", {
      params: { groupFields: "name,groupType,memberCount" }
    });
  }
  // ============================================
  // GOOGLE CHAT
  // ============================================
  async listChatSpaces() {
    const t = await this.token();
    return googleFetch(t, "https://chat.googleapis.com/v1/spaces");
  }
  async getChatMessages(spaceName, pageSize = 25) {
    const t = await this.token();
    return googleFetch(t, `https://chat.googleapis.com/v1/${spaceName}/messages`, {
      params: { pageSize: String(pageSize) }
    });
  }
  async sendChatMessage(spaceName, text) {
    const t = await this.token();
    return googleFetch(t, `https://chat.googleapis.com/v1/${spaceName}/messages`, {
      method: "POST",
      body: { text }
    });
  }
  // ============================================
  // GOOGLE APPS SCRIPT
  // ============================================
  async listScriptProjects() {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/drive/v3/files", {
      params: {
        q: "mimeType='application/vnd.google-apps.script'",
        fields: "files(id,name,modifiedTime)",
        pageSize: "50"
      }
    });
  }
  async getScriptProject(scriptId) {
    const t = await this.token();
    return googleFetch(t, `https://script.googleapis.com/v1/projects/${scriptId}/content`);
  }
  async createScriptProject(title2, parentId) {
    const t = await this.token();
    const body = { title: title2 };
    if (parentId) body.parentId = parentId;
    return googleFetch(t, "https://script.googleapis.com/v1/projects", {
      method: "POST",
      body
    });
  }
  async updateScriptContent(scriptId, files) {
    const t = await this.token();
    return googleFetch(t, `https://script.googleapis.com/v1/projects/${scriptId}/content`, {
      method: "PUT",
      body: { files }
    });
  }
  async runScriptFunction(scriptId, functionName, parameters, devMode = true) {
    const t = await this.token();
    return googleFetch(t, `https://script.googleapis.com/v1/scripts/${scriptId}:run`, {
      method: "POST",
      body: { function: functionName, parameters: parameters || [], devMode }
    });
  }
  async listDeployments(scriptId) {
    const t = await this.token();
    return googleFetch(t, `https://script.googleapis.com/v1/projects/${scriptId}/deployments`);
  }
  async createDeployment(scriptId, versionNumber, description) {
    const t = await this.token();
    return googleFetch(t, `https://script.googleapis.com/v1/projects/${scriptId}/deployments`, {
      method: "POST",
      body: {
        versionNumber,
        manifestFileName: "appsscript",
        description
      }
    });
  }
  // ============================================
  // GOOGLE CUSTOM SEARCH
  // ============================================
  async customSearch(query, options) {
    if (!options?.apiKey || !options?.engineId) {
      throw new Error("Custom Search requires GOOGLE_PSE_API_KEY and GOOGLE_PSE_ENGINE_ID");
    }
    const params = {
      key: options.apiKey,
      cx: options.engineId,
      q: query
    };
    if (options.num) params.num = String(options.num);
    if (options.start) params.start = String(options.start);
    if (options.siteSearch) params.siteSearch = options.siteSearch;
    const resp = await fetch(`https://customsearch.googleapis.com/customsearch/v1?${new URLSearchParams(params)}`);
    if (!resp.ok) throw new Error(`Custom Search error: ${resp.status}`);
    return resp.json();
  }
  async customSearchSiteRestrict(query, options) {
    if (!options.apiKey || !options.engineId) throw new Error("Requires GOOGLE_PSE_API_KEY and GOOGLE_PSE_ENGINE_ID");
    const params = { key: options.apiKey, cx: options.engineId, q: query };
    if (options.num) params.num = String(options.num);
    if (options.start) params.start = String(options.start);
    const resp = await fetch(`https://customsearch.googleapis.com/customsearch/v1/siterestrict?${new URLSearchParams(params)}`);
    if (!resp.ok) throw new Error(`Custom Search siterestrict error: ${resp.status}`);
    return resp.json();
  }
  // ============================================
  // GMAIL - EXTENDED
  // ============================================
  async batchModifyGmailLabels(messageIds, addLabels, removeLabels) {
    const t = await this.token();
    return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/messages/batchModify", {
      method: "POST",
      body: { ids: messageIds, addLabelIds: addLabels || [], removeLabelIds: removeLabels || [] }
    });
  }
  async createGmailFilter(criteria, action) {
    const t = await this.token();
    return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/settings/filters", {
      method: "POST",
      body: { criteria, action }
    });
  }
  async deleteGmailFilter(filterId) {
    const t = await this.token();
    const resp = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/settings/filters/${filterId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Delete filter failed: ${resp.status}`);
    return { deleted: true };
  }
  async listGmailFilters() {
    const t = await this.token();
    return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/settings/filters");
  }
  async manageGmailLabel(action, options) {
    const t = await this.token();
    if (action === "create") {
      return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/labels", {
        method: "POST",
        body: { name: options.name, labelListVisibility: options.labelListVisibility || "labelShow", messageListVisibility: options.messageListVisibility || "show" }
      });
    } else if (action === "update") {
      return googleFetch(t, `https://gmail.googleapis.com/gmail/v1/users/me/labels/${options.id}`, {
        method: "PATCH",
        body: { name: options.name, labelListVisibility: options.labelListVisibility, messageListVisibility: options.messageListVisibility }
      });
    } else {
      const resp = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/labels/${options.id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${t}` }
      });
      if (!resp.ok && resp.status !== 204) throw new Error(`Delete label failed: ${resp.status}`);
      return { deleted: true };
    }
  }
  async getGmailAttachment(messageId, attachmentId) {
    const t = await this.token();
    return googleFetch(t, `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/attachments/${attachmentId}`);
  }
  async getGmailMessagesBatch(messageIds, format = "full") {
    const t = await this.token();
    return Promise.all(messageIds.map(
      (id) => googleFetch(t, `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`, { params: { format } })
    ));
  }
  async getGmailThreadsBatch(threadIds) {
    const t = await this.token();
    return Promise.all(threadIds.map(
      (id) => googleFetch(t, `https://gmail.googleapis.com/gmail/v1/users/me/threads/${id}`, { params: { format: "full" } })
    ));
  }
  // ============================================
  // CALENDAR - EXTENDED
  // ============================================
  async queryFreebusy(timeMin, timeMax, calendarIds) {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/calendar/v3/freeBusy", {
      method: "POST",
      body: { timeMin, timeMax, items: calendarIds.map((id) => ({ id })) }
    });
  }
  // ============================================
  // DRIVE - EXTENDED
  // ============================================
  async checkDriveFilePublicAccess(query) {
    const t = await this.token();
    const files = await googleFetch(t, "https://www.googleapis.com/drive/v3/files", {
      params: { q: `name contains '${query.replace(/'/g, "\\'")}'`, fields: "files(id,name,permissions,shared)", pageSize: "10" }
    });
    const results = (files.files || []).map((f) => ({
      id: f.id,
      name: f.name,
      shared: f.shared,
      publicAccess: (f.permissions || []).some((p) => p.type === "anyone")
    }));
    return { files: results };
  }
  async getDriveFileDownloadUrl(fileId) {
    const t = await this.token();
    const meta = await googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}`, {
      params: { fields: "id,name,mimeType,webContentLink,exportLinks" }
    });
    return meta;
  }
  async getDriveFilePermissions(fileId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}`, {
      params: { fields: "id,name,mimeType,shared,permissions(id,type,role,emailAddress,domain,displayName),sharingUser,owners" }
    });
  }
  async setDriveFilePermissions(fileId, permissions, linkSharing) {
    const t = await this.token();
    const results = [];
    if (linkSharing) {
      results.push(await googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
        method: "POST",
        body: { role: linkSharing.role, type: "anyone" }
      }));
    } else if (linkSharing === null) {
      const perms = await googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
        params: { fields: "permissions(id,type)" }
      });
      for (const p of perms.permissions || []) {
        if (p.type === "anyone") {
          await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions/${p.id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${t}` }
          });
          results.push({ removed: p.id });
        }
      }
    }
    for (const perm of permissions) {
      results.push(await googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
        method: "POST",
        body: perm,
        params: { sendNotificationEmail: "true" }
      }));
    }
    return { results };
  }
  async updateDriveFile(fileId, metadata) {
    const t = await this.token();
    const params = {};
    if (metadata.addParents) params.addParents = metadata.addParents;
    if (metadata.removeParents) params.removeParents = metadata.removeParents;
    const body = {};
    if (metadata.name !== void 0) body.name = metadata.name;
    if (metadata.description !== void 0) body.description = metadata.description;
    if (metadata.mimeType !== void 0) body.mimeType = metadata.mimeType;
    if (metadata.starred !== void 0) body.starred = metadata.starred;
    if (metadata.trashed !== void 0) body.trashed = metadata.trashed;
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: "PATCH",
      body,
      params
    });
  }
  async updateDrivePermission(fileId, permissionId, role) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/permissions/${permissionId}`, {
      method: "PATCH",
      body: { role }
    });
  }
  async removeDrivePermission(fileId, permissionId) {
    const t = await this.token();
    const resp = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions/${permissionId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Remove permission failed: ${resp.status}`);
    return { removed: true };
  }
  async transferDriveOwnership(fileId, newOwnerEmail) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
      method: "POST",
      body: { role: "owner", type: "user", emailAddress: newOwnerEmail },
      params: { transferOwnership: "true" }
    });
  }
  async batchShareDriveFile(fileId, shares) {
    const t = await this.token();
    return Promise.all(shares.map(
      (s) => googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
        method: "POST",
        body: { role: s.role || "reader", type: s.type || "user", emailAddress: s.email },
        params: { sendNotificationEmail: "true" }
      })
    ));
  }
  async listDocsInFolder(folderId, maxResults = 50) {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/drive/v3/files", {
      params: {
        q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.document' and trashed=false`,
        pageSize: String(maxResults),
        fields: "files(id,name,mimeType,modifiedTime,webViewLink)",
        orderBy: "modifiedTime desc"
      }
    });
  }
  // ============================================
  // DOCS - EXTENDED
  // ============================================
  async createDocumentComment(fileId, content, anchor) {
    const t = await this.token();
    const body = { content };
    if (anchor) body.anchor = anchor;
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/comments`, {
      method: "POST",
      body,
      params: { fields: "*" }
    });
  }
  async readDocumentComments(fileId, maxResults = 100) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/comments`, {
      params: { fields: "*", pageSize: String(maxResults) }
    });
  }
  async replyToComment(fileId, commentId, content) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/comments/${commentId}/replies`, {
      method: "POST",
      body: { content },
      params: { fields: "*" }
    });
  }
  async resolveComment(fileId, commentId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/comments/${commentId}`, {
      method: "PATCH",
      body: { resolved: true },
      params: { fields: "*" }
    });
  }
  async insertDocElements(documentId, elements) {
    const t = await this.token();
    const requests = [];
    const sorted = [...elements].sort((a, b) => b.index - a.index);
    for (const el of sorted) {
      if (el.type === "table") {
        requests.push({ insertTable: { location: { index: el.index }, rows: el.rows || 3, columns: el.columns || 3 } });
      } else if (el.type === "page_break") {
        requests.push({ insertPageBreak: { location: { index: el.index } } });
      } else if (el.type === "horizontal_rule") {
        requests.push({ insertText: { location: { index: el.index }, text: "\n" } });
      } else if (el.type === "section_break") {
        requests.push({ insertSectionBreak: { location: { index: el.index }, sectionType: "NEXT_PAGE" } });
      }
    }
    return googleFetch(t, `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
      method: "POST",
      body: { requests }
    });
  }
  async insertDocImage(documentId, imageUri, index, width, height) {
    const t = await this.token();
    const req = { insertInlineImage: { location: { index }, uri: imageUri } };
    if (width || height) {
      req.insertInlineImage.objectSize = {};
      if (width) req.insertInlineImage.objectSize.width = { magnitude: width, unit: "PT" };
      if (height) req.insertInlineImage.objectSize.height = { magnitude: height, unit: "PT" };
    }
    return googleFetch(t, `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
      method: "POST",
      body: { requests: [req] }
    });
  }
  async inspectDocStructure(documentId) {
    const t = await this.token();
    const doc = await googleFetch(t, `https://docs.googleapis.com/v1/documents/${documentId}`);
    const elements = [];
    let index = 1;
    for (const el of doc.body?.content || []) {
      if (el.paragraph) {
        const text = (el.paragraph.elements || []).map((e) => e.textRun?.content || "").join("").trim();
        const style = el.paragraph.paragraphStyle?.namedStyleType || "NORMAL_TEXT";
        if (text) elements.push({ type: "paragraph", style, index: el.startIndex, endIndex: el.endIndex, preview: text.substring(0, 80) });
      } else if (el.table) {
        elements.push({ type: "table", index: el.startIndex, endIndex: el.endIndex, rows: el.table.rows, columns: el.table.columns });
      } else if (el.sectionBreak) {
        elements.push({ type: "section_break", index: el.startIndex });
      }
    }
    return { documentId: doc.documentId, title: doc.title, elements, totalElements: elements.length, endIndex: doc.body?.content?.slice(-1)?.[0]?.endIndex };
  }
  async updateDocHeadersFooters(documentId, updates) {
    const t = await this.token();
    const doc = await googleFetch(t, `https://docs.googleapis.com/v1/documents/${documentId}`);
    const requests = [];
    if (updates.header) {
      let headerId = doc.headers ? Object.keys(doc.headers)[updates.header.sectionIndex || 0] : null;
      if (!headerId) {
        const createReq = await googleFetch(t, `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
          method: "POST",
          body: { requests: [{ createHeader: { type: "DEFAULT", sectionBreakLocation: { index: 0 } } }] }
        });
        headerId = createReq.replies?.[0]?.createHeader?.headerId;
      }
      if (headerId) {
        requests.push({ insertText: { location: { segmentId: headerId, index: 0 }, text: updates.header.text } });
      }
    }
    if (updates.footer) {
      let footerId = doc.footers ? Object.keys(doc.footers)[updates.footer.sectionIndex || 0] : null;
      if (!footerId) {
        const createReq = await googleFetch(t, `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
          method: "POST",
          body: { requests: [{ createFooter: { type: "DEFAULT", sectionBreakLocation: { index: 0 } } }] }
        });
        footerId = createReq.replies?.[0]?.createFooter?.footerId;
      }
      if (footerId) {
        requests.push({ insertText: { location: { segmentId: footerId, index: 0 }, text: updates.footer.text } });
      }
    }
    if (requests.length > 0) {
      return googleFetch(t, `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
        method: "POST",
        body: { requests }
      });
    }
    return { noChanges: true };
  }
  async updateParagraphStyle(documentId, startIndex, endIndex, style) {
    const t = await this.token();
    const paragraphStyle = {};
    const fields = [];
    if (style.namedStyleType) {
      paragraphStyle.namedStyleType = style.namedStyleType;
      fields.push("namedStyleType");
    }
    if (style.alignment) {
      paragraphStyle.alignment = style.alignment;
      fields.push("alignment");
    }
    if (style.lineSpacing) {
      paragraphStyle.lineSpacing = style.lineSpacing;
      fields.push("lineSpacing");
    }
    if (style.spaceAbove !== void 0) {
      paragraphStyle.spaceAbove = { magnitude: style.spaceAbove, unit: "PT" };
      fields.push("spaceAbove");
    }
    if (style.spaceBelow !== void 0) {
      paragraphStyle.spaceBelow = { magnitude: style.spaceBelow, unit: "PT" };
      fields.push("spaceBelow");
    }
    if (style.indentFirstLine !== void 0) {
      paragraphStyle.indentFirstLine = { magnitude: style.indentFirstLine, unit: "PT" };
      fields.push("indentFirstLine");
    }
    if (style.indentStart !== void 0) {
      paragraphStyle.indentStart = { magnitude: style.indentStart, unit: "PT" };
      fields.push("indentStart");
    }
    return googleFetch(t, `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
      method: "POST",
      body: { requests: [{ updateParagraphStyle: { range: { startIndex, endIndex }, paragraphStyle, fields: fields.join(",") } }] }
    });
  }
  async createTableWithData(documentId, index, data) {
    const t = await this.token();
    const rows = data.length;
    const cols = data[0]?.length || 1;
    await googleFetch(t, `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
      method: "POST",
      body: { requests: [{ insertTable: { location: { index }, rows, columns: cols } }] }
    });
    const doc = await googleFetch(t, `https://docs.googleapis.com/v1/documents/${documentId}`);
    const table3 = (doc.body?.content || []).find((el) => el.table && el.startIndex >= index);
    if (!table3) return { error: "Table not found after creation" };
    const requests = [];
    for (let r = rows - 1; r >= 0; r--) {
      for (let c = cols - 1; c >= 0; c--) {
        const cell = table3.table.tableRows[r]?.tableCells[c];
        if (cell && data[r][c]) {
          const cellIndex = cell.content[0]?.startIndex;
          if (cellIndex !== void 0) {
            requests.push({ insertText: { location: { index: cellIndex }, text: data[r][c] } });
          }
        }
      }
    }
    if (requests.length > 0) {
      return googleFetch(t, `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
        method: "POST",
        body: { requests }
      });
    }
    return { created: true, rows, columns: cols };
  }
  async debugTableStructure(documentId) {
    const t = await this.token();
    const doc = await googleFetch(t, `https://docs.googleapis.com/v1/documents/${documentId}`);
    const tables = [];
    for (const el of doc.body?.content || []) {
      if (el.table) {
        const tableInfo = {
          startIndex: el.startIndex,
          endIndex: el.endIndex,
          rows: el.table.rows,
          columns: el.table.columns,
          cells: []
        };
        for (let r = 0; r < el.table.tableRows.length; r++) {
          for (let c = 0; c < el.table.tableRows[r].tableCells.length; c++) {
            const cell = el.table.tableRows[r].tableCells[c];
            const text = (cell.content || []).map(
              (p) => (p.paragraph?.elements || []).map((e) => e.textRun?.content || "").join("")
            ).join("").trim();
            tableInfo.cells.push({ row: r, col: c, startIndex: cell.startIndex, endIndex: cell.endIndex, text: text.substring(0, 50) });
          }
        }
        tables.push(tableInfo);
      }
    }
    return { documentId: doc.documentId, title: doc.title, tables, totalTables: tables.length };
  }
  async exportDocToPdf(documentId, folderId) {
    const t = await this.token();
    const meta = await googleFetch(t, `https://www.googleapis.com/drive/v3/files/${documentId}`, {
      params: { fields: "name" }
    });
    const resp = await fetch(`https://www.googleapis.com/drive/v3/files/${documentId}/export?mimeType=application/pdf`, {
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok) throw new Error(`Export failed: ${resp.status}`);
    const pdfBlob = await resp.arrayBuffer();
    const pdfName = `${meta.name || "document"}.pdf`;
    const metadata = { name: pdfName, mimeType: "application/pdf" };
    if (folderId) metadata.parents = [folderId];
    const boundary = "-------314159265358979324";
    const metaJson = JSON.stringify(metadata);
    const encoder = new TextEncoder();
    const parts = [
      encoder.encode(`--${boundary}\r
Content-Type: application/json; charset=UTF-8\r
\r
${metaJson}\r
--${boundary}\r
Content-Type: application/pdf\r
\r
`),
      new Uint8Array(pdfBlob),
      encoder.encode(`\r
--${boundary}--`)
    ];
    const totalLen = parts.reduce((s, p) => s + p.byteLength, 0);
    const body = new Uint8Array(totalLen);
    let offset = 0;
    for (const p of parts) {
      body.set(p, offset);
      offset += p.byteLength;
    }
    const uploadResp = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
      method: "POST",
      headers: { "Authorization": `Bearer ${t}`, "Content-Type": `multipart/related; boundary=${boundary}` },
      body
    });
    if (!uploadResp.ok) throw new Error(`Upload PDF failed: ${uploadResp.status}`);
    return uploadResp.json();
  }
  async importToGoogleDoc(fileId, name) {
    const t = await this.token();
    const body = { name: name || "Imported Document", mimeType: "application/vnd.google-apps.document" };
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/copy`, {
      method: "POST",
      body
    });
  }
  // ============================================
  // SHEETS - EXTENDED
  // ============================================
  async createSheet(spreadsheetId, title2, index) {
    const t = await this.token();
    const req = { addSheet: { properties: { title: title2 } } };
    if (index !== void 0) req.addSheet.properties.index = index;
    return googleFetch(t, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: "POST",
      body: { requests: [req] }
    });
  }
  async listSpreadsheets(maxResults = 50) {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/drive/v3/files", {
      params: {
        q: "mimeType='application/vnd.google-apps.spreadsheet' and trashed=false",
        pageSize: String(maxResults),
        fields: "files(id,name,modifiedTime,webViewLink)",
        orderBy: "modifiedTime desc"
      }
    });
  }
  // ============================================
  // FORMS - EXTENDED
  // ============================================
  async setFormPublishSettings(formId, settings) {
    const t = await this.token();
    const requests = [];
    const updateMask = [];
    if (settings.isQuiz !== void 0) {
      updateMask.push("quiz_settings.is_quiz");
    }
    if (settings.collectEmail !== void 0 || settings.limitToOneResponse !== void 0) {
      const updateSettings = {};
      if (settings.collectEmail !== void 0) updateSettings.collectEmail = settings.collectEmail;
      return googleFetch(t, `https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
        method: "POST",
        body: { requests: [{ updateSettings: { settings: updateSettings, updateMask: "collectEmail" } }] }
      });
    }
    return { noChanges: true };
  }
  // ============================================
  // TASKS - EXTENDED
  // ============================================
  async clearCompletedTasks(taskListId) {
    const t = await this.token();
    const resp = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/clear`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Clear tasks failed: ${resp.status}`);
    return { cleared: true };
  }
  async deleteTaskList(taskListId) {
    const t = await this.token();
    const resp = await fetch(`https://tasks.googleapis.com/tasks/v1/users/@me/lists/${taskListId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Delete task list failed: ${resp.status}`);
    return { deleted: true };
  }
  async getTask(taskListId, taskId) {
    const t = await this.token();
    return googleFetch(t, `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks/${taskId}`);
  }
  async getTaskList(taskListId) {
    const t = await this.token();
    return googleFetch(t, `https://tasks.googleapis.com/tasks/v1/users/@me/lists/${taskListId}`);
  }
  async moveTask(taskListId, taskId, parent, previous) {
    const t = await this.token();
    const params = {};
    if (parent) params.parent = parent;
    if (previous) params.previous = previous;
    return googleFetch(t, `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks/${taskId}/move`, {
      method: "POST",
      params
    });
  }
  async updateTaskList(taskListId, title2) {
    const t = await this.token();
    return googleFetch(t, `https://tasks.googleapis.com/tasks/v1/users/@me/lists/${taskListId}`, {
      method: "PATCH",
      body: { title: title2 }
    });
  }
  // ============================================
  // CONTACTS - EXTENDED
  // ============================================
  async batchCreateContacts(contacts) {
    return Promise.all(contacts.map((c) => this.createContact(c)));
  }
  async batchDeleteContacts(resourceNames) {
    return Promise.all(resourceNames.map((rn) => this.deleteContact(rn)));
  }
  async batchUpdateContacts(updates) {
    return Promise.all(updates.map((u) => this.updateContact(u.resourceName, u)));
  }
  async createContactGroup(name) {
    const t = await this.token();
    return googleFetch(t, "https://people.googleapis.com/v1/contactGroups", {
      method: "POST",
      body: { contactGroup: { name } }
    });
  }
  async deleteContactGroup(resourceName) {
    const t = await this.token();
    const resp = await fetch(`https://people.googleapis.com/v1/${resourceName}?deleteContacts=false`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Delete group failed: ${resp.status}`);
    return { deleted: true };
  }
  async getContactGroup(resourceName) {
    const t = await this.token();
    return googleFetch(t, `https://people.googleapis.com/v1/${resourceName}`, {
      params: { groupFields: "name,groupType,memberCount,clientData", maxMembers: "100" }
    });
  }
  async modifyContactGroupMembers(resourceName, addMembers, removeMembers) {
    const t = await this.token();
    const body = {};
    if (addMembers?.length) body.resourceNamesToAdd = addMembers;
    if (removeMembers?.length) body.resourceNamesToRemove = removeMembers;
    return googleFetch(t, `https://people.googleapis.com/v1/${resourceName}/members:modify`, {
      method: "POST",
      body
    });
  }
  async updateContactGroup(resourceName, name) {
    const t = await this.token();
    return googleFetch(t, `https://people.googleapis.com/v1/${resourceName}`, {
      method: "PUT",
      body: { contactGroup: { name }, updateGroupFields: "name" }
    });
  }
  // ============================================
  // CHAT - EXTENDED
  // ============================================
  async searchChatMessages(spaceName, query, pageSize = 25) {
    const t = await this.token();
    const messages = await googleFetch(t, `https://chat.googleapis.com/v1/${spaceName}/messages`, {
      params: { pageSize: String(pageSize), filter: `text="${query}"` }
    });
    return messages;
  }
  // ============================================
  // APPS SCRIPT - EXTENDED
  // ============================================
  async createScriptVersion(scriptId, description) {
    const t = await this.token();
    return googleFetch(t, `https://script.googleapis.com/v1/projects/${scriptId}/versions`, {
      method: "POST",
      body: { description: description || "" }
    });
  }
  async deleteDeployment(scriptId, deploymentId) {
    const t = await this.token();
    const resp = await fetch(`https://script.googleapis.com/v1/projects/${scriptId}/deployments/${deploymentId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Delete deployment failed: ${resp.status}`);
    return { deleted: true };
  }
  async deleteScriptProject(scriptId) {
    const t = await this.token();
    const resp = await fetch(`https://www.googleapis.com/drive/v3/files/${scriptId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Delete script failed: ${resp.status}`);
    return { deleted: true };
  }
  async getScriptContent(scriptId, fileName) {
    const t = await this.token();
    const project = await googleFetch(t, `https://script.googleapis.com/v1/projects/${scriptId}/content`);
    const file = (project.files || []).find((f) => f.name === fileName);
    if (!file) throw new Error(`File '${fileName}' not found in script project`);
    return file;
  }
  async getScriptMetrics(scriptId) {
    const t = await this.token();
    return googleFetch(t, `https://script.googleapis.com/v1/projects/${scriptId}/metrics`, {
      params: { "metricsFilter.deploymentId": scriptId }
    });
  }
  async getScriptVersion(scriptId, versionNumber) {
    const t = await this.token();
    return googleFetch(t, `https://script.googleapis.com/v1/projects/${scriptId}/versions/${versionNumber}`);
  }
  async listScriptProcesses() {
    const t = await this.token();
    return googleFetch(t, "https://script.googleapis.com/v1/processes", {
      params: { pageSize: "50" }
    });
  }
  async listScriptVersions(scriptId) {
    const t = await this.token();
    return googleFetch(t, `https://script.googleapis.com/v1/projects/${scriptId}/versions`);
  }
  async updateDeployment(scriptId, deploymentId, versionNumber, description) {
    const t = await this.token();
    return googleFetch(t, `https://script.googleapis.com/v1/projects/${scriptId}/deployments/${deploymentId}`, {
      method: "PUT",
      body: { deploymentConfig: { versionNumber, manifestFileName: "appsscript", description } }
    });
  }
  // Project metadata (title, parentId, createTime, updateTime) — different from /content
  async getScriptProjectInfo(scriptId) {
    const t = await this.token();
    return googleFetch(t, `https://script.googleapis.com/v1/projects/${scriptId}`);
  }
  // Add or replace a single file without overwriting the entire project
  async addScriptFile(scriptId, name, type, source) {
    const t = await this.token();
    const project = await googleFetch(t, `https://script.googleapis.com/v1/projects/${scriptId}/content`);
    const files = project.files || [];
    const idx = files.findIndex(f => f.name === name);
    const fileObj = { name, type: type || "SERVER_JS", source };
    if (idx >= 0) files[idx] = fileObj; else files.push(fileObj);
    return googleFetch(t, `https://script.googleapis.com/v1/projects/${scriptId}/content`, {
      method: "PUT",
      body: { files }
    });
  }
  // Remove a single file by name (cannot remove appsscript.json manifest)
  async deleteScriptFile(scriptId, fileName) {
    if (fileName === "appsscript") throw new Error("Cannot delete the appsscript.json manifest file");
    const t = await this.token();
    const project = await googleFetch(t, `https://script.googleapis.com/v1/projects/${scriptId}/content`);
    const files = (project.files || []).filter(f => f.name !== fileName);
    if (files.length === project.files?.length) throw new Error(`File '${fileName}' not found in script project`);
    return googleFetch(t, `https://script.googleapis.com/v1/projects/${scriptId}/content`, {
      method: "PUT",
      body: { files }
    });
  }
  // Get the appsscript.json manifest as a parsed object
  async getScriptManifest(scriptId) {
    const file = await this.getScriptContent(scriptId, "appsscript");
    try { return JSON.parse(file.source); } catch { return { raw: file.source }; }
  }
  // Replace the appsscript.json manifest (merges with existing by default)
  async setScriptManifest(scriptId, manifest, merge = true) {
    const t = await this.token();
    const project = await googleFetch(t, `https://script.googleapis.com/v1/projects/${scriptId}/content`);
    const files = project.files || [];
    const manifestIdx = files.findIndex(f => f.name === "appsscript");
    let newManifest = manifest;
    if (merge && manifestIdx >= 0) {
      try { newManifest = { ...JSON.parse(files[manifestIdx].source), ...manifest }; } catch {}
    }
    const manifestFile = { name: "appsscript", type: "JSON", source: JSON.stringify(newManifest, null, 2) };
    if (manifestIdx >= 0) files[manifestIdx] = manifestFile; else files.unshift(manifestFile);
    return googleFetch(t, `https://script.googleapis.com/v1/projects/${scriptId}/content`, {
      method: "PUT",
      body: { files }
    });
  }
  // Add a single OAuth scope to the manifest (non-destructive)
  async addScriptScope(scriptId, scope) {
    const manifest = await this.getScriptManifest(scriptId);
    const existing = manifest.oauthScopes || [];
    if (existing.includes(scope)) return { already_present: true, scope, oauthScopes: existing };
    const updated = { ...manifest, oauthScopes: [...existing, scope] };
    await this.setScriptManifest(scriptId, updated, false);
    return { added: true, scope, oauthScopes: updated.oauthScopes };
  }
  // Run multiple functions sequentially and collect results
  async runScriptFunctionBatch(scriptId, calls, devMode = true) {
    const results = [];
    for (const call of calls) {
      try {
        const r = await this.runScriptFunction(scriptId, call.functionName, call.parameters, devMode);
        results.push({ functionName: call.functionName, success: true, result: r });
      } catch (e) {
        results.push({ functionName: call.functionName, success: false, error: e.message });
        if (call.stopOnError) break;
      }
    }
    return { results, total: calls.length, succeeded: results.filter(r => r.success).length };
  }
  async generateTriggerCode(triggerType, functionName, options) {
    const templates = {
      "time": `function createTimeTrigger() {
  ScriptApp.newTrigger('${functionName}')
    .timeBased()
    .everyMinutes(${options?.minuteInterval || 15})
    .create();
}`,
      "calendar": `function createCalendarTrigger() {
  ScriptApp.newTrigger('${functionName}')
    .forUserCalendar('${options?.calendarId || "primary"}')
    .onEventUpdated()
    .create();
}`,
      "spreadsheet_open": `function createSpreadsheetTrigger() {
  var ss = SpreadsheetApp.openById('${options?.spreadsheetId || "SPREADSHEET_ID"}');
  ScriptApp.newTrigger('${functionName}')
    .forSpreadsheet(ss)
    .onOpen()
    .create();
}`,
      "spreadsheet_edit": `function createEditTrigger() {
  var ss = SpreadsheetApp.openById('${options?.spreadsheetId || "SPREADSHEET_ID"}');
  ScriptApp.newTrigger('${functionName}')
    .forSpreadsheet(ss)
    .onEdit()
    .create();
}`,
      "form_submit": `function createFormSubmitTrigger() {
  ScriptApp.newTrigger('${functionName}')
    .forForm(FormApp.getActiveForm())
    .onFormSubmit()
    .create();
}`
    };
    const code = templates[triggerType] || `// Unknown trigger type: ${triggerType}`;
    return { triggerType, functionName, code, instructions: "Copy this code into your Apps Script project and run the create function." };
  }
  async getSearchEngineInfo(engineId, apiKey) {
    const resp = await fetch(`https://customsearch.googleapis.com/customsearch/v1?cx=${engineId}&key=${apiKey}&q=test&num=1`);
    if (!resp.ok) throw new Error(`Search engine info failed: ${resp.status}`);
    const data = await resp.json();
    return { context: data.context, searchInformation: data.searchInformation };
  }
  // ============================================
  // YOUTUBE DATA API
  // ============================================
  async listYouTubeChannels(mine = true) {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/youtube/v3/channels", {
      params: { part: "snippet,contentDetails,statistics", mine: String(mine) }
    });
  }
  async searchYouTube(query, options) {
    const t = await this.token();
    const params = { part: "snippet", q: query, maxResults: String(options?.maxResults || 25) };
    if (options?.type) params.type = options.type;
    if (options?.channelId) params.channelId = options.channelId;
    if (options?.order) params.order = options.order;
    if (options?.publishedAfter) params.publishedAfter = options.publishedAfter;
    if (options?.publishedBefore) params.publishedBefore = options.publishedBefore;
    if (options?.videoDuration) params.videoDuration = options.videoDuration;
    return googleFetch(t, "https://www.googleapis.com/youtube/v3/search", { params });
  }
  async getYouTubeVideo(videoId) {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/youtube/v3/videos", {
      params: { part: "snippet,contentDetails,statistics,status,topicDetails", id: videoId }
    });
  }
  async listYouTubeVideos(channelId, playlistId, maxResults = 25) {
    const t = await this.token();
    if (playlistId) {
      return googleFetch(t, "https://www.googleapis.com/youtube/v3/playlistItems", {
        params: { part: "snippet,contentDetails", playlistId, maxResults: String(maxResults) }
      });
    }
    return googleFetch(t, "https://www.googleapis.com/youtube/v3/search", {
      params: { part: "snippet", channelId: channelId || "", type: "video", maxResults: String(maxResults), order: "date" }
    });
  }
  async getYouTubeVideoComments(videoId, maxResults = 25, order = "relevance") {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/youtube/v3/commentThreads", {
      params: { part: "snippet,replies", videoId, maxResults: String(maxResults), order }
    });
  }
  async postYouTubeComment(videoId, text) {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/youtube/v3/commentThreads", {
      method: "POST",
      params: { part: "snippet" },
      body: { snippet: { videoId, topLevelComment: { snippet: { textOriginal: text } } } }
    });
  }
  async replyYouTubeComment(parentId, text) {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/youtube/v3/comments", {
      method: "POST",
      params: { part: "snippet" },
      body: { snippet: { parentId, textOriginal: text } }
    });
  }
  async listYouTubePlaylists(mine = true, channelId) {
    const t = await this.token();
    const params = { part: "snippet,contentDetails", maxResults: "50" };
    if (channelId) params.channelId = channelId;
    else params.mine = String(mine);
    return googleFetch(t, "https://www.googleapis.com/youtube/v3/playlists", { params });
  }
  async createYouTubePlaylist(title2, description, privacyStatus = "private") {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/youtube/v3/playlists", {
      method: "POST",
      params: { part: "snippet,status" },
      body: { snippet: { title: title2, description: description || "" }, status: { privacyStatus } }
    });
  }
  async addVideoToPlaylist(playlistId, videoId, position) {
    const t = await this.token();
    const body = { snippet: { playlistId, resourceId: { kind: "youtube#video", videoId } } };
    if (position !== void 0) body.snippet.position = position;
    return googleFetch(t, "https://www.googleapis.com/youtube/v3/playlistItems", {
      method: "POST",
      params: { part: "snippet" },
      body
    });
  }
  async getYouTubeSubscriptions(mine = true, maxResults = 25) {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/youtube/v3/subscriptions", {
      params: { part: "snippet,contentDetails", mine: String(mine), maxResults: String(maxResults) }
    });
  }
  async updateYouTubeVideo(videoId, updates) {
    const t = await this.token();
    const video = await googleFetch(t, "https://www.googleapis.com/youtube/v3/videos", {
      params: { part: "snippet,status", id: videoId }
    });
    const item = video.items?.[0];
    if (!item) throw new Error("Video not found");
    if (updates.title) item.snippet.title = updates.title;
    if (updates.description) item.snippet.description = updates.description;
    if (updates.tags) item.snippet.tags = updates.tags;
    if (updates.categoryId) item.snippet.categoryId = updates.categoryId;
    if (updates.privacyStatus) item.status.privacyStatus = updates.privacyStatus;
    if (updates.publishAt) item.status.publishAt = updates.publishAt;
    return googleFetch(t, "https://www.googleapis.com/youtube/v3/videos", {
      method: "PUT",
      params: { part: "snippet,status" },
      body: item
    });
  }
  async getYouTubeAnalytics(options) {
    const t = await this.token();
    const params = {
      ids: "channel==MINE",
      startDate: options.startDate,
      endDate: options.endDate,
      metrics: options.metrics || "views,estimatedMinutesWatched,averageViewDuration,likes,subscribersGained"
    };
    if (options.dimensions) params.dimensions = options.dimensions;
    if (options.filters) params.filters = options.filters;
    if (options.sort) params.sort = options.sort;
    return googleFetch(t, "https://youtubeanalytics.googleapis.com/v2/reports", { params });
  }
  async getYouTubeChannel(channelId) {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/youtube/v3/channels", {
      params: { part: "snippet,contentDetails,statistics,brandingSettings", id: channelId }
    });
  }
  async listYouTubeLiveStreams() {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/youtube/v3/liveBroadcasts", {
      params: { part: "snippet,contentDetails,status", broadcastStatus: "all", maxResults: "25" }
    });
  }
  async getYouTubeCaptions(videoId) {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/youtube/v3/captions", {
      params: { part: "snippet", videoId }
    });
  }
  // ============================================
  // GOOGLE CLASSROOM
  // ============================================
  async listClassroomCourses(options) {
    const t = await this.token();
    const params = { pageSize: String(options?.pageSize || 30) };
    if (options?.studentId) params.studentId = options.studentId;
    if (options?.teacherId) params.teacherId = options.teacherId;
    if (options?.courseStates) params.courseStates = options.courseStates.join(",");
    return googleFetch(t, "https://classroom.googleapis.com/v1/courses", { params });
  }
  async getClassroomCourse(courseId) {
    const t = await this.token();
    return googleFetch(t, `https://classroom.googleapis.com/v1/courses/${courseId}`);
  }
  async createClassroomCourse(course) {
    const t = await this.token();
    return googleFetch(t, "https://classroom.googleapis.com/v1/courses", {
      method: "POST",
      body: course
    });
  }
  async updateClassroomCourse(courseId, updates, updateMask) {
    const t = await this.token();
    return googleFetch(t, `https://classroom.googleapis.com/v1/courses/${courseId}`, {
      method: "PATCH",
      params: { updateMask },
      body: updates
    });
  }
  async listClassroomStudents(courseId, pageSize = 30) {
    const t = await this.token();
    return googleFetch(t, `https://classroom.googleapis.com/v1/courses/${courseId}/students`, {
      params: { pageSize: String(pageSize) }
    });
  }
  async listClassroomTeachers(courseId) {
    const t = await this.token();
    return googleFetch(t, `https://classroom.googleapis.com/v1/courses/${courseId}/teachers`);
  }
  async inviteClassroomStudent(courseId, enrollment_code_or_email) {
    const t = await this.token();
    return googleFetch(t, `https://classroom.googleapis.com/v1/courses/${courseId}/students`, {
      method: "POST",
      body: { userId: enrollment_code_or_email }
    });
  }
  async listClassroomCoursework(courseId, pageSize = 30) {
    const t = await this.token();
    return googleFetch(t, `https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`, {
      params: { pageSize: String(pageSize), orderBy: "dueDate desc" }
    });
  }
  async createClassroomCoursework(courseId, coursework) {
    const t = await this.token();
    return googleFetch(t, `https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`, {
      method: "POST",
      body: coursework
    });
  }
  async listClassroomSubmissions(courseId, courseworkId, pageSize = 30) {
    const t = await this.token();
    return googleFetch(t, `https://classroom.googleapis.com/v1/courses/${courseId}/courseWork/${courseworkId}/studentSubmissions`, {
      params: { pageSize: String(pageSize) }
    });
  }
  async gradeClassroomSubmission(courseId, courseworkId, submissionId, grade) {
    const t = await this.token();
    return googleFetch(t, `https://classroom.googleapis.com/v1/courses/${courseId}/courseWork/${courseworkId}/studentSubmissions/${submissionId}`, {
      method: "PATCH",
      params: { updateMask: "assignedGrade,draftGrade" },
      body: { assignedGrade: grade, draftGrade: grade }
    });
  }
  async listClassroomAnnouncements(courseId, pageSize = 20) {
    const t = await this.token();
    return googleFetch(t, `https://classroom.googleapis.com/v1/courses/${courseId}/announcements`, {
      params: { pageSize: String(pageSize), orderBy: "updateTime desc" }
    });
  }
  async createClassroomAnnouncement(courseId, text, materials) {
    const t = await this.token();
    const body = { text, state: "PUBLISHED" };
    if (materials) body.materials = materials;
    return googleFetch(t, `https://classroom.googleapis.com/v1/courses/${courseId}/announcements`, {
      method: "POST",
      body
    });
  }
  async listClassroomTopics(courseId) {
    const t = await this.token();
    return googleFetch(t, `https://classroom.googleapis.com/v1/courses/${courseId}/topics`);
  }
  async createClassroomTopic(courseId, name) {
    const t = await this.token();
    return googleFetch(t, `https://classroom.googleapis.com/v1/courses/${courseId}/topics`, {
      method: "POST",
      body: { name }
    });
  }
  // ============================================
  // GOOGLE KEEP
  // ============================================
  async listKeepNotes(pageSize = 25, filter) {
    const t = await this.token();
    const params = { pageSize: String(pageSize) };
    if (filter) params.filter = filter;
    return googleFetch(t, "https://keep.googleapis.com/v1/notes", { params });
  }
  async getKeepNote(noteId) {
    const t = await this.token();
    return googleFetch(t, `https://keep.googleapis.com/v1/notes/${noteId}`);
  }
  async createKeepNote(title2, body, listContent) {
    const t = await this.token();
    const note = { title: title2 };
    if (listContent) {
      note.body = { list: { listItems: listContent.map((item) => ({ text: { text: item.text }, checked: item.checked || false })) } };
    } else {
      note.body = { text: { text: body } };
    }
    return googleFetch(t, "https://keep.googleapis.com/v1/notes", {
      method: "POST",
      body: note
    });
  }
  async deleteKeepNote(noteId) {
    const t = await this.token();
    const resp = await fetch(`https://keep.googleapis.com/v1/notes/${noteId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Delete Keep note failed: ${resp.status}`);
    return { deleted: true };
  }
  // ============================================
  // GOOGLE PHOTOS LIBRARY
  // ============================================
  async listPhotosAlbums(pageSize = 25) {
    const t = await this.token();
    return googleFetch(t, "https://photoslibrary.googleapis.com/v1/albums", {
      params: { pageSize: String(pageSize) }
    });
  }
  async getPhotosAlbum(albumId) {
    const t = await this.token();
    return googleFetch(t, `https://photoslibrary.googleapis.com/v1/albums/${albumId}`);
  }
  async createPhotosAlbum(title2) {
    const t = await this.token();
    return googleFetch(t, "https://photoslibrary.googleapis.com/v1/albums", {
      method: "POST",
      body: { album: { title: title2 } }
    });
  }
  async searchPhotos(options) {
    const t = await this.token();
    const body = { pageSize: options.pageSize || 25 };
    if (options.albumId) body.albumId = options.albumId;
    if (options.filters) body.filters = options.filters;
    return googleFetch(t, "https://photoslibrary.googleapis.com/v1/mediaItems:search", {
      method: "POST",
      body
    });
  }
  async getPhotoMediaItem(mediaItemId) {
    const t = await this.token();
    return googleFetch(t, `https://photoslibrary.googleapis.com/v1/mediaItems/${mediaItemId}`);
  }
  async listPhotosMediaItems(pageSize = 25) {
    const t = await this.token();
    return googleFetch(t, "https://photoslibrary.googleapis.com/v1/mediaItems", {
      params: { pageSize: String(pageSize) }
    });
  }
  async addPhotosToAlbum(albumId, mediaItemIds) {
    const t = await this.token();
    return googleFetch(t, `https://photoslibrary.googleapis.com/v1/albums/${albumId}:batchAddMediaItems`, {
      method: "POST",
      body: { mediaItemIds }
    });
  }
  async sharePhotosAlbum(albumId, isCollaborative = true, isCommentable = true) {
    const t = await this.token();
    return googleFetch(t, `https://photoslibrary.googleapis.com/v1/albums/${albumId}:share`, {
      method: "POST",
      body: { sharedAlbumOptions: { isCollaborative, isCommentable } }
    });
  }
  // ============================================
  // GOOGLE MEET
  // ============================================
  async createMeetSpace(options) {
    const t = await this.token();
    const body = { config: {} };
    if (options?.accessType) body.config.accessType = options.accessType;
    if (options?.entryPointAccess) body.config.entryPointAccess = options.entryPointAccess;
    return googleFetch(t, "https://meet.googleapis.com/v2/spaces", {
      method: "POST",
      body
    });
  }
  async getMeetSpace(spaceName) {
    const t = await this.token();
    return googleFetch(t, `https://meet.googleapis.com/v2/${spaceName}`);
  }
  async updateMeetSpace(spaceName, config2) {
    const t = await this.token();
    const updateMask = [];
    if (config2.accessType) updateMask.push("config.access_type");
    if (config2.entryPointAccess) updateMask.push("config.entry_point_access");
    return googleFetch(t, `https://meet.googleapis.com/v2/${spaceName}`, {
      method: "PATCH",
      params: { updateMask: updateMask.join(",") },
      body: { config: config2 }
    });
  }
  async endMeetActiveConference(spaceName) {
    const t = await this.token();
    return googleFetch(t, `https://meet.googleapis.com/v2/${spaceName}/activeConference:end`, {
      method: "POST",
      body: {}
    });
  }
  async listMeetConferenceRecords(filter) {
    const t = await this.token();
    const params = {};
    if (filter) params.filter = filter;
    return googleFetch(t, "https://meet.googleapis.com/v2/conferenceRecords", { params });
  }
  async listMeetParticipants(conferenceRecord) {
    const t = await this.token();
    return googleFetch(t, `https://meet.googleapis.com/v2/${conferenceRecord}/participants`);
  }
  async listMeetRecordings(conferenceRecord) {
    const t = await this.token();
    return googleFetch(t, `https://meet.googleapis.com/v2/${conferenceRecord}/recordings`);
  }
  async listMeetTranscripts(conferenceRecord) {
    const t = await this.token();
    return googleFetch(t, `https://meet.googleapis.com/v2/${conferenceRecord}/transcripts`);
  }
  async getMeetTranscriptEntries(transcript) {
    const t = await this.token();
    return googleFetch(t, `https://meet.googleapis.com/v2/${transcript}/entries`);
  }
  // ============================================
  // GOOGLE ANALYTICS (GA4)
  // ============================================
  async listAnalyticsAccounts() {
    const t = await this.token();
    return googleFetch(t, "https://analyticsadmin.googleapis.com/v1beta/accounts");
  }
  async listAnalyticsProperties(accountId) {
    const t = await this.token();
    return googleFetch(t, "https://analyticsadmin.googleapis.com/v1beta/properties", {
      params: { filter: `parent:accounts/${accountId}` }
    });
  }
  async runAnalyticsReport(propertyId, report2) {
    const t = await this.token();
    return googleFetch(t, `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
      method: "POST",
      body: report2
    });
  }
  async runAnalyticsRealtimeReport(propertyId, report2) {
    const t = await this.token();
    return googleFetch(t, `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runRealtimeReport`, {
      method: "POST",
      body: report2
    });
  }
  async getAnalyticsMetadata(propertyId) {
    const t = await this.token();
    return googleFetch(t, `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}/metadata`);
  }
  // ============================================
  // GOOGLE ADMIN SDK (Directory)
  // ============================================
  async listAdminUsers(options) {
    const t = await this.token();
    const params = { maxResults: String(options?.maxResults || 100) };
    if (options?.domain) params.domain = options.domain;
    if (options?.query) params.query = options.query;
    if (options?.orderBy) params.orderBy = options.orderBy;
    return googleFetch(t, "https://admin.googleapis.com/admin/directory/v1/users", { params });
  }
  async getAdminUser(userKey) {
    const t = await this.token();
    return googleFetch(t, `https://admin.googleapis.com/admin/directory/v1/users/${encodeURIComponent(userKey)}`);
  }
  async createAdminUser(user) {
    const t = await this.token();
    return googleFetch(t, "https://admin.googleapis.com/admin/directory/v1/users", {
      method: "POST",
      body: user
    });
  }
  async updateAdminUser(userKey, updates) {
    const t = await this.token();
    return googleFetch(t, `https://admin.googleapis.com/admin/directory/v1/users/${encodeURIComponent(userKey)}`, {
      method: "PUT",
      body: updates
    });
  }
  async suspendAdminUser(userKey, suspended) {
    const t = await this.token();
    return googleFetch(t, `https://admin.googleapis.com/admin/directory/v1/users/${encodeURIComponent(userKey)}`, {
      method: "PUT",
      body: { suspended }
    });
  }
  async listAdminGroups(options) {
    const t = await this.token();
    const params = { maxResults: String(options?.maxResults || 100) };
    if (options?.domain) params.domain = options.domain;
    if (options?.query) params.query = options.query;
    return googleFetch(t, "https://admin.googleapis.com/admin/directory/v1/groups", { params });
  }
  async getAdminGroup(groupKey) {
    const t = await this.token();
    return googleFetch(t, `https://admin.googleapis.com/admin/directory/v1/groups/${encodeURIComponent(groupKey)}`);
  }
  async createAdminGroup(group3) {
    const t = await this.token();
    return googleFetch(t, "https://admin.googleapis.com/admin/directory/v1/groups", {
      method: "POST",
      body: group3
    });
  }
  async listAdminGroupMembers(groupKey, maxResults = 100) {
    const t = await this.token();
    return googleFetch(t, `https://admin.googleapis.com/admin/directory/v1/groups/${encodeURIComponent(groupKey)}/members`, {
      params: { maxResults: String(maxResults) }
    });
  }
  async addAdminGroupMember(groupKey, email, role = "MEMBER") {
    const t = await this.token();
    return googleFetch(t, `https://admin.googleapis.com/admin/directory/v1/groups/${encodeURIComponent(groupKey)}/members`, {
      method: "POST",
      body: { email, role }
    });
  }
  async removeAdminGroupMember(groupKey, memberKey) {
    const t = await this.token();
    const resp = await fetch(`https://admin.googleapis.com/admin/directory/v1/groups/${encodeURIComponent(groupKey)}/members/${encodeURIComponent(memberKey)}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Remove member failed: ${resp.status}`);
    return { removed: true };
  }
  async listAdminOrgUnits() {
    const t = await this.token();
    return googleFetch(t, "https://admin.googleapis.com/admin/directory/v1/customer/my_customer/orgunits", {
      params: { type: "all" }
    });
  }
  async listAdminDomains() {
    const t = await this.token();
    return googleFetch(t, "https://admin.googleapis.com/admin/directory/v1/customer/my_customer/domains");
  }
  async listAdminRoles() {
    const t = await this.token();
    return googleFetch(t, "https://admin.googleapis.com/admin/directory/v1/customer/my_customer/roles");
  }
  async getAdminAuditActivities(applicationName, options) {
    const t = await this.token();
    const params = { maxResults: String(options?.maxResults || 100) };
    if (options?.userKey) params.userKey = options.userKey;
    if (options?.eventName) params.eventName = options.eventName;
    if (options?.startTime) params.startTime = options.startTime;
    if (options?.endTime) params.endTime = options.endTime;
    const userKey = options?.userKey || "all";
    return googleFetch(t, `https://admin.googleapis.com/admin/reports/v1/activity/users/${userKey}/applications/${applicationName}`, { params });
  }
  async getAdminUsageReport(date, parameters) {
    const t = await this.token();
    const params = {};
    if (parameters) params.parameters = parameters;
    return googleFetch(t, `https://admin.googleapis.com/admin/reports/v1/usage/dates/${date}`, { params });
  }
  // ============================================
  // GEMINI / GENERATIVE LANGUAGE / NotebookLM
  // ============================================
  async listGeminiModels() {
    const t = await this.token();
    return googleFetch(t, "https://generativelanguage.googleapis.com/v1beta/models");
  }
  async geminiGenerateContent(model, contents, options) {
    const t = await this.token();
    const body = { contents };
    if (options?.systemInstruction) {
      body.systemInstruction = { parts: [{ text: options.systemInstruction }] };
    }
    const generationConfig = {};
    if (options?.temperature !== void 0) generationConfig.temperature = options.temperature;
    if (options?.maxOutputTokens !== void 0) generationConfig.maxOutputTokens = options.maxOutputTokens;
    if (options?.topP !== void 0) generationConfig.topP = options.topP;
    if (options?.topK !== void 0) generationConfig.topK = options.topK;
    if (options?.candidateCount !== void 0) generationConfig.candidateCount = options.candidateCount;
    if (options?.responseMimeType) generationConfig.responseMimeType = options.responseMimeType;
    if (options?.responseSchema) generationConfig.responseSchema = options.responseSchema;
    if (options?.thinkingBudget !== void 0) generationConfig.thinkingConfig = { thinkingBudget: options.thinkingBudget };
    if (Object.keys(generationConfig).length > 0) body.generationConfig = generationConfig;
    const tools = options?.tools ? [...options.tools] : [];
    if (options?.codeExecution) tools.push({ codeExecution: {} });
    if (options?.googleSearchGrounding) tools.push({ googleSearch: {} });
    if (tools.length > 0) body.tools = tools;
    if (options?.toolConfig) body.toolConfig = options.toolConfig;
    return googleFetch(t, `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      body
    });
  }
  async geminiCountTokens(model, contents) {
    const t = await this.token();
    return googleFetch(t, `https://generativelanguage.googleapis.com/v1beta/models/${model}:countTokens`, {
      method: "POST",
      body: { contents }
    });
  }
  async geminiEmbedContent(model, content, taskType) {
    const t = await this.token();
    const body = { model: `models/${model}`, content };
    if (taskType) body.taskType = taskType;
    return googleFetch(t, `https://generativelanguage.googleapis.com/v1beta/models/${model}:embedContent`, {
      method: "POST",
      body
    });
  }
  async geminiBatchEmbedContents(model, requests) {
    const t = await this.token();
    return googleFetch(t, `https://generativelanguage.googleapis.com/v1beta/models/${model}:batchEmbedContents`, {
      method: "POST",
      body: { requests: requests.map((r) => ({ ...r, model: `models/${model}` })) }
    });
  }
  async listGeminiTunedModels() {
    const t = await this.token();
    return googleFetch(t, "https://generativelanguage.googleapis.com/v1beta/tunedModels");
  }
  async getGeminiTunedModel(tunedModelName) {
    const t = await this.token();
    return googleFetch(t, `https://generativelanguage.googleapis.com/v1beta/${tunedModelName}`);
  }
  async createGeminiTuningJob(displayName, baseModel, trainingData, hyperparameters) {
    const t = await this.token();
    const body = { displayName, baseModel, tuningTask: { trainingData } };
    if (hyperparameters) body.tuningTask.hyperparameters = hyperparameters;
    return googleFetch(t, "https://generativelanguage.googleapis.com/v1beta/tunedModels", {
      method: "POST",
      body
    });
  }
  // NotebookLM corpus/notebook operations via Generative Language Retriever API
  async listNotebookCorpora() {
    const t = await this.token();
    return googleFetch(t, "https://generativelanguage.googleapis.com/v1beta/corpora");
  }
  async createNotebookCorpus(displayName) {
    const t = await this.token();
    return googleFetch(t, "https://generativelanguage.googleapis.com/v1beta/corpora", {
      method: "POST",
      body: { displayName }
    });
  }
  async getNotebookCorpus(corpusName) {
    const t = await this.token();
    return googleFetch(t, `https://generativelanguage.googleapis.com/v1beta/${corpusName}`);
  }
  async deleteNotebookCorpus(corpusName, force = false) {
    const t = await this.token();
    const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/${corpusName}?force=${force}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Delete corpus failed: ${resp.status}`);
    return { deleted: true };
  }
  async listNotebookDocuments(corpusName) {
    const t = await this.token();
    return googleFetch(t, `https://generativelanguage.googleapis.com/v1beta/${corpusName}/documents`);
  }
  async createNotebookDocument(corpusName, displayName) {
    const t = await this.token();
    return googleFetch(t, `https://generativelanguage.googleapis.com/v1beta/${corpusName}/documents`, {
      method: "POST",
      body: { displayName }
    });
  }
  async addNotebookChunk(documentName, data) {
    const t = await this.token();
    return googleFetch(t, `https://generativelanguage.googleapis.com/v1beta/${documentName}/chunks`, {
      method: "POST",
      body: { data: { stringValue: data } }
    });
  }
  async queryNotebookCorpus(corpusName, query, resultsCount = 10) {
    const t = await this.token();
    return googleFetch(t, `https://generativelanguage.googleapis.com/v1beta/${corpusName}:query`, {
      method: "POST",
      body: { query, resultsCount }
    });
  }
  async generateNotebookAnswer(corpusName, query, model = "models/aqa") {
    const t = await this.token();
    return googleFetch(t, `https://generativelanguage.googleapis.com/v1beta/${model}:generateAnswer`, {
      method: "POST",
      body: {
        contents: [{ parts: [{ text: query }], role: "user" }],
        semanticRetriever: { source: corpusName, query: { parts: [{ text: query }] } },
        answerStyle: "ABSTRACTIVE"
      }
    });
  }
  // ============================================
  // BLOGGER
  // ============================================
  async listBloggerBlogs() {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/blogger/v3/users/self/blogs");
  }
  async getBloggerBlog(blogId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/blogger/v3/blogs/${blogId}`);
  }
  async listBloggerPosts(blogId, options) {
    const t = await this.token();
    const params = { maxResults: String(options?.maxResults || 20) };
    if (options?.status) params.status = options.status;
    if (options?.labels) params.labels = options.labels;
    return googleFetch(t, `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`, { params });
  }
  async getBloggerPost(blogId, postId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}`);
  }
  async createBloggerPost(blogId, post) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`, {
      method: "POST",
      params: { isDraft: String(post.isDraft || false) },
      body: { title: post.title, content: post.content, labels: post.labels }
    });
  }
  async updateBloggerPost(blogId, postId, updates) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}`, {
      method: "PATCH",
      body: updates
    });
  }
  async deleteBloggerPost(blogId, postId) {
    const t = await this.token();
    const resp = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Delete post failed: ${resp.status}`);
    return { deleted: true };
  }
  async listBloggerComments(blogId, postId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}/comments`);
  }
  // ============================================
  // GOOGLE SEARCH CONSOLE
  // ============================================
  async listSearchConsoleSites() {
    const t = await this.token();
    return googleFetch(t, "https://searchconsole.googleapis.com/webmasters/v3/sites");
  }
  async getSearchConsolePerformance(siteUrl, options) {
    const t = await this.token();
    const body = {
      startDate: options.startDate,
      endDate: options.endDate,
      rowLimit: options.rowLimit || 1e3
    };
    if (options.dimensions) body.dimensions = options.dimensions;
    if (options.dimensionFilterGroups) body.dimensionFilterGroups = options.dimensionFilterGroups;
    return googleFetch(t, `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
      method: "POST",
      body
    });
  }
  async submitSearchConsoleUrl(siteUrl, url) {
    const t = await this.token();
    return googleFetch(t, `https://searchconsole.googleapis.com/v1/urlInspection/index:inspect`, {
      method: "POST",
      body: { inspectionUrl: url, siteUrl }
    });
  }
  async listSearchConsoleSitemaps(siteUrl) {
    const t = await this.token();
    return googleFetch(t, `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps`);
  }
  async submitSearchConsoleSitemap(siteUrl, sitemapUrl) {
    const t = await this.token();
    return googleFetch(t, `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`, {
      method: "PUT"
    });
  }
  // ============================================
  // GOOGLE TAG MANAGER
  // ============================================
  async listTagManagerAccounts() {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/tagmanager/v2/accounts");
  }
  async listTagManagerContainers(accountId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/tagmanager/v2/accounts/${accountId}/containers`);
  }
  async listTagManagerTags(containerPath, workspaceId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/tagmanager/v2/${containerPath}/workspaces/${workspaceId}/tags`);
  }
  async listTagManagerVariables(containerPath, workspaceId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/tagmanager/v2/${containerPath}/workspaces/${workspaceId}/variables`);
  }
  async listTagManagerTriggers(containerPath, workspaceId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/tagmanager/v2/${containerPath}/workspaces/${workspaceId}/triggers`);
  }
  // ============================================
  // GOOGLE CLOUD TRANSLATION
  // ============================================
  async translateText(text, targetLanguage, sourceLanguage) {
    const t = await this.token();
    const contents = Array.isArray(text) ? text : [text];
    return googleFetch(t, "https://translation.googleapis.com/v3/projects/-/locations/global:translateText", {
      method: "POST",
      body: {
        contents,
        targetLanguageCode: targetLanguage,
        ...sourceLanguage ? { sourceLanguageCode: sourceLanguage } : {}
      }
    });
  }
  async detectLanguage(content) {
    const t = await this.token();
    return googleFetch(t, "https://translation.googleapis.com/v3/projects/-/locations/global:detectLanguage", {
      method: "POST",
      body: { content }
    });
  }
  async listSupportedLanguages(displayLanguageCode = "en") {
    const t = await this.token();
    return googleFetch(t, "https://translation.googleapis.com/v3/projects/-/locations/global/supportedLanguages", {
      params: { displayLanguageCode }
    });
  }
  // ============================================
  // GOOGLE CLOUD VISION
  // ============================================
  async annotateImage(imageUri, features2) {
    const t = await this.token();
    return googleFetch(t, "https://vision.googleapis.com/v1/images:annotate", {
      method: "POST",
      body: {
        requests: [{ image: { source: { imageUri } }, features: features2 }]
      }
    });
  }
  async annotateImageBase64(base64Image, features2) {
    const t = await this.token();
    return googleFetch(t, "https://vision.googleapis.com/v1/images:annotate", {
      method: "POST",
      body: {
        requests: [{ image: { content: base64Image }, features: features2 }]
      }
    });
  }
  async detectTextInImage(imageUri) {
    return this.annotateImage(imageUri, [
      { type: "TEXT_DETECTION" },
      { type: "DOCUMENT_TEXT_DETECTION" }
    ]);
  }
  // ============================================
  // GOOGLE BIGQUERY
  // ============================================
  async listBigQueryDatasets(projectId) {
    const t = await this.token();
    return googleFetch(t, `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/datasets`);
  }
  async listBigQueryTables(projectId, datasetId) {
    const t = await this.token();
    return googleFetch(t, `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/datasets/${datasetId}/tables`);
  }
  async runBigQueryQuery(projectId, query, options) {
    const t = await this.token();
    return googleFetch(t, `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/queries`, {
      method: "POST",
      body: {
        query,
        useLegacySql: options?.useLegacySql || false,
        maxResults: options?.maxResults || 1e3,
        dryRun: options?.dryRun || false
      }
    });
  }
  async getBigQueryTable(projectId, datasetId, tableId) {
    const t = await this.token();
    return googleFetch(t, `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/datasets/${datasetId}/tables/${tableId}`);
  }
  // ============================================
  // GOOGLE PUB/SUB
  // ============================================
  async listPubSubTopics(projectId) {
    const t = await this.token();
    return googleFetch(t, `https://pubsub.googleapis.com/v1/projects/${projectId}/topics`);
  }
  async createPubSubTopic(projectId, topicId) {
    const t = await this.token();
    return googleFetch(t, `https://pubsub.googleapis.com/v1/projects/${projectId}/topics/${topicId}`, {
      method: "PUT",
      body: {}
    });
  }
  async publishPubSubMessage(topic, data, attributes) {
    const t = await this.token();
    const encoded = btoa(unescape(encodeURIComponent(data)));
    const message = { data: encoded };
    if (attributes) message.attributes = attributes;
    return googleFetch(t, `https://pubsub.googleapis.com/v1/${topic}:publish`, {
      method: "POST",
      body: { messages: [message] }
    });
  }
  async listPubSubSubscriptions(projectId) {
    const t = await this.token();
    return googleFetch(t, `https://pubsub.googleapis.com/v1/projects/${projectId}/subscriptions`);
  }
  async pullPubSubMessages(subscription, maxMessages = 10) {
    const t = await this.token();
    return googleFetch(t, `https://pubsub.googleapis.com/v1/${subscription}:pull`, {
      method: "POST",
      body: { maxMessages }
    });
  }
  // ============================================
  // GOOGLE FIREBASE
  // ============================================
  async listFirebaseProjects() {
    const t = await this.token();
    return googleFetch(t, "https://firebase.googleapis.com/v1beta1/projects");
  }
  async getFirebaseProject(projectId) {
    const t = await this.token();
    return googleFetch(t, `https://firebase.googleapis.com/v1beta1/projects/${projectId}`);
  }
  async listFirebaseWebApps(projectId) {
    const t = await this.token();
    return googleFetch(t, `https://firebase.googleapis.com/v1beta1/projects/${projectId}/webApps`);
  }
  // ============================================
  // GOOGLE CLOUD STORAGE
  // ============================================
  async listCloudStorageBuckets(projectId) {
    const t = await this.token();
    return googleFetch(t, "https://storage.googleapis.com/storage/v1/b", {
      params: { project: projectId }
    });
  }
  async listCloudStorageObjects(bucket, prefix, maxResults = 100) {
    const t = await this.token();
    const params = { maxResults: String(maxResults) };
    if (prefix) params.prefix = prefix;
    return googleFetch(t, `https://storage.googleapis.com/storage/v1/b/${bucket}/o`, { params });
  }
  async getCloudStorageObject(bucket, object) {
    const t = await this.token();
    return googleFetch(t, `https://storage.googleapis.com/storage/v1/b/${bucket}/o/${encodeURIComponent(object)}`);
  }
  async uploadCloudStorageObject(bucket, name, data, contentType = "text/plain") {
    const t = await this.token();
    return googleFetch(t, `https://storage.googleapis.com/upload/storage/v1/b/${bucket}/o`, {
      method: "POST",
      params: { uploadType: "media", name },
      headers: { "Content-Type": contentType },
      body: data
    });
  }
  async deleteCloudStorageObject(bucket, object) {
    const t = await this.token();
    const resp = await fetch(`https://storage.googleapis.com/storage/v1/b/${bucket}/o/${encodeURIComponent(object)}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Delete object failed: ${resp.status}`);
    return { deleted: true };
  }
  // ============================================
  // GEMINI FILE API (upload files for multimodal)
  // ============================================
  async geminiUploadFile(displayName, mimeType, data) {
    const t = await this.token();
    const initResp = await fetch("https://generativelanguage.googleapis.com/upload/v1beta/files?uploadType=resumable", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${t}`,
        "Content-Type": "application/json",
        "X-Goog-Upload-Protocol": "resumable",
        "X-Goog-Upload-Command": "start",
        "X-Goog-Upload-Header-Content-Type": mimeType
      },
      body: JSON.stringify({ file: { displayName } })
    });
    const uploadUrl = initResp.headers.get("x-goog-upload-url");
    if (!uploadUrl) throw new Error("Failed to get upload URL");
    const uploadResp = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": mimeType,
        "X-Goog-Upload-Command": "upload, finalize",
        "X-Goog-Upload-Offset": "0"
      },
      body: data
    });
    if (!uploadResp.ok) throw new Error(`File upload failed: ${uploadResp.status}`);
    return uploadResp.json();
  }
  async geminiListFiles() {
    const t = await this.token();
    return googleFetch(t, "https://generativelanguage.googleapis.com/v1beta/files");
  }
  async geminiGetFile(fileName) {
    const t = await this.token();
    return googleFetch(t, `https://generativelanguage.googleapis.com/v1beta/${fileName}`);
  }
  async geminiDeleteFile(fileName) {
    const t = await this.token();
    const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/${fileName}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Delete file failed: ${resp.status}`);
    return { deleted: true };
  }
  // ============================================
  // NOTEBOOKLM ENTERPRISE (Discovery Engine)
  // ============================================
  async listNotebooks(projectId, location = "global") {
    const t = await this.token();
    return googleFetch(t, `https://discoveryengine.googleapis.com/v1/projects/${projectId}/locations/${location}/collections/default_collection/engines/-/sessions`);
  }
  async createNotebook(projectId, displayName, location = "global") {
    const t = await this.token();
    return googleFetch(t, `https://discoveryengine.googleapis.com/v1/projects/${projectId}/locations/${location}/collections/default_collection/engines`, {
      method: "POST",
      body: {
        displayName,
        solutionType: "SOLUTION_TYPE_CHAT",
        chatEngineConfig: { dialogflowAgentToLink: "" }
      }
    });
  }
  async getNotebook(notebookName) {
    const t = await this.token();
    return googleFetch(t, `https://discoveryengine.googleapis.com/v1/${notebookName}`);
  }
  async deleteNotebook(notebookName) {
    const t = await this.token();
    const resp = await fetch(`https://discoveryengine.googleapis.com/v1/${notebookName}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Delete notebook failed: ${resp.status}`);
    return { deleted: true };
  }
  async addNotebookSources(notebookName, sources) {
    const t = await this.token();
    const documents = sources.map((s) => {
      if (s.type === "drive") return { content: { uri: `https://drive.google.com/open?id=${s.driveFileId}` } };
      if (s.type === "url") return { content: { uri: s.url } };
      return { content: { rawBytes: btoa(unescape(encodeURIComponent(s.text || ""))) }, structData: { title: s.title || "Text Source" } };
    });
    return googleFetch(t, `https://discoveryengine.googleapis.com/v1/${notebookName}/documents:import`, {
      method: "POST",
      body: { inlineSource: { documents } }
    });
  }
  async generateNotebookAudioOverview(notebookName, options) {
    const t = await this.token();
    const body = {};
    if (options?.language) body.languageCode = options.language;
    if (options?.instructions) body.instructions = options.instructions;
    return googleFetch(t, `https://discoveryengine.googleapis.com/v1/${notebookName}:generateAudioOverview`, {
      method: "POST",
      body
    });
  }
  async generatePodcast(projectId, contents, options, location = "global") {
    const t = await this.token();
    const body = {
      contents: contents.map((c) => c.uri ? { uri: c.uri } : { rawBytes: btoa(unescape(encodeURIComponent(c.text || ""))) })
    };
    if (options?.language) body.languageCode = options.language;
    if (options?.instructions) body.instructions = options.instructions;
    return googleFetch(t, `https://discoveryengine.googleapis.com/v1/projects/${projectId}/locations/${location}:generatePodcast`, {
      method: "POST",
      body
    });
  }
  // ============================================
  // CLOUD SPEECH-TO-TEXT
  // ============================================
  async speechRecognize(audioUri, options) {
    const t = await this.token();
    const config2 = {
      languageCode: options?.languageCode || "en-US",
      enableAutomaticPunctuation: options?.enableAutomaticPunctuation !== false
    };
    if (options?.encoding) config2.encoding = options.encoding;
    if (options?.sampleRateHertz) config2.sampleRateHertz = options.sampleRateHertz;
    if (options?.model) config2.model = options.model;
    if (options?.enableWordTimeOffsets) config2.enableWordTimeOffsets = true;
    if (options?.diarizationConfig) config2.diarizationConfig = options.diarizationConfig;
    return googleFetch(t, "https://speech.googleapis.com/v1/speech:recognize", {
      method: "POST",
      body: { config: config2, audio: { uri: audioUri } }
    });
  }
  async speechRecognizeBase64(audioContent, options) {
    const t = await this.token();
    const config2 = {
      languageCode: options?.languageCode || "en-US",
      enableAutomaticPunctuation: options?.enableAutomaticPunctuation !== false
    };
    if (options?.encoding) config2.encoding = options.encoding;
    if (options?.sampleRateHertz) config2.sampleRateHertz = options.sampleRateHertz;
    if (options?.model) config2.model = options.model;
    return googleFetch(t, "https://speech.googleapis.com/v1/speech:recognize", {
      method: "POST",
      body: { config: config2, audio: { content: audioContent } }
    });
  }
  async speechLongRunningRecognize(audioUri, options) {
    const t = await this.token();
    const config2 = {
      languageCode: options?.languageCode || "en-US",
      enableAutomaticPunctuation: options?.enableAutomaticPunctuation !== false
    };
    if (options?.encoding) config2.encoding = options.encoding;
    if (options?.sampleRateHertz) config2.sampleRateHertz = options.sampleRateHertz;
    if (options?.model) config2.model = options.model;
    if (options?.enableSpeakerDiarization) {
      config2.diarizationConfig = {
        enableSpeakerDiarization: true,
        minSpeakerCount: options.minSpeakerCount || 2,
        maxSpeakerCount: options.maxSpeakerCount || 6
      };
    }
    return googleFetch(t, "https://speech.googleapis.com/v1/speech:longrunningrecognize", {
      method: "POST",
      body: { config: config2, audio: { uri: audioUri } }
    });
  }
  // ============================================
  // CLOUD TEXT-TO-SPEECH
  // ============================================
  async textToSpeech(text, options) {
    const t = await this.token();
    return googleFetch(t, "https://texttospeech.googleapis.com/v1/text:synthesize", {
      method: "POST",
      body: {
        input: { text },
        voice: {
          languageCode: options?.languageCode || "en-US",
          name: options?.voiceName,
          ssmlGender: options?.ssmlGender || "NEUTRAL"
        },
        audioConfig: {
          audioEncoding: options?.audioEncoding || "MP3",
          speakingRate: options?.speakingRate,
          pitch: options?.pitch,
          volumeGainDb: options?.volumeGainDb,
          effectsProfileId: options?.effectsProfileId
        }
      }
    });
  }
  async textToSpeechSsml(ssml, options) {
    const t = await this.token();
    return googleFetch(t, "https://texttospeech.googleapis.com/v1/text:synthesize", {
      method: "POST",
      body: {
        input: { ssml },
        voice: { languageCode: options?.languageCode || "en-US", name: options?.voiceName, ssmlGender: options?.ssmlGender || "NEUTRAL" },
        audioConfig: { audioEncoding: options?.audioEncoding || "MP3", speakingRate: options?.speakingRate, pitch: options?.pitch }
      }
    });
  }
  async listTextToSpeechVoices(languageCode) {
    const t = await this.token();
    const params = {};
    if (languageCode) params.languageCode = languageCode;
    return googleFetch(t, "https://texttospeech.googleapis.com/v1/voices", { params });
  }
  // ============================================
  // CLOUD NATURAL LANGUAGE
  // ============================================
  async analyzeEntities(text, type = "PLAIN_TEXT", language) {
    const t = await this.token();
    return googleFetch(t, "https://language.googleapis.com/v1/documents:analyzeEntities", {
      method: "POST",
      body: { document: { type, content: text, language } }
    });
  }
  async analyzeSentiment(text, type = "PLAIN_TEXT", language) {
    const t = await this.token();
    return googleFetch(t, "https://language.googleapis.com/v1/documents:analyzeSentiment", {
      method: "POST",
      body: { document: { type, content: text, language } }
    });
  }
  async analyzeEntitySentiment(text, type = "PLAIN_TEXT", language) {
    const t = await this.token();
    return googleFetch(t, "https://language.googleapis.com/v1/documents:analyzeEntitySentiment", {
      method: "POST",
      body: { document: { type, content: text, language } }
    });
  }
  async classifyText(text, type = "PLAIN_TEXT") {
    const t = await this.token();
    return googleFetch(t, "https://language.googleapis.com/v1/documents:classifyText", {
      method: "POST",
      body: { document: { type, content: text } }
    });
  }
  async analyzeSyntax(text, type = "PLAIN_TEXT", language) {
    const t = await this.token();
    return googleFetch(t, "https://language.googleapis.com/v1/documents:analyzeSyntax", {
      method: "POST",
      body: { document: { type, content: text, language } }
    });
  }
  async annotateText(text, features2, type = "PLAIN_TEXT") {
    const t = await this.token();
    return googleFetch(t, "https://language.googleapis.com/v1/documents:annotateText", {
      method: "POST",
      body: { document: { type, content: text }, features: features2 }
    });
  }
  // ============================================
  // GOOGLE WORKSPACE EVENTS (Push Notifications)
  // ============================================
  async createWorkspaceSubscription(targetResource, eventTypes, notificationEndpoint, payloadOptions) {
    const t = await this.token();
    return googleFetch(t, "https://workspaceevents.googleapis.com/v1/subscriptions", {
      method: "POST",
      body: {
        targetResource,
        eventTypes,
        notificationEndpoint: { pubsubTopic: notificationEndpoint },
        payloadOptions: payloadOptions || { includeResource: true }
      }
    });
  }
  async getWorkspaceSubscription(subscriptionName) {
    const t = await this.token();
    return googleFetch(t, `https://workspaceevents.googleapis.com/v1/${subscriptionName}`);
  }
  async listWorkspaceSubscriptions(filter) {
    const t = await this.token();
    const params = {};
    if (filter) params.filter = filter;
    return googleFetch(t, "https://workspaceevents.googleapis.com/v1/subscriptions", { params });
  }
  async deleteWorkspaceSubscription(subscriptionName) {
    const t = await this.token();
    const resp = await fetch(`https://workspaceevents.googleapis.com/v1/${subscriptionName}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Delete subscription failed: ${resp.status}`);
    return { deleted: true };
  }
  async reactivateWorkspaceSubscription(subscriptionName) {
    const t = await this.token();
    return googleFetch(t, `https://workspaceevents.googleapis.com/v1/${subscriptionName}:reactivate`, {
      method: "POST",
      body: {}
    });
  }
  // ============================================
  // GOOGLE MAPS PLATFORM
  // ============================================
  async geocodeAddress(address) {
    const t = await this.token();
    return googleFetch(t, "https://maps.googleapis.com/maps/api/geocode/json", {
      params: { address }
    });
  }
  async reverseGeocode(lat, lng) {
    const t = await this.token();
    return googleFetch(t, "https://maps.googleapis.com/maps/api/geocode/json", {
      params: { latlng: `${lat},${lng}` }
    });
  }
  async searchPlaces(query, options) {
    const t = await this.token();
    const params = { query };
    if (options?.location) params.location = options.location;
    if (options?.radius) params.radius = String(options.radius);
    if (options?.type) params.type = options.type;
    if (options?.language) params.language = options.language;
    return googleFetch(t, "https://maps.googleapis.com/maps/api/place/textsearch/json", { params });
  }
  async getPlaceDetails(placeId, fields) {
    const t = await this.token();
    return googleFetch(t, "https://maps.googleapis.com/maps/api/place/details/json", {
      params: { place_id: placeId, fields: fields || "name,formatted_address,geometry,rating,website,formatted_phone_number,opening_hours,reviews,types" }
    });
  }
  async getDirections(origin, destination, options) {
    const t = await this.token();
    const params = { origin, destination, mode: options?.mode || "driving" };
    if (options?.alternatives) params.alternatives = "true";
    if (options?.avoid) params.avoid = options.avoid;
    if (options?.waypoints) params.waypoints = options.waypoints;
    if (options?.departure_time) params.departure_time = options.departure_time;
    return googleFetch(t, "https://maps.googleapis.com/maps/api/directions/json", { params });
  }
  async getDistanceMatrix(origins, destinations, options) {
    const t = await this.token();
    const params = { origins, destinations, mode: options?.mode || "driving" };
    if (options?.avoid) params.avoid = options.avoid;
    if (options?.departure_time) params.departure_time = options.departure_time;
    return googleFetch(t, "https://maps.googleapis.com/maps/api/distancematrix/json", { params });
  }
  // ============================================
  // LONG-RUNNING OPERATIONS (shared helper)
  // ============================================
  async getOperation(operationName) {
    const t = await this.token();
    return googleFetch(t, `https://discoveryengine.googleapis.com/v1/${operationName}`);
  }
  async getGenaiOperation(operationName) {
    const t = await this.token();
    return googleFetch(t, `https://generativelanguage.googleapis.com/v1beta/${operationName}`);
  }
  // ============================================
  // GMAIL HISTORY (incremental mailbox sync)
  // ============================================
  async getGmailHistory(startHistoryId, options) {
    const t = await this.token();
    const params = { startHistoryId };
    if (options?.labelId) params.labelId = options.labelId;
    if (options?.historyTypes) params.historyTypes = options.historyTypes.join(",");
    if (options?.maxResults) params.maxResults = String(options.maxResults);
    return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/history", { params });
  }
  async getGmailProfile() {
    const t = await this.token();
    return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/profile");
  }
  // ============================================
  // DRIVE REVISIONS (version history)
  // ============================================
  async getDriveRevisions(fileId, pageSize) {
    const t = await this.token();
    const params = {
      fields: "revisions(id,modifiedTime,lastModifyingUser,size,mimeType,originalFilename),nextPageToken"
    };
    if (pageSize) params.pageSize = String(pageSize);
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/revisions`, { params });
  }
  async getDriveRevision(fileId, revisionId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/revisions/${revisionId}`, {
      params: { fields: "*" }
    });
  }
  // ============================================
  // DRIVE ACTIVITY (audit trail)
  // ============================================
  async queryDriveActivity(options) {
    const t = await this.token();
    const body = {};
    if (options.itemName) body.itemName = options.itemName;
    if (options.ancestorName) body.ancestorName = options.ancestorName;
    if (options.filter) body.filter = options.filter;
    if (options.pageSize) body.pageSize = options.pageSize;
    if (options.pageToken) body.pageToken = options.pageToken;
    return googleFetch(t, "https://driveactivity.googleapis.com/v2/activity:query", {
      method: "POST",
      body
    });
  }
  // ============================================
  // DRIVE SHORTCUTS (cross-case file linking)
  // ============================================
  async createDriveShortcut(targetFileId, name, folderId) {
    const t = await this.token();
    const metadata = {
      name,
      mimeType: "application/vnd.google-apps.shortcut",
      shortcutDetails: { targetId: targetFileId }
    };
    if (folderId) metadata.parents = [folderId];
    return googleFetch(t, "https://www.googleapis.com/drive/v3/files", {
      method: "POST",
      body: metadata
    });
  }
  // ============================================
  // TEMPLATE DOCUMENT GENERATION
  // ============================================
  async generateFromTemplate(templateId, variables, options) {
    const copy = await this.copyDriveFile(templateId, options?.name || "Generated from template", options?.folderId);
    const newDocId = copy.id;
    for (const [key, value] of Object.entries(variables)) {
      await this.findAndReplaceDoc(newDocId, `{{${key}}}`, value, false);
    }
    let pdfId = null;
    if (options?.exportPdf) {
      const pdf = await this.exportDocToPdf(newDocId, options?.folderId);
      pdfId = pdf?.id || pdf?.fileId;
    }
    return {
      documentId: newDocId,
      documentUrl: `https://docs.google.com/document/d/${newDocId}/edit`,
      pdfId,
      variablesReplaced: Object.keys(variables).length
    };
  }
  // ============================================
  // GEMINI AI (legal document analysis)
  // ============================================
  async geminiGenerate(prompt, options) {
    const model = options?.model || "gemini-2.5-flash";
    const contents = [{ role: "user", parts: [{ text: prompt }] }];
    try {
      const result = await this.geminiGenerateContent(model, contents, {
        systemInstruction: options?.systemInstruction,
        temperature: options?.temperature,
        maxOutputTokens: options?.maxTokens,
        googleSearchGrounding: options?.groundingWithSearch
      });
      const candidate = result.candidates?.[0];
      return {
        text: candidate?.content?.parts?.map((p) => p.text).join("") || "",
        groundingMetadata: candidate?.groundingMetadata,
        usageMetadata: result.usageMetadata,
        model
      };
    } catch (oauthErr) {
      const apiKey = this.env.GEMINI_API_KEY;
      if (!apiKey) throw oauthErr;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const body = { contents, generationConfig: {} };
      if (options?.systemInstruction) body.systemInstruction = { parts: [{ text: options.systemInstruction }] };
      if (options?.temperature !== void 0) body.generationConfig.temperature = options.temperature;
      if (options?.maxTokens) body.generationConfig.maxOutputTokens = options.maxTokens;
      if (options?.groundingWithSearch) body.tools = [{ googleSearch: {} }];
      const resp = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!resp.ok) throw new Error(`Gemini API error ${resp.status}: ${await resp.text()}`);
      const data = await resp.json();
      const candidate = data.candidates?.[0];
      return {
        text: candidate?.content?.parts?.map((p) => p.text).join("") || "",
        groundingMetadata: candidate?.groundingMetadata,
        usageMetadata: data.usageMetadata,
        model
      };
    }
  }
  static {
    this.LEGAL_ANALYSIS_PROMPTS = {
      summarize: "You are a legal document analyst. Provide a comprehensive summary of the following document, highlighting key legal issues, parties involved, dates, obligations, and outcomes.",
      extract_entities: "You are a legal entity extractor. Extract all named entities from the following document. Return JSON with categories: parties (plaintiffs, defendants, witnesses, attorneys), dates (filing, deadlines, incidents), monetary_amounts, case_numbers, court_names, statutes_cited, and legal_concepts.",
      classify: "You are a legal document classifier. Classify the following document. Return JSON with: document_type (pleading, motion, order, contract, correspondence, discovery_request, discovery_response, deposition, exhibit, brief, memorandum, declaration, affidavit, subpoena, notice, settlement, judgment, appeal), confidence, sub_type, and brief_description.",
      extract_deadlines: "You are a legal deadline extractor. Extract all deadlines, due dates, statutes of limitations, and time-sensitive obligations. Return JSON array with: deadline_date, description, type (filing, response, compliance, statute_of_limitations), is_court_ordered, and urgency (critical, high, medium, low).",
      privilege_review: "You are a legal privilege reviewer. Analyze the document for attorney-client privilege, work product doctrine, or other privileges. Return JSON with: privilege_type (attorney_client, work_product, joint_defense, none), confidence, basis, key_indicators, and recommendation (privileged, not_privileged, needs_review).",
      risk_analysis: "You are a legal risk analyst. Analyze the document for legal risks, potential liabilities, compliance issues, and strategic concerns. Return JSON with: risk_level (critical, high, medium, low), risks array (each with description, category, likelihood, impact), and recommended_actions.",
      contract_review: "You are a contract analyst. Analyze this contract/agreement. Extract: parties, effective_date, termination_date, key_terms, obligations (per party), payment_terms, governing_law, dispute_resolution, representations_warranties, indemnification_clauses, non_compete_clauses, confidentiality_provisions, and potential_issues.",
      timeline: "You are a legal timeline creator. Extract all events, dates, and actions and organize them chronologically. Return JSON array with: date, event_description, actors_involved, significance, and source_reference.",
      case_strategy: "You are a litigation strategist. Analyze the document for strengths, weaknesses, and strategic implications. Identify key arguments, potential counterarguments, evidentiary gaps, and recommended next steps. Return structured JSON.",
      compare: "You are a legal document comparator. Compare the provided documents and identify: differences, additions, deletions, material changes, and their legal significance. Highlight any changes that affect rights, obligations, or deadlines."
    };
  }
  async geminiAnalyzeDocument(content, analysisType, options) {
    const systemInstruction = options?.customPrompt || _GoogleWorkspaceClient.LEGAL_ANALYSIS_PROMPTS[analysisType] || _GoogleWorkspaceClient.LEGAL_ANALYSIS_PROMPTS["summarize"];
    return this.geminiGenerate(content, {
      model: options?.model,
      systemInstruction,
      temperature: 0.1
    });
  }
  async geminiResearch(query, options) {
    const systemInstruction = "You are a legal research assistant. Provide thorough, well-sourced analysis. Cite specific statutes, case law, and regulations when possible. Clearly distinguish between established law and your analysis." + (options?.legalContext ? `

Case context: ${options.legalContext}` : "");
    return this.geminiGenerate(query, {
      model: options?.model,
      systemInstruction,
      temperature: 0.2,
      groundingWithSearch: true
    });
  }
  // ============================================
  // GOOGLE CLOUD NATURAL LANGUAGE API
  // ============================================
  async nlpRequest(endpoint, text, extraBody) {
    const apiKey = this.env.GOOGLE_CLOUD_API_KEY;
    if (!apiKey) throw new Error("GOOGLE_CLOUD_API_KEY not configured. Add it as a secret in wrangler.");
    const resp = await fetch(`https://language.googleapis.com/v1/documents:${endpoint}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        document: { type: "PLAIN_TEXT", content: text },
        encodingType: "UTF8",
        ...extraBody
      })
    });
    if (!resp.ok) throw new Error(`NLP API error ${resp.status}: ${await resp.text()}`);
    return resp.json();
  }
  async analyzeNlpSentiment(text) {
    return this.nlpRequest("analyzeSentiment", text);
  }
  async analyzeNlpEntities(text) {
    return this.nlpRequest("analyzeEntities", text);
  }
  async classifyNlpText(text) {
    return this.nlpRequest("classifyText", text);
  }
  async analyzeNlpEntitySentiment(text) {
    return this.nlpRequest("analyzeEntitySentiment", text);
  }
  // ============================================
  // GOOGLE DOCUMENT AI (OCR, form parsing, entity extraction)
  // ============================================
  async processDocumentAi(content, mimeType, options) {
    const apiKey = this.env.GOOGLE_CLOUD_API_KEY;
    const projectId = options?.projectId || this.env.GOOGLE_CLOUD_PROJECT_ID;
    const location = options?.location || "us";
    const processorId = options?.processorId || this.env.GOOGLE_DOCUMENT_AI_PROCESSOR;
    if (!apiKey) throw new Error("GOOGLE_CLOUD_API_KEY not configured");
    if (!projectId) throw new Error("GOOGLE_CLOUD_PROJECT_ID not configured");
    if (!processorId) throw new Error("GOOGLE_DOCUMENT_AI_PROCESSOR not configured. Create a processor at https://console.cloud.google.com/ai/document-ai");
    const url = `https://${location}-documentai.googleapis.com/v1/projects/${projectId}/locations/${location}/processors/${processorId}:process?key=${apiKey}`;
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rawDocument: { content, mimeType }
      })
    });
    if (!resp.ok) throw new Error(`Document AI error ${resp.status}: ${await resp.text()}`);
    return resp.json();
  }
  // ============================================
  // DRIVE AUTOMATION (organize, extract text, folders)
  // ============================================
  /** Create a folder in Google Drive */
  async createDriveFolder(name, parentId) {
    const t = await this.token();
    const metadata = {
      name,
      mimeType: "application/vnd.google-apps.folder"
    };
    if (parentId) metadata.parents = [parentId];
    return googleFetch(t, "https://www.googleapis.com/drive/v3/files", {
      method: "POST",
      body: metadata,
      params: { fields: "id,name,mimeType,webViewLink" }
    });
  }
  /** Move a file to a different folder */
  async moveDriveFile(fileId, targetFolderId, removeFromCurrent = true) {
    const t = await this.token();
    let removeParents = "";
    if (removeFromCurrent) {
      const file = await googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}`, {
        params: { fields: "parents" }
      });
      removeParents = (file.parents || []).join(",");
    }
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: "PATCH",
      params: {
        addParents: targetFolderId,
        ...removeParents ? { removeParents } : {},
        fields: "id,name,parents,webViewLink"
      },
      body: {}
    });
  }
  /** Batch move multiple files to target folders */
  async batchMoveDriveFiles(moves) {
    const results = [];
    for (const move of moves) {
      try {
        const r = await this.moveDriveFile(move.fileId, move.targetFolderId);
        results.push({ fileId: move.fileId, success: true, result: r });
      } catch (error3) {
        results.push({ fileId: move.fileId, success: false, error: error3.message });
      }
    }
    return results;
  }
  /** Extract text from a Google Drive file (handles Docs, Sheets, Slides, PDFs via conversion) */
  async extractTextFromDriveFile(fileId) {
    const t = await this.token();
    const meta = await googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}`, {
      params: { fields: "id,name,mimeType,size" }
    });
    const mimeType = meta.mimeType;
    let text = "";
    let method = "";
    if (mimeType === "application/vnd.google-apps.document") {
      text = await googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/export`, {
        params: { mimeType: "text/plain" }
      });
      method = "docs_export";
    } else if (mimeType === "application/vnd.google-apps.spreadsheet") {
      text = await googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/export`, {
        params: { mimeType: "text/csv" }
      });
      method = "sheets_csv_export";
    } else if (mimeType === "application/vnd.google-apps.presentation") {
      text = await googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/export`, {
        params: { mimeType: "text/plain" }
      });
      method = "slides_export";
    } else if (mimeType === "application/pdf" || mimeType?.startsWith("image/")) {
      try {
        const imported = await this.importToGoogleDoc(fileId, `_ocr_temp_${meta.name}`);
        const tempDocId = imported.id;
        text = await googleFetch(t, `https://www.googleapis.com/drive/v3/files/${tempDocId}/export`, {
          params: { mimeType: "text/plain" }
        });
        await googleFetch(t, `https://www.googleapis.com/drive/v3/files/${tempDocId}`, { method: "DELETE" });
        method = "ocr_via_google_docs";
      } catch (e) {
        return { fileId, fileName: meta.name, mimeType, text: "", method: "ocr_failed", error: e.message };
      }
    } else if (mimeType === "text/plain" || mimeType === "text/html" || mimeType === "text/csv" || mimeType === "application/json" || mimeType === "application/xml") {
      const resp = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        headers: { Authorization: `Bearer ${t}` }
      });
      if (!resp.ok) throw new Error(`Download failed: ${resp.status}`);
      text = await resp.text();
      method = "direct_download";
    } else {
      try {
        const resp = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
          headers: { Authorization: `Bearer ${t}` }
        });
        if (resp.ok) {
          text = await resp.text();
          method = "binary_as_text";
        }
      } catch {
        return { fileId, fileName: meta.name, mimeType, text: "", method: "unsupported", error: `Cannot extract text from ${mimeType}` };
      }
    }
    return {
      fileId,
      fileName: meta.name,
      mimeType,
      text: typeof text === "string" ? text : JSON.stringify(text),
      charCount: (typeof text === "string" ? text : JSON.stringify(text)).length,
      method
    };
  }
  /** Auto-categorize files in a folder using Gemini AI */
  async autoCategorizeDriveFiles(folderId, options) {
    const categories = options?.categories || {
      "Pleadings": "Complaints, answers, motions, briefs, memoranda",
      "Discovery": "Interrogatories, requests for production, depositions, subpoenas",
      "Correspondence": "Letters, emails, faxes between parties or counsel",
      "Contracts": "Agreements, amendments, addendums, terms of service",
      "Court_Orders": "Orders, rulings, judgments, decrees",
      "Evidence": "Exhibits, photographs, records, declarations, affidavits",
      "Financial": "Invoices, billing, payment records, financial statements",
      "Administrative": "Filing receipts, certificates, notices, forms"
    };
    const files = await this.listDriveItems(folderId, options?.maxFiles || 50);
    const fileList = files.files || [];
    if (fileList.length === 0) return { categorized: 0, files: [] };
    const fileSummary = fileList.filter((f) => f.mimeType !== "application/vnd.google-apps.folder").map((f) => `- ${f.name} (${f.mimeType})`).join("\n");
    const categoryList = Object.entries(categories).map(([name, desc]) => `- "${name}": ${desc}`).join("\n");
    const prompt = `Classify each file into one of these categories based on its filename and type:

Categories:
${categoryList}

Files:
${fileSummary}

Return ONLY a JSON array: [{"fileName": "...", "category": "...", "confidence": 0.0-1.0}]`;
    const aiResult = await this.geminiGenerate(prompt, {
      systemInstruction: "You are a legal document organizer. Classify files based on their names. Return only valid JSON.",
      temperature: 0.1
    });
    let classifications = [];
    try {
      const jsonMatch = aiResult.text.match(/\[[\s\S]*\]/);
      if (jsonMatch) classifications = JSON.parse(jsonMatch[0]);
    } catch {
    }
    const results = [];
    const folderCache = {};
    for (const cls of classifications) {
      const file = fileList.find((f) => f.name === cls.fileName);
      if (!file) continue;
      if (options?.dryRun) {
        results.push({ fileName: cls.fileName, category: cls.category, confidence: cls.confidence, action: "dry_run" });
        continue;
      }
      if (!folderCache[cls.category]) {
        try {
          const existing = await this.searchDriveFiles(
            `name = '${cls.category}' and '${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
            1
          );
          if (existing.files?.length > 0) {
            folderCache[cls.category] = existing.files[0].id;
          } else {
            const newFolder = await this.createDriveFolder(cls.category, folderId);
            folderCache[cls.category] = newFolder.id;
          }
        } catch (e) {
          results.push({ fileName: cls.fileName, category: cls.category, error: e.message });
          continue;
        }
      }
      try {
        await this.moveDriveFile(file.id, folderCache[cls.category]);
        results.push({ fileName: cls.fileName, fileId: file.id, category: cls.category, confidence: cls.confidence, action: "moved" });
      } catch (e) {
        results.push({ fileName: cls.fileName, category: cls.category, error: e.message });
      }
    }
    return {
      totalFiles: fileList.length,
      categorized: results.filter((r) => r.action === "moved" || r.action === "dry_run").length,
      categories: Object.keys(categories),
      results
    };
  }
  // ============================================
  // GMAIL WATCH (Push Notifications via Pub/Sub)
  // ============================================
  /** Start watching Gmail for changes via Pub/Sub push notifications */
  async watchGmail(topicName, labelIds) {
    const t = await this.token();
    return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/watch", {
      method: "POST",
      body: {
        topicName,
        labelIds: labelIds || ["INBOX"],
        labelFilterBehavior: "INCLUDE"
      }
    });
  }
  /** Stop watching Gmail */
  async stopGmailWatch() {
    const t = await this.token();
    return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/stop", {
      method: "POST"
    });
  }
  // ============================================
  // DRIVE CHANGES WATCH (Webhook Notifications)
  // ============================================
  /** Get a start page token for tracking Drive changes */
  async getDriveStartPageToken() {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/drive/v3/changes/startPageToken");
  }
  /** List Drive changes since a page token */
  async listDriveChanges(pageToken, options) {
    const t = await this.token();
    const params = {
      pageToken,
      fields: "nextPageToken,newStartPageToken,changes(fileId,removed,time,file(id,name,mimeType,modifiedTime,lastModifyingUser,parents))"
    };
    if (options?.pageSize) params.pageSize = String(options.pageSize);
    if (options?.includeRemoved !== void 0) params.includeRemoved = String(options.includeRemoved);
    return googleFetch(t, "https://www.googleapis.com/drive/v3/changes", { params });
  }
  /** Subscribe to Drive changes via webhook */
  async watchDriveChanges(pageToken, webhookUrl, channelId) {
    const t = await this.token();
    const id = channelId || `drive-watch-${Date.now()}`;
    return googleFetch(t, "https://www.googleapis.com/drive/v3/changes/watch", {
      method: "POST",
      params: { pageToken },
      body: {
        id,
        type: "web_hook",
        address: webhookUrl,
        expiration: String(Date.now() + 7 * 24 * 60 * 60 * 1e3)
        // 7 days
      }
    });
  }
  /** Subscribe to changes on a specific Drive file */
  async watchDriveFile(fileId, webhookUrl, channelId) {
    const t = await this.token();
    const id = channelId || `file-watch-${fileId}-${Date.now()}`;
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/watch`, {
      method: "POST",
      body: {
        id,
        type: "web_hook",
        address: webhookUrl,
        expiration: String(Date.now() + 7 * 24 * 60 * 60 * 1e3)
      }
    });
  }
  /** Stop receiving Drive webhook notifications */
  async stopDriveWatch(channelId, resourceId) {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/drive/v3/channels/stop", {
      method: "POST",
      body: { id: channelId, resourceId }
    });
  }
  /** Delete a file permanently from Drive */
  async deleteDriveFile(fileId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: "DELETE"
    });
  }
  /** Get full file metadata */
  async getDriveFileMetadata(fileId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}`, {
      params: {
        fields: "id,name,mimeType,size,modifiedTime,createdTime,description,starred,trashed,parents,owners,permissions,webViewLink,webContentLink,iconLink,thumbnailLink,md5Checksum,sha1Checksum,sha256Checksum,fullFileExtension,originalFilename"
      }
    });
  }
  // ── Calendar Gaps (quickAdd, import, move, watch, instances, settings, ACL) ──
  async quickAddCalendarEvent(calendarId = "primary", text) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/quickAdd`, { method: "POST", params: { text } });
  }
  async importCalendarEvent(calendarId = "primary", event) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/import`, { method: "POST", body: event });
  }
  async moveCalendarEvent(calendarId = "primary", eventId, destinationCalendarId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}/move`, { method: "POST", params: { destination: destinationCalendarId } });
  }
  async watchCalendarEvents(calendarId = "primary", webhookUrl, channelId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/watch`, { method: "POST", body: { id: channelId || crypto.randomUUID(), type: "web_hook", address: webhookUrl } });
  }
  async getCalendarEvent(calendarId = "primary", eventId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${eventId}`);
  }
  async getCalendarEventInstances(calendarId = "primary", eventId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}/instances`);
  }
  async listCalendarSettings() {
    const t = await this.token();
    return googleFetch(t, "https://www.googleapis.com/calendar/v3/users/me/settings");
  }
  async getCalendarAcl(calendarId = "primary") {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/acl`);
  }
  // ── Gmail Gaps (vacation, delegates, auto-forward, sendAs, batch delete) ──
  async getGmailVacation() {
    const t = await this.token();
    return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/settings/vacation");
  }
  async setGmailVacation(enabled, options) {
    const t = await this.token();
    return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/settings/vacation", {
      method: "PUT",
      body: { enableAutoReply: enabled, responseSubject: options?.responseSubject, responseBodyHtml: options?.responseBody, startTime: options?.startTime, endTime: options?.endTime }
    });
  }
  async listGmailDelegates() {
    const t = await this.token();
    return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/settings/delegates");
  }
  async addGmailDelegate(email) {
    const t = await this.token();
    return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/settings/delegates", { method: "POST", body: { delegateEmail: email } });
  }
  async removeGmailDelegate(email) {
    const t = await this.token();
    return googleFetch(t, `https://gmail.googleapis.com/gmail/v1/users/me/settings/delegates/${email}`, { method: "DELETE" });
  }
  async setGmailAutoForwarding(email, enabled) {
    const t = await this.token();
    return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/settings/autoForwarding", {
      method: "PUT",
      body: { enabled, emailAddress: email, disposition: "leaveInInbox" }
    });
  }
  async listGmailSendAs() {
    const t = await this.token();
    return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/settings/sendAs");
  }
  async batchDeleteGmailMessages(ids) {
    const t = await this.token();
    return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/messages/batchDelete", { method: "POST", body: { ids } });
  }
  async trashGmailMessage(messageId) {
    const t = await this.token();
    return googleFetch(t, `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/trash`, { method: "POST" });
  }
  async untrashGmailMessage(messageId) {
    const t = await this.token();
    return googleFetch(t, `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/untrash`, { method: "POST" });
  }
  async deleteGmailMessage(messageId) {
    const t = await this.token();
    const resp = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Delete message failed: ${resp.status}`);
    return { deleted: true };
  }
  async listGmailDrafts(maxResults = 20) {
    const t = await this.token();
    return googleFetch(t, "https://gmail.googleapis.com/gmail/v1/users/me/drafts", { params: { maxResults: String(maxResults) } });
  }
  async deleteGmailDraft(draftId) {
    const t = await this.token();
    const resp = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/drafts/${draftId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${t}` }
    });
    if (!resp.ok && resp.status !== 204) throw new Error(`Delete draft failed: ${resp.status}`);
    return { deleted: true };
  }
  async trashGmailThread(threadId) {
    const t = await this.token();
    return googleFetch(t, `https://gmail.googleapis.com/gmail/v1/users/me/threads/${threadId}/trash`, { method: "POST" });
  }
  async untrashGmailThread(threadId) {
    const t = await this.token();
    return googleFetch(t, `https://gmail.googleapis.com/gmail/v1/users/me/threads/${threadId}/untrash`, { method: "POST" });
  }
  // ── Chat Gaps (create space, memberships, reactions) ──
  async createChatSpace(displayName, spaceType = "SPACE") {
    const t = await this.token();
    return googleFetch(t, "https://chat.googleapis.com/v1/spaces", { method: "POST", body: { displayName, spaceType } });
  }
  async listChatMemberships(spaceName) {
    const t = await this.token();
    return googleFetch(t, `https://chat.googleapis.com/v1/${spaceName}/members`);
  }
  async createChatMembership(spaceName, member) {
    const t = await this.token();
    return googleFetch(t, `https://chat.googleapis.com/v1/${spaceName}/members`, { method: "POST", body: { member } });
  }
  async deleteChatMembership(membershipName) {
    const t = await this.token();
    return googleFetch(t, `https://chat.googleapis.com/v1/${membershipName}`, { method: "DELETE" });
  }
  // ── Sheets Gaps (validation, conditional format, charts, named ranges, pivots) ──
  async addSheetDataValidation(spreadsheetId, sheetId, range, rule) {
    const t = await this.token();
    return googleFetch(t, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: "POST",
      body: { requests: [{ setDataValidation: { range, rule } }] }
    });
  }
  async addSheetConditionalFormatting(spreadsheetId, sheetId, ranges, condition, format) {
    const t = await this.token();
    return googleFetch(t, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: "POST",
      body: { requests: [{ addConditionalFormatRule: { rule: { ranges, booleanRule: { condition, format } }, index: 0 } }] }
    });
  }
  async createSheetChart(spreadsheetId, sheetId, chartSpec) {
    const t = await this.token();
    return googleFetch(t, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: "POST",
      body: { requests: [{ addChart: { chart: { spec: chartSpec, position: { overlayPosition: { anchorCell: { sheetId, rowIndex: 0, columnIndex: 0 } } } } } }] }
    });
  }
  async createSheetNamedRange(spreadsheetId, name, range) {
    const t = await this.token();
    return googleFetch(t, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: "POST",
      body: { requests: [{ addNamedRange: { namedRange: { name, range } } }] }
    });
  }
  // ── Forms Gaps (watch, renew) ──
  async createFormWatch(formId, eventType, topicName) {
    const t = await this.token();
    return googleFetch(t, `https://forms.googleapis.com/v1/forms/${formId}/watches`, {
      method: "POST",
      body: { watch: { target: { topic: { topicName } }, eventType } }
    });
  }
  async renewFormWatch(formId, watchId) {
    const t = await this.token();
    return googleFetch(t, `https://forms.googleapis.com/v1/forms/${formId}/watches/${watchId}:renew`, { method: "POST" });
  }
  // ── Drive Labels API (structured metadata on files) ──
  async createDriveLabel(name, labelType = "ADMIN", fields) {
    const t = await this.token();
    return googleFetch(t, "https://drivelabels.googleapis.com/v2/labels", {
      method: "POST",
      body: { labelType, properties: { title: name }, fields }
    });
  }
  async listDriveLabels() {
    const t = await this.token();
    return googleFetch(t, "https://drivelabels.googleapis.com/v2/labels");
  }
  async getDriveLabel(labelId) {
    const t = await this.token();
    return googleFetch(t, `https://drivelabels.googleapis.com/v2/labels/${labelId}`);
  }
  async applyLabelToFile(fileId, labelId, fields) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/modifyLabels`, {
      method: "POST",
      body: { labelModifications: [{ labelId, fieldModifications: fields ? Object.entries(fields).map(([id, v]) => ({ fieldId: id, setTextValues: { values: [String(v)] } })) : [] }] }
    });
  }
  async listFileLabels(fileId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/listLabels`);
  }
  async removeLabelFromFile(fileId, labelId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/modifyLabels`, {
      method: "POST",
      body: { labelModifications: [{ labelId, removeLabel: true }] }
    });
  }
  // ── Drive Comments (document review collaboration) ──
  async listDriveComments(fileId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/comments`, { params: { fields: "comments(id,content,author,createdTime,resolved,replies)" } });
  }
  async createDriveComment(fileId, content) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/comments`, { method: "POST", body: { content }, params: { fields: "id,content,author,createdTime" } });
  }
  async replyToDriveComment(fileId, commentId, content) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/comments/${commentId}/replies`, { method: "POST", body: { content }, params: { fields: "id,content,author,createdTime" } });
  }
  async resolveDriveComment(fileId, commentId) {
    const t = await this.token();
    return googleFetch(t, `https://www.googleapis.com/drive/v3/files/${fileId}/comments/${commentId}`, { method: "PATCH", body: { resolved: true }, params: { fields: "id,resolved" } });
  }
  // ── Meet Gaps (end conference, participant sessions) ──
  async endMeetConference(spaceName) {
    const t = await this.token();
    return googleFetch(t, `https://meet.googleapis.com/v2/${spaceName}:endActiveConference`, { method: "POST" });
  }
  async listMeetParticipantSessions(participantName) {
    const t = await this.token();
    return googleFetch(t, `https://meet.googleapis.com/v2/${participantName}/participantSessions`);
  }
  // ── Workspace Events (push subscriptions) ──
  async setupDriveEventSubscription(targetResource, webhookUrl, eventTypes) {
    const t = await this.token();
    return googleFetch(t, "https://workspaceevents.googleapis.com/v1/subscriptions", {
      method: "POST",
      body: { targetResource, eventTypes: eventTypes || ["google.workspace.drive.resource.v1.change"], notificationEndpoint: { pubsubTopic: webhookUrl }, payloadOptions: { includeResource: true } }
    });
  }
  async setupCalendarEventSubscription(calendarId, webhookUrl) {
    const t = await this.token();
    return googleFetch(t, "https://workspaceevents.googleapis.com/v1/subscriptions", {
      method: "POST",
      body: { targetResource: `//calendar.googleapis.com/calendars/${calendarId}`, eventTypes: ["google.workspace.calendar.event.v1.created", "google.workspace.calendar.event.v1.updated"], notificationEndpoint: { pubsubTopic: webhookUrl } }
    });
  }
  // ── Gemini Context Caching (75% cost reduction) ──
  async createGeminiCachedContent(model, contents, displayName, ttl) {
    const t = await this.token();
    return googleFetch(t, "https://generativelanguage.googleapis.com/v1beta/cachedContents", {
      method: "POST",
      body: { model: `models/${model}`, contents, displayName, ttl: ttl || "3600s" }
    });
  }
  async listGeminiCachedContents() {
    const t = await this.token();
    return googleFetch(t, "https://generativelanguage.googleapis.com/v1beta/cachedContents");
  }
  async deleteGeminiCachedContent(name) {
    const t = await this.token();
    return googleFetch(t, `https://generativelanguage.googleapis.com/v1beta/${name}`, { method: "DELETE" });
  }
  // ── Gemini Video Understanding ──
  async geminiAnalyzeVideo(videoUri, prompt, model) {
    const t = await this.token();
    return googleFetch(t, `https://generativelanguage.googleapis.com/v1beta/models/${model || "gemini-2.5-flash"}:generateContent`, {
      method: "POST",
      body: { contents: [{ parts: [{ fileData: { mimeType: "video/*", fileUri: videoUri } }, { text: prompt }] }] }
    });
  }
};

// index.ts
function timingSafeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}
function checkAuth(request, env2) {
  // Service binding calls are internally trusted — no key needed
  if (request.headers.get("CF-Worker-Subrequest") === "true") return true;
  if (!env2.SESSION_KEY) return true;
  const key = request.headers.get("X-Session-Token")
    || request.headers.get("X-API-Key")
    || (request.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "")
    || new URL(request.url).searchParams.get("key")
    || "";
  return timingSafeEqual(key, env2.SESSION_KEY);
}
__name(checkAuth, "checkAuth");
var CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Mcp-Session-Id"
};
function withCors(response) {
  const headers = new Headers(response.headers);
  for (const [k, v] of Object.entries(CORS_HEADERS)) headers.set(k, v);
  return new Response(response.body, { status: response.status, headers });
}
__name(withCors, "withCors");
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS }
  });
}
__name(json, "json");
var TOOLS = [
  // ── Drive ──
  {
    name: "drive_search",
    description: "Search Google Drive files by name, content, or type",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        maxResults: { type: "number", description: "Max results (default 20)" },
        driveId: { type: "string", description: "Shared drive ID (optional)" },
        folderId: { type: "string", description: "Restrict search to folder (optional)" }
      },
      required: ["query"]
    }
  },
  {
    name: "drive_list",
    description: "List files in a Google Drive folder",
    inputSchema: {
      type: "object",
      properties: {
        folderId: { type: "string", description: "Folder ID (default: 'root')" },
        maxResults: { type: "number" },
        includeSubfolders: { type: "boolean" },
        orderBy: { type: "string", description: "e.g. modifiedTime desc" }
      }
    }
  },
  {
    name: "drive_get",
    description: "Get the content / text of a Google Drive file",
    inputSchema: {
      type: "object",
      properties: {
        fileId: { type: "string" }
      },
      required: ["fileId"]
    }
  },
  {
    name: "drive_create",
    description: "Create a new file in Google Drive",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string" },
        content: { type: "string" },
        mimeType: { type: "string", description: "e.g. text/plain, application/json" },
        folderId: { type: "string" }
      },
      required: ["name", "content"]
    }
  },
  {
    name: "drive_copy",
    description: "Copy a file in Google Drive",
    inputSchema: {
      type: "object",
      properties: {
        fileId: { type: "string" },
        name: { type: "string", description: "New file name (optional)" },
        folderId: { type: "string", description: "Destination folder (optional)" }
      },
      required: ["fileId"]
    }
  },
  {
    name: "drive_share",
    description: "Share a Drive file or folder with a user",
    inputSchema: {
      type: "object",
      properties: {
        fileId: { type: "string" },
        email: { type: "string" },
        role: { type: "string", description: "reader | writer | commenter (default: reader)" }
      },
      required: ["fileId", "email"]
    }
  },
  {
    name: "drive_get_link",
    description: "Get shareable link for a Drive file",
    inputSchema: {
      type: "object",
      properties: {
        fileId: { type: "string" }
      },
      required: ["fileId"]
    }
  },
  {
    name: "drive_export",
    description: "Export a Google Workspace file (Docs/Sheets/Slides) to a specific MIME type",
    inputSchema: {
      type: "object",
      properties: {
        fileId: { type: "string" },
        mimeType: { type: "string", description: "e.g. application/pdf, text/plain" }
      },
      required: ["fileId", "mimeType"]
    }
  },
  // ── Gmail ──
  {
    name: "gmail_search",
    description: "Search Gmail messages",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Gmail search query (e.g. from:foo@bar.com)" },
        maxResults: { type: "number", description: "Max messages to return (default 20)" }
      },
      required: ["query"]
    }
  },
  {
    name: "gmail_get",
    description: "Get a Gmail message by ID",
    inputSchema: {
      type: "object",
      properties: {
        messageId: { type: "string" },
        format: { type: "string", description: "full | metadata | minimal (default: full)" }
      },
      required: ["messageId"]
    }
  },
  {
    name: "gmail_send",
    description: "Send an email via Gmail",
    inputSchema: {
      type: "object",
      properties: {
        to: { type: "string" },
        subject: { type: "string" },
        body: { type: "string" },
        cc: { type: "string" },
        bcc: { type: "string" },
        isHtml: { type: "boolean" }
      },
      required: ["to", "subject", "body"]
    }
  },
  {
    name: "gmail_draft",
    description: "Create a Gmail draft",
    inputSchema: {
      type: "object",
      properties: {
        to: { type: "string" },
        subject: { type: "string" },
        body: { type: "string" },
        cc: { type: "string" },
        isHtml: { type: "boolean" }
      },
      required: ["to", "subject", "body"]
    }
  },
  {
    name: "gmail_get_thread",
    description: "Get an email thread by thread ID",
    inputSchema: {
      type: "object",
      properties: {
        threadId: { type: "string" }
      },
      required: ["threadId"]
    }
  },
  {
    name: "gmail_modify_labels",
    description: "Add or remove labels on a Gmail message",
    inputSchema: {
      type: "object",
      properties: {
        messageId: { type: "string" },
        addLabels: { type: "array", items: { type: "string" } },
        removeLabels: { type: "array", items: { type: "string" } }
      },
      required: ["messageId"]
    }
  },
  {
    name: "gmail_list_labels",
    description: "List all Gmail labels",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "gmail_get_attachment",
    description: "Get an email attachment by message ID and attachment ID",
    inputSchema: {
      type: "object",
      properties: {
        messageId: { type: "string" },
        attachmentId: { type: "string" }
      },
      required: ["messageId", "attachmentId"]
    }
  },
  {
    name: "gmail_create_filter",
    description: "Create a Gmail filter rule",
    inputSchema: {
      type: "object",
      properties: {
        criteria: {
          type: "object",
          properties: {
            from: { type: "string" },
            to: { type: "string" },
            subject: { type: "string" },
            query: { type: "string" },
            hasAttachment: { type: "boolean" }
          }
        },
        actions: {
          type: "object",
          properties: {
            addLabelIds: { type: "array", items: { type: "string" } },
            removeLabelIds: { type: "array", items: { type: "string" } },
            forward: { type: "string" }
          }
        }
      },
      required: ["criteria", "actions"]
    }
  },
  {
    name: "gmail_list_filters",
    description: "List Gmail filter rules",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "gmail_manage_label",
    description: "Create, update, or delete a Gmail label",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["create", "update", "delete"] },
        name: { type: "string", description: "Label name (required for create/update)" },
        labelId: { type: "string", description: "Label ID (required for update/delete)" },
        textColor: { type: "string" },
        backgroundColor: { type: "string" }
      },
      required: ["action"]
    }
  },
  // ── Calendar ──
  {
    name: "calendar_list",
    description: "List available Google Calendars",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "calendar_events",
    description: "List events from a Google Calendar",
    inputSchema: {
      type: "object",
      properties: {
        calendarId: { type: "string", description: "Calendar ID (default: 'primary')" },
        timeMin: { type: "string", description: "ISO 8601 start time" },
        timeMax: { type: "string", description: "ISO 8601 end time" },
        maxResults: { type: "number" },
        singleEvents: { type: "boolean" },
        orderBy: { type: "string" }
      }
    }
  },
  {
    name: "calendar_create",
    description: "Create a Google Calendar event",
    inputSchema: {
      type: "object",
      properties: {
        summary: { type: "string" },
        description: { type: "string" },
        start: { type: "string", description: "ISO 8601 datetime or date" },
        end: { type: "string", description: "ISO 8601 datetime or date" },
        attendees: { type: "array", items: { type: "string" }, description: "Email addresses" },
        calendarId: { type: "string" },
        allDay: { type: "boolean" }
      },
      required: ["summary", "start", "end"]
    }
  },
  {
    name: "calendar_update",
    description: "Update a Google Calendar event",
    inputSchema: {
      type: "object",
      properties: {
        eventId: { type: "string" },
        calendarId: { type: "string" },
        summary: { type: "string" },
        description: { type: "string" },
        start: { type: "string" },
        end: { type: "string" }
      },
      required: ["eventId"]
    }
  },
  {
    name: "calendar_delete",
    description: "Delete a Google Calendar event",
    inputSchema: {
      type: "object",
      properties: {
        eventId: { type: "string" },
        calendarId: { type: "string" }
      },
      required: ["eventId"]
    }
  },
  {
    name: "calendar_freebusy",
    description: "Query free/busy times for calendars",
    inputSchema: {
      type: "object",
      properties: {
        timeMin: { type: "string" },
        timeMax: { type: "string" },
        calendarIds: { type: "array", items: { type: "string" } }
      },
      required: ["timeMin", "timeMax", "calendarIds"]
    }
  },
  // ── Docs ──
  {
    name: "docs_get",
    description: "Get the content of a Google Doc",
    inputSchema: {
      type: "object",
      properties: {
        documentId: { type: "string" }
      },
      required: ["documentId"]
    }
  },
  {
    name: "docs_create",
    description: "Create a new Google Doc",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string" },
        content: { type: "string", description: "Initial text content (optional)" }
      },
      required: ["title"]
    }
  },
  {
    name: "docs_modify",
    description: "Modify text in a Google Doc",
    inputSchema: {
      type: "object",
      properties: {
        documentId: { type: "string" },
        operations: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { type: "string", enum: ["insertText", "deleteText", "replaceText"] },
              text: { type: "string" },
              location: { type: "number" },
              startIndex: { type: "number" },
              endIndex: { type: "number" }
            }
          }
        }
      },
      required: ["documentId", "operations"]
    }
  },
  {
    name: "docs_find_replace",
    description: "Find and replace text in a Google Doc",
    inputSchema: {
      type: "object",
      properties: {
        documentId: { type: "string" },
        find: { type: "string" },
        replace: { type: "string" },
        matchCase: { type: "boolean" }
      },
      required: ["documentId", "find", "replace"]
    }
  },
  // ── Sheets ──
  {
    name: "sheets_read",
    description: "Read values from a Google Sheets range",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheetId: { type: "string" },
        range: { type: "string", description: "e.g. 'Sheet1!A1:D10'" },
        majorDimension: { type: "string", enum: ["ROWS", "COLUMNS"], description: "Default: ROWS" },
        valueRenderOption: { type: "string", enum: ["FORMATTED_VALUE", "UNFORMATTED_VALUE", "FORMULA"], description: "Default: FORMATTED_VALUE" },
        dateTimeRenderOption: { type: "string", enum: ["SERIAL_NUMBER", "FORMATTED_STRING"], description: "Default: SERIAL_NUMBER" }
      },
      required: ["spreadsheetId", "range"]
    }
  },
  {
    name: "sheets_write",
    description: "Write, append, or clear values in a Google Sheets range",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheetId: { type: "string" },
        range: { type: "string" },
        values: { type: "array", items: { type: "array" } },
        valueInputOption: { type: "string", enum: ["RAW", "USER_ENTERED"], description: "Default: USER_ENTERED" },
        mode: { type: "string", enum: ["write", "append", "clear"], description: "Default: write. Use append to add rows, clear to empty range" }
      },
      required: ["spreadsheetId", "range"]
    }
  },
  {
    name: "sheets_batch_get",
    description: "Read multiple ranges from a spreadsheet in one call",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheetId: { type: "string" },
        ranges: { type: "array", items: { type: "string" }, description: "e.g. ['Sheet1!A1:B5', 'Sheet2!C1:D10']" },
        majorDimension: { type: "string", enum: ["ROWS", "COLUMNS"] },
        valueRenderOption: { type: "string", enum: ["FORMATTED_VALUE", "UNFORMATTED_VALUE", "FORMULA"] },
        dateTimeRenderOption: { type: "string", enum: ["SERIAL_NUMBER", "FORMATTED_STRING"] }
      },
      required: ["spreadsheetId", "ranges"]
    }
  },
  {
    name: "sheets_batch_update",
    description: "Write to multiple ranges in a spreadsheet in one call",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheetId: { type: "string" },
        data: { type: "array", items: { type: "object", properties: { range: { type: "string" }, values: { type: "array", items: { type: "array" } } }, required: ["range", "values"] }, description: "Array of {range, values} objects" },
        valueInputOption: { type: "string", enum: ["RAW", "USER_ENTERED"], description: "Default: USER_ENTERED" }
      },
      required: ["spreadsheetId", "data"]
    }
  },
  {
    name: "sheets_batch_clear",
    description: "Clear multiple ranges in a spreadsheet in one call",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheetId: { type: "string" },
        ranges: { type: "array", items: { type: "string" } }
      },
      required: ["spreadsheetId", "ranges"]
    }
  },
  {
    name: "sheets_batch_request",
    description: "Send arbitrary batchUpdate requests (add sheets, format cells, charts, validation, named ranges, merge cells, etc.)",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheetId: { type: "string" },
        requests: { type: "array", items: { type: "object" }, description: "Array of Sheets API batchUpdate request objects" }
      },
      required: ["spreadsheetId", "requests"]
    }
  },
  {
    name: "sheets_add_sheet",
    description: "Add a new sheet/tab to an existing spreadsheet",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheetId: { type: "string" },
        title: { type: "string" },
        index: { type: "number", description: "Position of the new sheet (0-based)" }
      },
      required: ["spreadsheetId", "title"]
    }
  },
  {
    name: "sheets_copy_to",
    description: "Copy a sheet from one spreadsheet to another",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheetId: { type: "string", description: "Source spreadsheet ID" },
        sheetId: { type: "number", description: "Source sheet ID (numeric, from sheets_info)" },
        destinationSpreadsheetId: { type: "string" }
      },
      required: ["spreadsheetId", "sheetId", "destinationSpreadsheetId"]
    }
  },
  {
    name: "sheets_list",
    description: "List all spreadsheets owned by the user (via Drive API)",
    inputSchema: {
      type: "object",
      properties: {
        maxResults: { type: "number", description: "Default: 50" }
      }
    }
  },
  {
    name: "sheets_create",
    description: "Create a new Google Spreadsheet",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string" },
        sheetTitles: { type: "array", items: { type: "string" } }
      },
      required: ["title"]
    }
  },
  {
    name: "sheets_info",
    description: "Get metadata about a Google Spreadsheet (properties, sheets, optionally grid data)",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheetId: { type: "string" },
        ranges: { type: "array", items: { type: "string" }, description: "Limit response to these ranges" },
        includeGridData: { type: "boolean", description: "Include cell data (requires ranges)" },
        fields: { type: "string", description: "Custom fields mask (default: spreadsheetId,properties,sheets.properties)" }
      },
      required: ["spreadsheetId"]
    }
  },
  // ── Tasks ──
  {
    name: "tasks_list_lists",
    description: "List all Google Task lists",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "tasks_list",
    description: "List tasks in a task list",
    inputSchema: {
      type: "object",
      properties: {
        taskListId: { type: "string" },
        showCompleted: { type: "boolean" },
        showHidden: { type: "boolean" },
        maxResults: { type: "number" }
      },
      required: ["taskListId"]
    }
  },
  {
    name: "tasks_create",
    description: "Create a task in a Google Task list",
    inputSchema: {
      type: "object",
      properties: {
        taskListId: { type: "string" },
        title: { type: "string" },
        notes: { type: "string" },
        due: { type: "string", description: "ISO 8601 date" },
        parent: { type: "string", description: "Parent task ID for subtasks" }
      },
      required: ["taskListId", "title"]
    }
  },
  {
    name: "tasks_update",
    description: "Update a Google Task",
    inputSchema: {
      type: "object",
      properties: {
        taskListId: { type: "string" },
        taskId: { type: "string" },
        title: { type: "string" },
        notes: { type: "string" },
        status: { type: "string", enum: ["needsAction", "completed"] },
        due: { type: "string" }
      },
      required: ["taskListId", "taskId"]
    }
  },
  {
    name: "tasks_delete",
    description: "Delete a Google Task",
    inputSchema: {
      type: "object",
      properties: {
        taskListId: { type: "string" },
        taskId: { type: "string" }
      },
      required: ["taskListId", "taskId"]
    }
  },
  {
    name: "tasks_create_list",
    description: "Create a new Google Task list",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string" }
      },
      required: ["title"]
    }
  },
  // ── Contacts ──
  {
    name: "contacts_search",
    description: "Search Google Contacts",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" },
        maxResults: { type: "number" }
      },
      required: ["query"]
    }
  },
  {
    name: "contacts_list",
    description: "List Google Contacts",
    inputSchema: {
      type: "object",
      properties: {
        pageSize: { type: "number" },
        pageToken: { type: "string" }
      }
    }
  },
  // ── Chat ──
  {
    name: "chat_list_spaces",
    description: "List Google Chat spaces/rooms",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "chat_get_messages",
    description: "Get messages from a Google Chat space",
    inputSchema: {
      type: "object",
      properties: {
        spaceName: { type: "string", description: "e.g. 'spaces/XXXXXX'" },
        pageSize: { type: "number" }
      },
      required: ["spaceName"]
    }
  },
  {
    name: "chat_send",
    description: "Send a message to a Google Chat space",
    inputSchema: {
      type: "object",
      properties: {
        spaceName: { type: "string" },
        text: { type: "string" }
      },
      required: ["spaceName", "text"]
    }
  },
  // ── Forms ──
  {
    name: "forms_get",
    description: "Get a Google Form",
    inputSchema: {
      type: "object",
      properties: {
        formId: { type: "string" }
      },
      required: ["formId"]
    }
  },
  {
    name: "forms_responses",
    description: "List responses for a Google Form",
    inputSchema: {
      type: "object",
      properties: {
        formId: { type: "string" },
        pageSize: { type: "number" }
      },
      required: ["formId"]
    }
  },
  // ── Gmail Extended ──
  {
    name: "gmail_profile",
    description: "Get Gmail profile info (email, messagesTotal, threadsTotal, historyId)",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "gmail_trash",
    description: "Move a Gmail message to trash",
    inputSchema: { type: "object", properties: { messageId: { type: "string" } }, required: ["messageId"] }
  },
  {
    name: "gmail_untrash",
    description: "Remove a Gmail message from trash",
    inputSchema: { type: "object", properties: { messageId: { type: "string" } }, required: ["messageId"] }
  },
  {
    name: "gmail_delete",
    description: "Permanently delete a Gmail message (cannot be undone)",
    inputSchema: { type: "object", properties: { messageId: { type: "string" } }, required: ["messageId"] }
  },
  {
    name: "gmail_batch_modify",
    description: "Modify labels on multiple Gmail messages at once",
    inputSchema: {
      type: "object",
      properties: {
        messageIds: { type: "array", items: { type: "string" } },
        addLabels: { type: "array", items: { type: "string" } },
        removeLabels: { type: "array", items: { type: "string" } }
      },
      required: ["messageIds"]
    }
  },
  {
    name: "gmail_batch_delete",
    description: "Permanently delete multiple Gmail messages (cannot be undone)",
    inputSchema: {
      type: "object",
      properties: { messageIds: { type: "array", items: { type: "string" } } },
      required: ["messageIds"]
    }
  },
  {
    name: "gmail_list_drafts",
    description: "List Gmail drafts",
    inputSchema: { type: "object", properties: { maxResults: { type: "number" } } }
  },
  {
    name: "gmail_delete_draft",
    description: "Delete a Gmail draft",
    inputSchema: { type: "object", properties: { draftId: { type: "string" } }, required: ["draftId"] }
  },
  {
    name: "gmail_history",
    description: "Get Gmail history (incremental changes since a historyId)",
    inputSchema: {
      type: "object",
      properties: {
        startHistoryId: { type: "string" },
        labelId: { type: "string" },
        historyTypes: { type: "array", items: { type: "string", enum: ["messageAdded", "messageDeleted", "labelAdded", "labelRemoved"] } },
        maxResults: { type: "number" }
      },
      required: ["startHistoryId"]
    }
  },
  {
    name: "gmail_thread_trash",
    description: "Move an entire Gmail thread to trash",
    inputSchema: { type: "object", properties: { threadId: { type: "string" } }, required: ["threadId"] }
  },
  {
    name: "gmail_thread_untrash",
    description: "Remove an entire Gmail thread from trash",
    inputSchema: { type: "object", properties: { threadId: { type: "string" } }, required: ["threadId"] }
  },
  // ── Drive Extended ──
  {
    name: "drive_delete",
    description: "Permanently delete a file from Google Drive (cannot be undone)",
    inputSchema: { type: "object", properties: { fileId: { type: "string" } }, required: ["fileId"] }
  },
  {
    name: "drive_update",
    description: "Update file metadata (name, description, starred, etc.)",
    inputSchema: {
      type: "object",
      properties: {
        fileId: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        starred: { type: "boolean" },
        mimeType: { type: "string" },
        addParents: { type: "string", description: "Comma-separated folder IDs to add" },
        removeParents: { type: "string", description: "Comma-separated folder IDs to remove" }
      },
      required: ["fileId"]
    }
  },
  {
    name: "drive_metadata",
    description: "Get full metadata for a Drive file (permissions, owners, checksums, etc.)",
    inputSchema: { type: "object", properties: { fileId: { type: "string" } }, required: ["fileId"] }
  },
  {
    name: "drive_permissions",
    description: "List permissions on a Drive file",
    inputSchema: { type: "object", properties: { fileId: { type: "string" } }, required: ["fileId"] }
  },
  {
    name: "drive_about",
    description: "Get Drive storage quota and user info",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "drive_download",
    description: "Get a direct download URL for a Drive file",
    inputSchema: { type: "object", properties: { fileId: { type: "string" } }, required: ["fileId"] }
  },
  {
    name: "drive_revisions",
    description: "List version history (revisions) of a Drive file",
    inputSchema: {
      type: "object",
      properties: { fileId: { type: "string" }, pageSize: { type: "number" } },
      required: ["fileId"]
    }
  },
  // ── Calendar Extended ──
  {
    name: "calendar_get_event",
    description: "Get a single calendar event by ID",
    inputSchema: {
      type: "object",
      properties: {
        calendarId: { type: "string", description: "Default: primary" },
        eventId: { type: "string" }
      },
      required: ["eventId"]
    }
  },
  {
    name: "calendar_quick_add",
    description: "Create an event from natural language text (e.g. 'Lunch with Bob tomorrow at noon')",
    inputSchema: {
      type: "object",
      properties: {
        calendarId: { type: "string", description: "Default: primary" },
        text: { type: "string" }
      },
      required: ["text"]
    }
  },
  {
    name: "calendar_move",
    description: "Move an event to a different calendar",
    inputSchema: {
      type: "object",
      properties: {
        calendarId: { type: "string", description: "Source calendar (default: primary)" },
        eventId: { type: "string" },
        destinationCalendarId: { type: "string" }
      },
      required: ["eventId", "destinationCalendarId"]
    }
  },
  {
    name: "calendar_instances",
    description: "List instances of a recurring calendar event",
    inputSchema: {
      type: "object",
      properties: {
        calendarId: { type: "string", description: "Default: primary" },
        eventId: { type: "string" }
      },
      required: ["eventId"]
    }
  },
  {
    name: "calendar_settings",
    description: "Get user's calendar settings (timezone, locale, etc.)",
    inputSchema: { type: "object", properties: {} }
  },
  // ── Tasks Extended ──
  {
    name: "tasks_get",
    description: "Get a single task by ID",
    inputSchema: {
      type: "object",
      properties: { taskListId: { type: "string" }, taskId: { type: "string" } },
      required: ["taskListId", "taskId"]
    }
  },
  {
    name: "tasks_move",
    description: "Move/reorder a task (change parent or position)",
    inputSchema: {
      type: "object",
      properties: {
        taskListId: { type: "string" },
        taskId: { type: "string" },
        parent: { type: "string", description: "New parent task ID (for subtasks)" },
        previous: { type: "string", description: "Task ID to position after" }
      },
      required: ["taskListId", "taskId"]
    }
  },
  {
    name: "tasks_delete_list",
    description: "Delete a Google Task list",
    inputSchema: { type: "object", properties: { taskListId: { type: "string" } }, required: ["taskListId"] }
  },
  {
    name: "tasks_clear_completed",
    description: "Clear all completed tasks from a task list",
    inputSchema: { type: "object", properties: { taskListId: { type: "string" } }, required: ["taskListId"] }
  },
  // ── Contacts Extended ──
  {
    name: "contacts_get",
    description: "Get a specific contact by resource name",
    inputSchema: { type: "object", properties: { resourceName: { type: "string", description: "e.g. 'people/c123456'" } }, required: ["resourceName"] }
  },
  {
    name: "contacts_create",
    description: "Create a new Google Contact",
    inputSchema: {
      type: "object",
      properties: {
        givenName: { type: "string" },
        familyName: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        organization: { type: "string" },
        jobTitle: { type: "string" }
      },
      required: ["givenName"]
    }
  },
  {
    name: "contacts_update",
    description: "Update an existing Google Contact",
    inputSchema: {
      type: "object",
      properties: {
        resourceName: { type: "string" },
        givenName: { type: "string" },
        familyName: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" }
      },
      required: ["resourceName"]
    }
  },
  {
    name: "contacts_delete",
    description: "Delete a Google Contact",
    inputSchema: { type: "object", properties: { resourceName: { type: "string" } }, required: ["resourceName"] }
  },
  // ── Slides ──
  {
    name: "slides_create",
    description: "Create a new Google Slides presentation",
    inputSchema: { type: "object", properties: { title: { type: "string" } }, required: ["title"] }
  },
  {
    name: "slides_get",
    description: "Get a Google Slides presentation",
    inputSchema: { type: "object", properties: { presentationId: { type: "string" } }, required: ["presentationId"] }
  },
  {
    name: "slides_batch_update",
    description: "Send batchUpdate requests to a Google Slides presentation",
    inputSchema: {
      type: "object",
      properties: {
        presentationId: { type: "string" },
        requests: { type: "array", items: { type: "object" } }
      },
      required: ["presentationId", "requests"]
    }
  },
  {
    name: "slides_get_page",
    description: "Get a specific page/slide from a presentation",
    inputSchema: {
      type: "object",
      properties: { presentationId: { type: "string" }, pageObjectId: { type: "string" } },
      required: ["presentationId", "pageObjectId"]
    }
  },
  {
    name: "slides_get_thumbnail",
    description: "Get a thumbnail image URL for a specific slide",
    inputSchema: {
      type: "object",
      properties: { presentationId: { type: "string" }, pageObjectId: { type: "string" } },
      required: ["presentationId", "pageObjectId"]
    }
  },
  // ── Forms Extended ──
  {
    name: "forms_create",
    description: "Create a new Google Form",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string" },
        documentTitle: { type: "string", description: "Document title (defaults to title)" }
      },
      required: ["title"]
    }
  },
  {
    name: "forms_batch_update",
    description: "Send batchUpdate requests to a Google Form (add questions, update settings, etc.)",
    inputSchema: {
      type: "object",
      properties: {
        formId: { type: "string" },
        requests: { type: "array", items: { type: "object" } }
      },
      required: ["formId", "requests"]
    }
  },
  // ── Docs Extended ──
  {
    name: "docs_comments",
    description: "List comments on a Google Doc/Drive file",
    inputSchema: { type: "object", properties: { fileId: { type: "string" }, maxResults: { type: "number" } }, required: ["fileId"] }
  },
  {
    name: "docs_add_comment",
    description: "Add a comment to a Google Doc/Drive file",
    inputSchema: { type: "object", properties: { fileId: { type: "string" }, content: { type: "string" } }, required: ["fileId", "content"] }
  },
  {
    name: "docs_reply_comment",
    description: "Reply to a comment on a Google Doc/Drive file",
    inputSchema: { type: "object", properties: { fileId: { type: "string" }, commentId: { type: "string" }, content: { type: "string" } }, required: ["fileId", "commentId", "content"] }
  },
  {
    name: "docs_resolve_comment",
    description: "Resolve a comment on a Google Doc/Drive file",
    inputSchema: { type: "object", properties: { fileId: { type: "string" }, commentId: { type: "string" } }, required: ["fileId", "commentId"] }
  },
  {
    name: "docs_insert_image",
    description: "Insert an image into a Google Doc at a specific index",
    inputSchema: {
      type: "object",
      properties: {
        documentId: { type: "string" },
        imageUri: { type: "string", description: "Public URL of the image" },
        index: { type: "number", description: "Character index to insert at" },
        width: { type: "number", description: "Width in points" },
        height: { type: "number", description: "Height in points" }
      },
      required: ["documentId", "imageUri", "index"]
    }
  },
  {
    name: "docs_insert_elements",
    description: "Insert structural elements (tables, page breaks, section breaks) into a Google Doc",
    inputSchema: {
      type: "object",
      properties: {
        documentId: { type: "string" },
        elements: { type: "array", items: { type: "object", properties: { type: { type: "string", enum: ["table", "page_break", "section_break"] }, index: { type: "number" }, rows: { type: "number" }, columns: { type: "number" } }, required: ["type", "index"] } }
      },
      required: ["documentId", "elements"]
    }
  },
  {
    name: "docs_headers_footers",
    description: "Set or update headers and footers on a Google Doc",
    inputSchema: {
      type: "object",
      properties: {
        documentId: { type: "string" },
        header: { type: "object", properties: { text: { type: "string" } } },
        footer: { type: "object", properties: { text: { type: "string" } } }
      },
      required: ["documentId"]
    }
  },
  {
    name: "docs_structure",
    description: "Inspect document structure (paragraphs, tables, sections with indices)",
    inputSchema: { type: "object", properties: { documentId: { type: "string" } }, required: ["documentId"] }
  },
  {
    name: "docs_export_pdf",
    description: "Export a Google Doc as PDF to Drive",
    inputSchema: { type: "object", properties: { documentId: { type: "string" }, folderId: { type: "string" } }, required: ["documentId"] }
  },
  // ── Sheets Extended ──
  {
    name: "sheets_format",
    description: "Format cells in a sheet (bold, italic, fontSize, colors, alignment, wrap, number format)",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheetId: { type: "string" },
        sheetId: { type: "number", description: "Numeric sheet ID (from sheets_info)" },
        range: { type: "object", properties: { startRowIndex: { type: "number" }, endRowIndex: { type: "number" }, startColumnIndex: { type: "number" }, endColumnIndex: { type: "number" } }, required: ["startRowIndex", "endRowIndex", "startColumnIndex", "endColumnIndex"] },
        bold: { type: "boolean" }, italic: { type: "boolean" }, fontSize: { type: "number" },
        textColor: { type: "object", properties: { red: { type: "number" }, green: { type: "number" }, blue: { type: "number" } } },
        backgroundColor: { type: "object", properties: { red: { type: "number" }, green: { type: "number" }, blue: { type: "number" } } },
        horizontalAlignment: { type: "string", enum: ["LEFT", "CENTER", "RIGHT"] },
        wrapStrategy: { type: "string", enum: ["OVERFLOW_CELL", "CLIP", "WRAP"] },
        numberFormat: { type: "object", properties: { type: { type: "string" }, pattern: { type: "string" } } }
      },
      required: ["spreadsheetId", "sheetId", "range"]
    }
  },
  {
    name: "sheets_validation",
    description: "Add data validation rules to a sheet range",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheetId: { type: "string" },
        sheetId: { type: "number" },
        range: { type: "object" },
        rule: { type: "object", description: "Sheets API DataValidationRule object" }
      },
      required: ["spreadsheetId", "range", "rule"]
    }
  },
  {
    name: "sheets_conditional_format",
    description: "Add conditional formatting rules to a sheet",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheetId: { type: "string" },
        sheetId: { type: "number" },
        ranges: { type: "array", items: { type: "object" } },
        condition: { type: "object", description: "BooleanCondition object" },
        format: { type: "object", description: "CellFormat to apply when condition is true" }
      },
      required: ["spreadsheetId", "ranges", "condition", "format"]
    }
  },
  {
    name: "sheets_chart",
    description: "Create a chart in a spreadsheet",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheetId: { type: "string" },
        sheetId: { type: "number", description: "Sheet to place chart on" },
        chartSpec: { type: "object", description: "Sheets API ChartSpec object" }
      },
      required: ["spreadsheetId", "sheetId", "chartSpec"]
    }
  },
  {
    name: "sheets_named_range",
    description: "Create a named range in a spreadsheet",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheetId: { type: "string" },
        name: { type: "string" },
        range: { type: "object", description: "GridRange object (sheetId, startRowIndex, etc.)" }
      },
      required: ["spreadsheetId", "name", "range"]
    }
  },
  // ── Drive Extended ──
  {
    name: "drive_folder",
    description: "Create a folder in Google Drive",
    inputSchema: {
      type: "object",
      properties: { name: { type: "string" }, parentId: { type: "string", description: "Parent folder ID (default: root)" } },
      required: ["name"]
    }
  },
  {
    name: "drive_move",
    description: "Move a file to a different folder",
    inputSchema: {
      type: "object",
      properties: { fileId: { type: "string" }, targetFolderId: { type: "string" } },
      required: ["fileId", "targetFolderId"]
    }
  },
  {
    name: "drive_batch_move",
    description: "Move multiple files at once",
    inputSchema: {
      type: "object",
      properties: { moves: { type: "array", items: { type: "object", properties: { fileId: { type: "string" }, targetFolderId: { type: "string" } }, required: ["fileId", "targetFolderId"] } } },
      required: ["moves"]
    }
  },
  {
    name: "drive_shortcut",
    description: "Create a shortcut to a file in Drive",
    inputSchema: {
      type: "object",
      properties: { targetFileId: { type: "string" }, name: { type: "string" }, folderId: { type: "string" } },
      required: ["targetFileId", "name"]
    }
  },
  {
    name: "drive_comments",
    description: "List comments on a Drive file",
    inputSchema: { type: "object", properties: { fileId: { type: "string" } }, required: ["fileId"] }
  },
  {
    name: "drive_add_comment",
    description: "Add a comment to a Drive file",
    inputSchema: { type: "object", properties: { fileId: { type: "string" }, content: { type: "string" } }, required: ["fileId", "content"] }
  },
  {
    name: "drive_reply_comment",
    description: "Reply to a comment on a Drive file",
    inputSchema: { type: "object", properties: { fileId: { type: "string" }, commentId: { type: "string" }, content: { type: "string" } }, required: ["fileId", "commentId", "content"] }
  },
  {
    name: "drive_resolve_comment",
    description: "Resolve a comment on a Drive file",
    inputSchema: { type: "object", properties: { fileId: { type: "string" }, commentId: { type: "string" } }, required: ["fileId", "commentId"] }
  },
  {
    name: "drive_activity",
    description: "Query Drive Activity (recent file changes, shares, edits)",
    inputSchema: {
      type: "object",
      properties: {
        itemName: { type: "string", description: "e.g. 'items/FILE_ID'" },
        ancestorName: { type: "string", description: "e.g. 'items/FOLDER_ID'" },
        filter: { type: "string" },
        pageSize: { type: "number" }
      }
    }
  },
  {
    name: "drive_extract_text",
    description: "Extract text content from a Drive file (PDF, image via OCR, or native doc)",
    inputSchema: { type: "object", properties: { fileId: { type: "string" } }, required: ["fileId"] }
  },
  {
    name: "drive_changes_token",
    description: "Get a start page token for tracking Drive changes",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "drive_changes",
    description: "List Drive changes since a page token",
    inputSchema: {
      type: "object",
      properties: { pageToken: { type: "string" }, pageSize: { type: "number" } },
      required: ["pageToken"]
    }
  },
  // ── Gemini AI ──
  {
    name: "gemini_generate",
    description: "Generate text with Gemini (simple prompt interface)",
    inputSchema: {
      type: "object",
      properties: {
        prompt: { type: "string" },
        model: { type: "string", description: "Default: gemini-2.5-flash" },
        systemInstruction: { type: "string" },
        temperature: { type: "number" },
        maxTokens: { type: "number" },
        groundingWithSearch: { type: "boolean", description: "Enable Google Search grounding" }
      },
      required: ["prompt"]
    }
  },
  {
    name: "gemini_generate_content",
    description: "Generate content with Gemini (full API — multi-turn, tools, structured output, thinking)",
    inputSchema: {
      type: "object",
      properties: {
        model: { type: "string", description: "e.g. gemini-2.5-flash, gemini-2.5-pro" },
        contents: { type: "array", description: "Array of {role, parts} objects" },
        systemInstruction: { type: "string" },
        temperature: { type: "number" }, maxOutputTokens: { type: "number" },
        topP: { type: "number" }, topK: { type: "number" },
        responseMimeType: { type: "string", description: "e.g. application/json" },
        responseSchema: { type: "object", description: "JSON schema for structured output" },
        thinkingBudget: { type: "number", description: "Thinking token budget" },
        googleSearchGrounding: { type: "boolean" },
        codeExecution: { type: "boolean" }
      },
      required: ["model", "contents"]
    }
  },
  {
    name: "gemini_analyze",
    description: "Analyze a document with Gemini using preset legal analysis types",
    inputSchema: {
      type: "object",
      properties: {
        content: { type: "string", description: "Document text to analyze" },
        analysisType: { type: "string", enum: ["summarize", "extract_entities", "classify", "extract_deadlines", "privilege_review", "risk_analysis", "contract_review", "timeline", "case_strategy", "compare"] },
        model: { type: "string" },
        customPrompt: { type: "string", description: "Override the preset prompt" }
      },
      required: ["content", "analysisType"]
    }
  },
  {
    name: "gemini_research",
    description: "Research a topic with Gemini using Google Search grounding",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string" }, model: { type: "string" }, systemInstruction: { type: "string" } },
      required: ["query"]
    }
  },
  {
    name: "gemini_embed",
    description: "Generate text embeddings with Gemini",
    inputSchema: {
      type: "object",
      properties: {
        model: { type: "string", description: "e.g. text-embedding-004" },
        content: { type: "object", description: "{parts: [{text: '...'}]}" },
        taskType: { type: "string", enum: ["RETRIEVAL_QUERY", "RETRIEVAL_DOCUMENT", "SEMANTIC_SIMILARITY", "CLASSIFICATION", "CLUSTERING"] }
      },
      required: ["model", "content"]
    }
  },
  {
    name: "gemini_batch_embed",
    description: "Generate embeddings for multiple texts in one call",
    inputSchema: {
      type: "object",
      properties: {
        model: { type: "string" },
        requests: { type: "array", items: { type: "object" }, description: "Array of {content, taskType} objects" }
      },
      required: ["model", "requests"]
    }
  },
  {
    name: "gemini_count_tokens",
    description: "Count tokens for content before sending to Gemini",
    inputSchema: {
      type: "object",
      properties: { model: { type: "string" }, contents: { type: "array" } },
      required: ["model", "contents"]
    }
  },
  {
    name: "gemini_models",
    description: "List available Gemini models",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "gemini_upload_file",
    description: "Upload a file to Gemini for analysis (images, audio, video, documents)",
    inputSchema: {
      type: "object",
      properties: { displayName: { type: "string" }, mimeType: { type: "string" }, data: { type: "string", description: "Base64-encoded file data" } },
      required: ["displayName", "mimeType", "data"]
    }
  },
  {
    name: "gemini_list_files",
    description: "List files uploaded to Gemini",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "gemini_get_file",
    description: "Get details of a file uploaded to Gemini",
    inputSchema: { type: "object", properties: { fileName: { type: "string" } }, required: ["fileName"] }
  },
  {
    name: "gemini_delete_file",
    description: "Delete a file from Gemini",
    inputSchema: { type: "object", properties: { fileName: { type: "string" } }, required: ["fileName"] }
  },
  {
    name: "gemini_cache_create",
    description: "Create a cached context for Gemini (75% cost reduction for repeated use)",
    inputSchema: {
      type: "object",
      properties: {
        model: { type: "string" },
        contents: { type: "array" },
        displayName: { type: "string" },
        ttl: { type: "string", description: "Time-to-live (e.g. '3600s')" }
      },
      required: ["model", "contents"]
    }
  },
  {
    name: "gemini_cache_list",
    description: "List Gemini cached contexts",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "gemini_cache_delete",
    description: "Delete a Gemini cached context",
    inputSchema: { type: "object", properties: { name: { type: "string" } }, required: ["name"] }
  },
  {
    name: "gemini_analyze_video",
    description: "Analyze a video with Gemini",
    inputSchema: {
      type: "object",
      properties: { videoUri: { type: "string" }, prompt: { type: "string" }, model: { type: "string" } },
      required: ["videoUri", "prompt"]
    }
  },
  // ── Vision ──
  {
    name: "vision_annotate",
    description: "Analyze an image with Cloud Vision API (labels, text, faces, objects, etc.)",
    inputSchema: {
      type: "object",
      properties: {
        imageUri: { type: "string", description: "Public URL or gs:// URI" },
        features: { type: "array", items: { type: "object", properties: { type: { type: "string", enum: ["LABEL_DETECTION", "TEXT_DETECTION", "DOCUMENT_TEXT_DETECTION", "FACE_DETECTION", "LANDMARK_DETECTION", "LOGO_DETECTION", "SAFE_SEARCH_DETECTION", "IMAGE_PROPERTIES", "OBJECT_LOCALIZATION", "WEB_DETECTION"] } } }, description: "Detection features to run" }
      },
      required: ["imageUri", "features"]
    }
  },
  {
    name: "vision_ocr",
    description: "Extract text from an image (OCR) using Cloud Vision API",
    inputSchema: { type: "object", properties: { imageUri: { type: "string" } }, required: ["imageUri"] }
  },
  // ── Apps Script ──
  {
    name: "script_list",
    description: "List all Apps Script projects (via Drive)",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "script_get",
    description: "Get an Apps Script project's source files",
    inputSchema: { type: "object", properties: { scriptId: { type: "string" } }, required: ["scriptId"] }
  },
  {
    name: "script_get_file",
    description: "Get a specific file from an Apps Script project by filename",
    inputSchema: {
      type: "object",
      properties: {
        scriptId: { type: "string" },
        fileName: { type: "string", description: "File name (e.g. 'Code', 'appsscript')" }
      },
      required: ["scriptId", "fileName"]
    }
  },
  {
    name: "script_create",
    description: "Create a new Apps Script project",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string" },
        parentId: { type: "string", description: "Drive file ID to bind to (Doc, Sheet, Form, Slides)" }
      },
      required: ["title"]
    }
  },
  {
    name: "script_update",
    description: "Update an Apps Script project's source files",
    inputSchema: {
      type: "object",
      properties: {
        scriptId: { type: "string" },
        files: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              type: { type: "string", enum: ["SERVER_JS", "HTML", "JSON"], description: "SERVER_JS for .gs, HTML for .html, JSON for appsscript.json" },
              source: { type: "string" }
            },
            required: ["name", "type", "source"]
          },
          description: "Array of {name, type, source} file objects"
        }
      },
      required: ["scriptId", "files"]
    }
  },
  {
    name: "script_run",
    description: "Execute a function in an Apps Script project. devMode=true (default) runs the HEAD deployment — use this unless you need a specific published version.",
    inputSchema: {
      type: "object",
      properties: {
        scriptId: { type: "string" },
        functionName: { type: "string" },
        parameters: { type: "array", description: "Function arguments" },
        devMode: { type: "boolean", description: "Run HEAD deployment (default true). Set false to run the published execution API deployment." }
      },
      required: ["scriptId", "functionName"]
    }
  },
  {
    name: "script_versions",
    description: "List all versions of an Apps Script project",
    inputSchema: { type: "object", properties: { scriptId: { type: "string" } }, required: ["scriptId"] }
  },
  {
    name: "script_version_get",
    description: "Get a specific version of an Apps Script project",
    inputSchema: {
      type: "object",
      properties: { scriptId: { type: "string" }, versionNumber: { type: "number" } },
      required: ["scriptId", "versionNumber"]
    }
  },
  {
    name: "script_version_create",
    description: "Create a new version (snapshot) of an Apps Script project",
    inputSchema: {
      type: "object",
      properties: { scriptId: { type: "string" }, description: { type: "string" } },
      required: ["scriptId"]
    }
  },
  {
    name: "script_deployments",
    description: "List deployments for an Apps Script project",
    inputSchema: { type: "object", properties: { scriptId: { type: "string" } }, required: ["scriptId"] }
  },
  {
    name: "script_deploy",
    description: "Create a new deployment of an Apps Script project",
    inputSchema: {
      type: "object",
      properties: {
        scriptId: { type: "string" },
        versionNumber: { type: "number" },
        description: { type: "string" }
      },
      required: ["scriptId", "versionNumber"]
    }
  },
  {
    name: "script_deploy_update",
    description: "Update an existing deployment to point to a different version",
    inputSchema: {
      type: "object",
      properties: {
        scriptId: { type: "string" },
        deploymentId: { type: "string" },
        versionNumber: { type: "number" },
        description: { type: "string" }
      },
      required: ["scriptId", "deploymentId", "versionNumber"]
    }
  },
  {
    name: "script_deploy_delete",
    description: "Delete a deployment",
    inputSchema: {
      type: "object",
      properties: { scriptId: { type: "string" }, deploymentId: { type: "string" } },
      required: ["scriptId", "deploymentId"]
    }
  },
  {
    name: "script_delete",
    description: "Delete an Apps Script project (moves to trash)",
    inputSchema: { type: "object", properties: { scriptId: { type: "string" } }, required: ["scriptId"] }
  },
  {
    name: "script_metrics",
    description: "Get execution metrics for an Apps Script project",
    inputSchema: { type: "object", properties: { scriptId: { type: "string" } }, required: ["scriptId"] }
  },
  {
    name: "script_processes",
    description: "List recent script execution processes",
    inputSchema: { type: "object", properties: {} }
  },
  // ── Search ──
  {
    name: "web_search",
    description: "Google Custom Search (requires GOOGLE_CLOUD_API_KEY + PSE engine)",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" },
        num: { type: "number", description: "Number of results (1-10)" },
        siteRestrict: { type: "string", description: "Restrict to a domain" }
      },
      required: ["query"]
    }
  },
  // ── Status ──
  {
    name: "gws_status",
    description: "Check Google Workspace auth status and available scopes",
    inputSchema: { type: "object", properties: {} }
  }
];
var GROUPED_TOOLS = [
  {
    name: "drive",
    description: `Google Drive file management.

Actions: search, list, get, create, copy, share, get_link, export, delete, update, metadata, permissions, about, download, revisions, folder, move, batch_move, shortcut, comments, add_comment, reply_comment, resolve_comment, activity, extract_text, changes_token, changes, labels, get_label, create_label, apply_label, file_labels, remove_label

Common params by action:
- search: query (required), maxResults, driveId, folderId
- list: folderId, maxResults, orderBy, includeSubfolders
- get: fileId (required) — returns file content/text
- create: name (required), content, mimeType, folderId
- copy: fileId (required), name, folderId
- share: fileId (required), email (required), role (reader/writer/commenter)
- export: fileId (required), mimeType (e.g. application/pdf)
- delete: fileId (required) — PERMANENT, cannot undo
- update: fileId (required), name, description, starred, addParents, removeParents
- metadata: fileId (required) — full metadata (permissions, checksums, owners)
- permissions: fileId (required) — list permissions
- about: (no params) — storage quota and user info
- download: fileId (required) — get download URL
- revisions: fileId (required), pageSize
- folder: name (required), parentId
- move: fileId (required), targetFolderId (required)
- batch_move: moves (array of {fileId, targetFolderId})
- shortcut: targetFileId (required), name (required), folderId
- comments: fileId (required) — list comments
- add_comment: fileId (required), content (required)
- reply_comment: fileId (required), commentId (required), content (required)
- resolve_comment: fileId (required), commentId (required)
- activity: itemName, ancestorName, filter, pageSize
- extract_text: fileId (required) — OCR/text extraction
- changes_token: (no params) — get start token for change tracking
- changes: pageToken (required), pageSize
- labels: (no params) — list all Drive Labels in the domain
- get_label: labelId (required) — get a Drive Label by ID
- create_label: name (required), labelType (ADMIN/SHARED), fields (object)
- apply_label: fileId (required), labelId (required), fields (object of field values)
- file_labels: fileId (required) — list labels applied to a file
- remove_label: fileId (required), labelId (required) — remove label from file`,
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["search", "list", "get", "create", "copy", "share", "get_link", "export", "delete", "update", "metadata", "permissions", "about", "download", "revisions", "folder", "move", "batch_move", "shortcut", "comments", "add_comment", "reply_comment", "resolve_comment", "activity", "extract_text", "changes_token", "changes", "labels", "get_label", "create_label", "apply_label", "file_labels", "remove_label"] },
        fileId: { type: "string" }, query: { type: "string" }, name: { type: "string" },
        content: { type: "string" }, mimeType: { type: "string" }, folderId: { type: "string" },
        maxResults: { type: "number" }, email: { type: "string" }, role: { type: "string" },
        description: { type: "string" }, starred: { type: "boolean" },
        addParents: { type: "string" }, removeParents: { type: "string" },
        targetFolderId: { type: "string" }, targetFileId: { type: "string" },
        commentId: { type: "string" }, pageToken: { type: "string" }, pageSize: { type: "number" },
        moves: { type: "array" }, orderBy: { type: "string" }, driveId: { type: "string" },
        itemName: { type: "string" }, ancestorName: { type: "string" }, filter: { type: "string" },
        includeSubfolders: { type: "boolean" },
        labelId: { type: "string" }, labelType: { type: "string" }, fields: { type: "object" }
      },
      required: ["action"]
    }
  },
  {
    name: "gmail",
    description: `Gmail email management.

Actions: search, get, send, draft, get_thread, modify_labels, list_labels, get_attachment, create_filter, list_filters, manage_label, profile, trash, untrash, delete, batch_modify, batch_delete, list_drafts, delete_draft, history, thread_trash, thread_untrash, vacation, get_vacation, send_as, delegates, add_delegate, remove_delegate

Common params by action:
- search: query (required, Gmail syntax: from: to: subject: has:attachment label: is:unread after: before:), maxResults
- get: messageId (required), format (full/metadata/minimal)
- send: to (required), subject (required), body (required), cc, bcc
- draft: to (required), subject (required), body (required), cc, isHtml
- get_thread: threadId (required)
- modify_labels: messageId (required), addLabels (array), removeLabels (array)
- list_labels: (no params)
- get_attachment: messageId (required), attachmentId (required)
- create_filter: criteria (object), actions (object)
- manage_label: action (create/update/delete), name, labelId
- profile: (no params) — email, messagesTotal, historyId
- trash/untrash: messageId (required)
- delete: messageId (required) — PERMANENT
- batch_modify: messageIds (array), addLabels, removeLabels
- batch_delete: messageIds (array) — PERMANENT
- list_drafts: maxResults
- delete_draft: draftId (required)
- history: startHistoryId (required), labelId, historyTypes, maxResults
- thread_trash/thread_untrash: threadId (required)
- vacation: enabled (bool, required), responseSubject, responseBody, startTime, endTime — set vacation auto-reply
- get_vacation: (no params) — get current vacation settings
- send_as: (no params) — list all send-as aliases
- delegates: (no params) — list email delegates
- add_delegate: email (required) — add delegate
- remove_delegate: email (required) — remove delegate`,
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["search", "get", "send", "draft", "get_thread", "modify_labels", "list_labels", "get_attachment", "create_filter", "list_filters", "manage_label", "profile", "trash", "untrash", "delete", "batch_modify", "batch_delete", "list_drafts", "delete_draft", "history", "thread_trash", "thread_untrash", "vacation", "get_vacation", "send_as", "delegates", "add_delegate", "remove_delegate"] },
        query: { type: "string" }, messageId: { type: "string" }, threadId: { type: "string" },
        to: { type: "string" }, subject: { type: "string" }, body: { type: "string" },
        cc: { type: "string" }, bcc: { type: "string" }, isHtml: { type: "boolean" },
        format: { type: "string" }, attachmentId: { type: "string" },
        addLabels: { type: "array", items: { type: "string" } },
        removeLabels: { type: "array", items: { type: "string" } },
        messageIds: { type: "array", items: { type: "string" } },
        criteria: { type: "object" }, actions: { type: "object" },
        name: { type: "string" }, labelId: { type: "string" },
        maxResults: { type: "number" }, draftId: { type: "string" },
        startHistoryId: { type: "string" }, historyTypes: { type: "array" },
        enabled: { type: "boolean" }, responseSubject: { type: "string" },
        responseBody: { type: "string" }, startTime: { type: "string" },
        endTime: { type: "string" }, email: { type: "string" }
      },
      required: ["action"]
    }
  },
  {
    name: "sheets",
    description: `Google Sheets spreadsheet operations.

Actions: read, write, batch_get, batch_update, batch_clear, batch_request, add_sheet, copy_to, list, create, info, format, validation, conditional_format, chart, named_range

Common params by action:
- read: spreadsheetId + range_a1 (required, A1 string like 'Sheet1!A1:D10'), majorDimension (ROWS/COLUMNS), valueRenderOption (FORMATTED_VALUE/UNFORMATTED_VALUE/FORMULA), dateTimeRenderOption
- write: spreadsheetId + range_a1 (required, A1 string), values (array of arrays), mode (write/append/clear), valueInputOption (RAW/USER_ENTERED)
- batch_get: spreadsheetId + ranges (array of A1 strings, required), majorDimension, valueRenderOption
- batch_update: spreadsheetId + data (array of {range, values}, required), valueInputOption
- batch_clear: spreadsheetId + ranges (array of A1 strings, required)
- batch_request: spreadsheetId + requests (array of batchUpdate request objects) — format, merge, charts, etc.
- add_sheet: spreadsheetId + title (required), index
- copy_to: spreadsheetId + sheetId (number) + destinationSpreadsheetId (required)
- list: maxResults — list all spreadsheets
- create: title (required), sheetTitles (array)
- info: spreadsheetId (required), ranges, includeGridData, fields. spreadsheetId is also a Drive fileId, but use sheets.info for sheet structure, drive.get for raw export.
- format: spreadsheetId + sheetId + range_grid ({startRowIndex, endRowIndex, startColumnIndex, endColumnIndex}), bold, italic, fontSize, textColor, backgroundColor, horizontalAlignment, wrapStrategy, numberFormat
- validation: spreadsheetId + range_grid + rule (required)
- conditional_format: spreadsheetId + ranges (grid objects) + condition + format (required)
- chart: spreadsheetId + sheetId + chartSpec (required)
- named_range: spreadsheetId + name + range_grid (required)

Range parameter convention:
- range_a1 (string, A1 notation) → read, write, batch_clear (single range), batch_get (single)
- range_grid (object GridRange) → format, conditional_format, validation, named_range
- Legacy 'range' alias still accepted: maps to range_a1 for read/write, range_grid for format/validation/named_range.`,
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["read", "write", "batch_get", "batch_update", "batch_clear", "batch_request", "add_sheet", "copy_to", "list", "create", "info", "format", "validation", "conditional_format", "chart", "named_range"] },
        spreadsheetId: { type: "string" },
        range_a1: { type: "string", description: "A1 notation 'Sheet1!A1:D10' (for read/write/batch_clear/batch_get actions)" },
        range_grid: { type: "object", description: "GridRange {startRowIndex, endRowIndex, startColumnIndex, endColumnIndex} (for format/conditional_format/named_range/validation actions)" },
        range: { type: ["string", "object"], description: "DEPRECATED — use range_a1 (string) or range_grid (object) instead. Still accepted for backward compatibility." },
        ranges: { type: "array" },
        values: { type: "array" }, data: { type: "array" }, requests: { type: "array" },
        title: { type: "string" }, sheetTitles: { type: "array" }, sheetId: { type: "number" },
        destinationSpreadsheetId: { type: "string" }, index: { type: "number" },
        mode: { type: "string" }, valueInputOption: { type: "string" },
        majorDimension: { type: "string" }, valueRenderOption: { type: "string" },
        dateTimeRenderOption: { type: "string" }, maxResults: { type: "number" },
        includeGridData: { type: "boolean" }, fields: { type: "string" },
        bold: { type: "boolean" }, italic: { type: "boolean" }, fontSize: { type: "number" },
        textColor: { type: "object" }, backgroundColor: { type: "object" },
        horizontalAlignment: { type: "string" }, wrapStrategy: { type: "string" },
        numberFormat: { type: "object" }, rule: { type: "object" },
        condition: { type: "object" }, format: { type: "object" },
        chartSpec: { type: "object" }, name: { type: "string" }
      },
      required: ["action"]
    }
  },
  {
    name: "calendar",
    description: `Google Calendar event management.

Actions: list, events, get_event, create, update, delete, freebusy, quick_add, move, instances, settings

- list: (no params) — list all calendars
- events: calendarId, timeMin, timeMax, maxResults, query
- get_event: eventId (required), calendarId
- create: summary, start, end (required), description, attendees, allDay, calendarId
- update: eventId (required), calendarId, summary, start, end, description
- delete: eventId (required), calendarId
- freebusy: timeMin + timeMax + calendarIds (required)
- quick_add: text (required, natural language e.g. "Lunch tomorrow at noon"), calendarId
- move: eventId + destinationCalendarId (required), calendarId
- instances: eventId (required), calendarId — recurring event instances
- settings: (no params) — timezone, locale`,
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["list", "events", "get_event", "create", "update", "delete", "freebusy", "quick_add", "move", "instances", "settings"] },
        calendarId: { type: "string" }, eventId: { type: "string" },
        summary: { type: "string" }, description: { type: "string" },
        start: { type: "string" }, end: { type: "string" }, allDay: { type: "boolean" },
        attendees: { type: "array" }, timeMin: { type: "string" }, timeMax: { type: "string" },
        maxResults: { type: "number" }, query: { type: "string" }, text: { type: "string" },
        destinationCalendarId: { type: "string" }, calendarIds: { type: "array" }
      },
      required: ["action"]
    }
  },
  {
    name: "docs",
    description: `Google Docs document operations.

Actions: get, create, modify, find_replace, comments, add_comment, reply_comment, resolve_comment, insert_image, insert_elements, headers_footers, structure, export_pdf

- get: documentId (required) — Google Doc ID (also a Drive fileId, but use docs.get for doc structure, drive.get for raw export).
- create: title (required), content — returns documentId (also usable as Drive fileId).
- modify: documentId (required), operations (array of batchUpdate requests) — documentId is also a Drive fileId; use docs.modify for content, drive.update for metadata.
- find_replace: documentId + find + replace (required), matchCase
- comments: fileId (required) — list comments
- add_comment: fileId + content (required)
- reply_comment: fileId + commentId + content (required)
- resolve_comment: fileId + commentId (required)
- insert_image: documentId + imageUri + index (required), width, height
- insert_elements: documentId + elements (array of {type, index, rows, columns})
- headers_footers: documentId (required), header ({text}), footer ({text})
- structure: documentId (required) — inspect paragraphs, tables, sections with indices
- export_pdf: documentId (required), folderId`,
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["get", "create", "modify", "find_replace", "comments", "add_comment", "reply_comment", "resolve_comment", "insert_image", "insert_elements", "headers_footers", "structure", "export_pdf"] },
        documentId: { type: "string" }, fileId: { type: "string" }, title: { type: "string" },
        content: { type: "string" }, operations: { type: "array" },
        find: { type: "string" }, replace: { type: "string" }, matchCase: { type: "boolean" },
        commentId: { type: "string" }, imageUri: { type: "string" }, index: { type: "number" },
        width: { type: "number" }, height: { type: "number" },
        elements: { type: "array" }, header: { type: "object" }, footer: { type: "object" },
        folderId: { type: "string" }, maxResults: { type: "number" }
      },
      required: ["action"]
    }
  },
  {
    name: "tasks",
    description: `Google Tasks management.

Actions: list_lists, list, get, create, update, delete, move, create_list, delete_list, clear_completed

- list_lists: (no params)
- list: taskListId (required), showCompleted, showHidden, maxResults
- get: taskListId + taskId (required)
- create: taskListId + title (required), notes, due (ISO date), parent (subtask)
- update: taskListId + taskId (required), title, notes, status (needsAction/completed), due
- delete: taskListId + taskId (required)
- move: taskListId + taskId (required), parent, previous
- create_list: title (required)
- delete_list: taskListId (required)
- clear_completed: taskListId (required)`,
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["list_lists", "list", "get", "create", "update", "delete", "move", "create_list", "delete_list", "clear_completed"] },
        taskListId: { type: "string" }, taskId: { type: "string" },
        title: { type: "string" }, notes: { type: "string" }, due: { type: "string" },
        parent: { type: "string" }, previous: { type: "string" },
        status: { type: "string" }, showCompleted: { type: "boolean" },
        showHidden: { type: "boolean" }, maxResults: { type: "number" }
      },
      required: ["action"]
    }
  },
  {
    name: "contacts",
    description: `Google Contacts (People API).

Actions: search, list, get, create, update, delete

- search: query (required), maxResults
- list: pageSize, pageToken
- get: resourceName (required, e.g. 'people/c123456')
- create: givenName (required), familyName, email, phone, organization, jobTitle
- update: resourceName (required), givenName, familyName, email, phone
- delete: resourceName (required)`,
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["search", "list", "get", "create", "update", "delete"] },
        query: { type: "string" }, resourceName: { type: "string" },
        givenName: { type: "string" }, familyName: { type: "string" },
        email: { type: "string" }, phone: { type: "string" },
        organization: { type: "string" }, jobTitle: { type: "string" },
        maxResults: { type: "number" }, pageSize: { type: "number" }, pageToken: { type: "string" }
      },
      required: ["action"]
    }
  },
  {
    name: "slides",
    description: `Google Slides presentations.

Actions: create, get, batch_update, get_page, get_thumbnail

- create: title (required) — returns presentationId (also usable as Drive fileId).
- get: presentationId (required) — Slides presentation ID (also a Drive fileId, but use slides.get for slide structure, drive.get for raw export).
- batch_update: presentationId + requests (required)
- get_page: presentationId + pageObjectId (required)
- get_thumbnail: presentationId + pageObjectId (required)`,
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["create", "get", "batch_update", "get_page", "get_thumbnail"] },
        presentationId: { type: "string" }, title: { type: "string" },
        requests: { type: "array" }, pageObjectId: { type: "string" }
      },
      required: ["action"]
    }
  },
  {
    name: "forms",
    description: `Google Forms.

Actions: get, responses, create, batch_update

- get: formId (required)
- responses: formId (required), pageSize
- create: title (required), documentTitle
- batch_update: formId + requests (required)`,
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["get", "responses", "create", "batch_update"] },
        formId: { type: "string" }, title: { type: "string" }, documentTitle: { type: "string" },
        requests: { type: "array" }, pageSize: { type: "number" }
      },
      required: ["action"]
    }
  },
  {
    name: "chat",
    description: `Google Chat spaces and messaging.

Actions: list_spaces, get_messages, send

- list_spaces: (no params)
- get_messages: spaceName (required, e.g. 'spaces/XXXXXX'), pageSize
- send: spaceName + text (required)`,
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["list_spaces", "get_messages", "send"] },
        spaceName: { type: "string" }, text: { type: "string" }, pageSize: { type: "number" }
      },
      required: ["action"]
    }
  },
  {
    name: "script",
    description: `Google Apps Script project management — full lifecycle: create, edit, run, deploy, manage manifests and files.

Actions: list, get, get_info, get_file, create, update, add_file, delete_file, delete, run, run_batch, versions, version_get, version_create, deployments, deploy, deploy_update, deploy_delete, metrics, processes, manifest, set_manifest, add_scope, trigger_code

Project CRUD:
- list: (no params) — list all script projects in Drive
- get: scriptId (required) — get ALL source files (name, type, source)
- get_info: scriptId (required) — project metadata only (title, parentId, createTime, updateTime)
- get_file: scriptId + fileName (required) — get one file by name
- create: title (required), parentId (optional — bind to Doc/Sheet/Form/Slides)
- update: scriptId + files (required — array of {name, type: SERVER_JS|HTML|JSON, source}) — REPLACES all files
- add_file: scriptId + name + source (required), type (SERVER_JS/HTML/JSON, default SERVER_JS) — adds or replaces ONE file, leaves others unchanged
- delete_file: scriptId + fileName (required) — removes one file, leaves others unchanged
- delete: scriptId (required) — moves project to trash

Execution:
- run: scriptId + functionName (required), parameters (array), devMode (default true) — execute a function. devMode=true runs HEAD deployment without requiring a published Execution API deployment.
- run_batch: scriptId + calls (required — array of {functionName, parameters, stopOnError}), devMode — run multiple functions sequentially, collect results

Versions & Deployments:
- versions: scriptId (required) — list all versions
- version_get: scriptId + versionNumber (required)
- version_create: scriptId (required), description — snapshot current HEAD as a new version
- deployments: scriptId (required) — list all deployments with their URLs
- deploy: scriptId + versionNumber (required), description — create new deployment (Web App / Execution API / Add-on)
- deploy_update: scriptId + deploymentId + versionNumber (required), description
- deploy_delete: scriptId + deploymentId (required)

Manifest & Scopes:
- manifest: scriptId (required) — get parsed appsscript.json manifest object
- set_manifest: scriptId + manifest (required object), merge (default true — merges with existing instead of replacing)
- add_scope: scriptId + scope (required — OAuth scope URL, e.g. 'https://www.googleapis.com/auth/calendar') — adds scope to oauthScopes without touching rest of manifest

Trigger Code (Apps Script restriction — triggers CANNOT be created via the Execution API, they must be installed from the editor):
- trigger_code: triggerType (required: time|calendar|spreadsheet_open|spreadsheet_edit|form_submit) + functionName (required), minuteInterval, calendarId, spreadsheetId — generates ready-to-paste trigger installation code

Observability:
- metrics: scriptId (required) — execution count, failure count by deployment
- processes: (no params) — recent script execution history`,
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["list", "get", "get_info", "get_file", "create", "update", "add_file", "delete_file", "delete", "run", "run_batch", "versions", "version_get", "version_create", "deployments", "deploy", "deploy_update", "deploy_delete", "metrics", "processes", "manifest", "set_manifest", "add_scope", "trigger_code"] },
        scriptId: { type: "string" }, title: { type: "string" }, parentId: { type: "string" },
        fileName: { type: "string" }, functionName: { type: "string" },
        files: { type: "array" }, parameters: { type: "array" },
        calls: { type: "array", description: "For run_batch: array of {functionName, parameters, stopOnError}" },
        devMode: { type: "boolean", description: "Run HEAD deployment (default true). Set false to require a published Execution API deployment." },
        versionNumber: { type: "number" }, deploymentId: { type: "string" },
        description: { type: "string" }, source: { type: "string" },
        type: { type: "string", enum: ["SERVER_JS", "HTML", "JSON"], description: "File type for add_file (default: SERVER_JS)" },
        manifest: { type: "object", description: "appsscript.json manifest object for set_manifest" },
        merge: { type: "boolean", description: "For set_manifest: merge with existing manifest (default true)" },
        scope: { type: "string", description: "OAuth scope URL for add_scope" },
        triggerType: { type: "string", enum: ["time", "calendar", "spreadsheet_open", "spreadsheet_edit", "form_submit"], description: "Trigger type for trigger_code" },
        minuteInterval: { type: "number", description: "For time triggers: interval in minutes" },
        calendarId: { type: "string", description: "For calendar triggers" },
        spreadsheetId: { type: "string", description: "For spreadsheet triggers" }
      },
      required: ["action"]
    }
  },
  {
    name: "gemini",
    description: `Gemini AI text generation, embeddings, analysis, and file management.

Actions: generate, generate_content, analyze, research, embed, batch_embed, count_tokens, models, upload_file, list_files, get_file, delete_file, cache_create, cache_list, cache_delete, analyze_video

- generate: prompt (required), model (default: gemini-2.5-flash), systemInstruction, temperature, maxTokens, groundingWithSearch
- generate_content: model + contents (required, array of {role, parts}), systemInstruction, temperature, maxOutputTokens, topP, topK, responseMimeType, responseSchema, thinkingBudget, googleSearchGrounding, codeExecution
- analyze: content + analysisType (required: summarize/extract_entities/classify/extract_deadlines/privilege_review/risk_analysis/contract_review/timeline/case_strategy/compare), model, customPrompt
- research: query (required), model, systemInstruction — uses Google Search grounding
- embed: model + content (required), taskType (RETRIEVAL_QUERY/RETRIEVAL_DOCUMENT/SEMANTIC_SIMILARITY/CLASSIFICATION/CLUSTERING)
- batch_embed: model + requests (required)
- count_tokens: model + contents (required)
- models: (no params) — list available models
- upload_file: displayName + mimeType + data (base64, required)
- list_files/get_file/delete_file: fileName
- cache_create: model + contents (required), displayName, ttl (e.g. '3600s') — 75% cost reduction
- cache_list/cache_delete: name
- analyze_video: videoUri + prompt (required), model`,
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["generate", "generate_content", "analyze", "research", "embed", "batch_embed", "count_tokens", "models", "upload_file", "list_files", "get_file", "delete_file", "cache_create", "cache_list", "cache_delete", "analyze_video"] },
        prompt: { type: "string" }, model: { type: "string" }, contents: { type: "array" },
        content: { type: "string" }, systemInstruction: { type: "string" },
        temperature: { type: "number" }, maxTokens: { type: "number" },
        maxOutputTokens: { type: "number" }, topP: { type: "number" }, topK: { type: "number" },
        groundingWithSearch: { type: "boolean" }, codeExecution: { type: "boolean" },
        responseMimeType: { type: "string" }, responseSchema: { type: "object" },
        thinkingBudget: { type: "number" }, analysisType: { type: "string" },
        customPrompt: { type: "string" }, query: { type: "string" }, taskType: { type: "string" },
        requests: { type: "array" }, displayName: { type: "string" }, mimeType: { type: "string" },
        data: { type: "string" }, fileName: { type: "string" }, name: { type: "string" },
        ttl: { type: "string" }, videoUri: { type: "string" }
      },
      required: ["action"]
    }
  },
  {
    name: "vision",
    description: `Google Cloud Vision API for image analysis.

Actions: annotate, ocr

- annotate: imageUri (required), features (array of {type: LABEL_DETECTION/TEXT_DETECTION/DOCUMENT_TEXT_DETECTION/FACE_DETECTION/LANDMARK_DETECTION/LOGO_DETECTION/SAFE_SEARCH_DETECTION/IMAGE_PROPERTIES/OBJECT_LOCALIZATION/WEB_DETECTION})
- ocr: imageUri (required) — shortcut for text extraction`,
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["annotate", "ocr"] },
        imageUri: { type: "string" },
        features: { type: "array", items: { type: "object" } }
      },
      required: ["action"]
    }
  },
  {
    name: "web_search",
    description: "Google Custom Search",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" }, num: { type: "number" }, siteRestrict: { type: "string" }
      },
      required: ["query"]
    }
  },
  {
    name: "gws_status",
    description: "Check Google Workspace auth status",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "meet",
    description: `Google Meet conference management.

Actions: create, get, update, end, conferences, participants, recordings, transcripts, transcript_entries

- create: (no required params) config (object: accessType TRUSTED/OPEN/RESTRICTED, entryPointAccess ALL/CREATOR_APP_ONLY)
- get: spaceName (required, e.g. "spaces/abc123")
- update: spaceName (required), config (object)
- end: spaceName (required) — end active conference
- conferences: filter (optional, e.g. "space.name = 'spaces/abc'") — list conference records
- participants: conferenceRecord (required, e.g. "conferenceRecords/abc") — list participants
- recordings: conferenceRecord (required) — list recordings
- transcripts: conferenceRecord (required) — list transcripts
- transcript_entries: transcript (required, e.g. "conferenceRecords/x/transcripts/y") — get transcript text`,
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["create", "get", "update", "end", "conferences", "participants", "recordings", "transcripts", "transcript_entries"] },
        spaceName: { type: "string" },
        config: { type: "object" },
        filter: { type: "string" },
        conferenceRecord: { type: "string" },
        transcript: { type: "string" }
      },
      required: ["action"]
    }
  }
];
async function callTool(name, args, gws, env2) {
  // Normalize sheets range parameters: range_a1 (string) and range_grid (object)
  // map to legacy `args.range` based on the action. Preserves backward compatibility
  // for callers that still pass `range` directly.
  if (name && name.startsWith("sheets_")) {
    const a1Actions = new Set(["sheets_read", "sheets_write", "sheets_batch_clear", "sheets_batch_get"]);
    const gridActions = new Set(["sheets_format", "sheets_validation", "sheets_conditional_format", "sheets_named_range"]);
    if (args.range_a1 != null && args.range == null && a1Actions.has(name)) {
      args.range = args.range_a1;
    } else if (args.range_grid != null && args.range == null && gridActions.has(name)) {
      args.range = args.range_grid;
    }
  }
  switch (name) {
    // Drive
    case "drive_search":
      return gws.searchDriveFiles(args.query, args.maxResults ?? 20, {
        orderBy: args.orderBy,
        includeShared: !!args.driveId
      });
    case "drive_list":
      return gws.listDriveItems(args.folderId ?? "root", args.maxResults ?? 50, {
        orderBy: args.orderBy,
        includeShared: args.includeSubfolders
      });
    case "drive_get":
      return gws.getDriveFileContent(args.fileId);
    case "drive_create":
      return gws.createDriveFile(args.name, args.content, args.mimeType, args.folderId);
    case "drive_copy":
      return gws.copyDriveFile(args.fileId, args.name, args.folderId);
    case "drive_share":
      return gws.shareDriveFile(args.fileId, args.email, args.role ?? "reader");
    case "drive_get_link":
      return gws.getShareableLink(args.fileId);
    case "drive_export": {
      const resp = await gws.exportDriveFile(args.fileId, args.mimeType);
      if (args.mimeType?.startsWith("text")) return { content: await resp.text() };
      return { status: resp.status, contentType: resp.headers.get("content-type"), note: "binary content not returned in MCP response" };
    }
    // Gmail
    case "gmail_search":
      return gws.searchGmailMessages(args.query, args.maxResults);
    case "gmail_get":
      return gws.getGmailMessage(args.messageId, args.format);
    case "gmail_send":
      return gws.sendGmailMessage(args.to, args.subject, args.body, {
        cc: args.cc,
        bcc: args.bcc,
        htmlBody: args.isHtml ? args.body : void 0
      });
    case "gmail_draft":
      return gws.draftGmailMessage(args.to, args.subject, args.body, {
        cc: args.cc,
        htmlBody: args.isHtml ? args.body : void 0
      });
    case "gmail_get_thread":
      return gws.getGmailThread(args.threadId);
    case "gmail_modify_labels":
      return gws.modifyGmailLabels(args.messageId, args.addLabels, args.removeLabels);
    case "gmail_list_labels":
      return gws.listGmailLabels();
    case "gmail_get_attachment":
      return gws.getGmailAttachment(args.messageId, args.attachmentId);
    case "gmail_create_filter":
      return gws.createGmailFilter(args.criteria, args.actions);
    case "gmail_list_filters":
      return gws.listGmailFilters();
    case "gmail_manage_label":
      return gws.manageGmailLabel(args.action, {
        name: args.name,
        id: args.labelId
      });
    // Calendar
    case "calendar_list":
      return gws.listCalendars();
    case "calendar_events":
      return gws.getCalendarEvents(args.calendarId ?? "primary", {
        timeMin: args.timeMin,
        timeMax: args.timeMax,
        maxResults: args.maxResults,
        singleEvents: args.singleEvents
      });
    case "calendar_create": {
      const start = args.allDay ? { date: args.start.split("T")[0] } : { dateTime: args.start, timeZone: "UTC" };
      const end = args.allDay ? { date: args.end.split("T")[0] } : { dateTime: args.end, timeZone: "UTC" };
      return gws.createCalendarEvent(args.calendarId ?? "primary", {
        summary: args.summary,
        description: args.description,
        start,
        end,
        attendees: args.attendees?.map((e) => ({ email: e }))
      });
    }
    case "calendar_update":
      return gws.modifyCalendarEvent(
        args.calendarId ?? "primary",
        args.eventId,
        {
          summary: args.summary,
          description: args.description,
          start: args.start ? { dateTime: args.start, timeZone: "UTC" } : void 0,
          end: args.end ? { dateTime: args.end, timeZone: "UTC" } : void 0
        }
      );
    case "calendar_delete":
      return gws.deleteCalendarEvent(args.calendarId ?? "primary", args.eventId);
    case "calendar_freebusy": {
      const calIds = args.calendarIds ?? args.calendars ?? ["primary"];
      return gws.queryFreebusy(args.timeMin, args.timeMax, Array.isArray(calIds) ? calIds : [calIds]);
    }
    // Docs
    case "docs_get":
      return gws.getDocContent(args.documentId);
    case "docs_create":
      return gws.createDoc(args.title, args.content);
    case "docs_modify":
      return gws.modifyDocText(args.documentId, args.operations);
    case "docs_find_replace":
      return gws.findAndReplaceDoc(args.documentId, args.find, args.replace, args.matchCase);
    // Sheets
    case "sheets_read":
      return gws.readSheetValues(args.spreadsheetId, args.range, {
        majorDimension: args.majorDimension,
        valueRenderOption: args.valueRenderOption,
        dateTimeRenderOption: args.dateTimeRenderOption
      });
    case "sheets_write":
      return gws.modifySheetValues(args.spreadsheetId, args.range, args.values, {
        valueInputOption: args.valueInputOption ?? "USER_ENTERED",
        mode: args.mode
      });
    case "sheets_batch_get":
      return gws.batchGetSheetValues(args.spreadsheetId, args.ranges, {
        majorDimension: args.majorDimension,
        valueRenderOption: args.valueRenderOption,
        dateTimeRenderOption: args.dateTimeRenderOption
      });
    case "sheets_batch_update":
      return gws.batchUpdateSheetValues(args.spreadsheetId, args.data, args.valueInputOption);
    case "sheets_batch_clear":
      return gws.batchClearSheetValues(args.spreadsheetId, args.ranges);
    case "sheets_batch_request":
      return gws.batchUpdateSpreadsheet(args.spreadsheetId, args.requests);
    case "sheets_add_sheet":
      return gws.createSheet(args.spreadsheetId, args.title, args.index);
    case "sheets_copy_to":
      return gws.copySheetTo(args.spreadsheetId, args.sheetId, args.destinationSpreadsheetId);
    case "sheets_list":
      return gws.listSpreadsheets(args.maxResults);
    case "sheets_create":
      return gws.createSpreadsheet(args.title, args.sheetTitles);
    case "sheets_info":
      return gws.getSpreadsheetInfo(args.spreadsheetId, {
        ranges: args.ranges,
        includeGridData: args.includeGridData,
        fields: args.fields
      });
    // Tasks
    case "tasks_list_lists":
      return gws.listTaskLists();
    case "tasks_list":
      return gws.listTasks(args.taskListId, {
        showCompleted: args.showCompleted,
        showHidden: args.showHidden,
        maxResults: args.maxResults
      });
    case "tasks_create":
      return gws.createTask(args.taskListId, {
        title: args.title,
        notes: args.notes,
        due: args.due,
        parent: args.parent
      });
    case "tasks_update":
      return gws.updateTask(args.taskListId, args.taskId, {
        title: args.title,
        notes: args.notes,
        status: args.status,
        due: args.due
      });
    case "tasks_delete":
      return gws.deleteTask(args.taskListId, args.taskId);
    case "tasks_create_list":
      return gws.createTaskList(args.title);
    // Contacts
    case "contacts_search":
      return gws.searchContacts(args.query, args.maxResults);
    case "contacts_list":
      return gws.listContacts(args.pageSize, args.pageToken);
    // Chat
    case "chat_list_spaces":
      return gws.listChatSpaces();
    case "chat_get_messages":
      return gws.getChatMessages(args.spaceName, args.pageSize);
    case "chat_send":
      return gws.sendChatMessage(args.spaceName, args.text);
    // Forms
    case "forms_get":
      return gws.getForm(args.formId);
    case "forms_responses":
      return gws.listFormResponses(args.formId, args.pageSize);
    case "forms_create":
      return gws.createForm(args.title, args.documentTitle);
    case "forms_batch_update":
      return gws.batchUpdateForm(args.formId, args.requests);
    // Gmail Extended
    case "gmail_profile":
      return gws.getGmailProfile();
    case "gmail_trash":
      return gws.trashGmailMessage(args.messageId);
    case "gmail_untrash":
      return gws.untrashGmailMessage(args.messageId);
    case "gmail_delete":
      return gws.deleteGmailMessage(args.messageId);
    case "gmail_batch_modify":
      return gws.batchModifyGmailLabels(args.messageIds, args.addLabels, args.removeLabels);
    case "gmail_batch_delete":
      return gws.batchDeleteGmailMessages(args.messageIds);
    case "gmail_list_drafts":
      return gws.listGmailDrafts(args.maxResults);
    case "gmail_delete_draft":
      return gws.deleteGmailDraft(args.draftId);
    case "gmail_history":
      return gws.getGmailHistory(args.startHistoryId, {
        labelId: args.labelId,
        historyTypes: args.historyTypes,
        maxResults: args.maxResults
      });
    case "gmail_thread_trash":
      return gws.trashGmailThread(args.threadId);
    case "gmail_thread_untrash":
      return gws.untrashGmailThread(args.threadId);
    case "gmail_vacation":
      return gws.setGmailVacation(args.enabled, { responseSubject: args.responseSubject, responseBody: args.responseBody, startTime: args.startTime, endTime: args.endTime });
    case "gmail_get_vacation":
      return gws.getGmailVacation();
    case "gmail_send_as":
      return gws.listGmailSendAs();
    case "gmail_delegates":
      return gws.listGmailDelegates();
    case "gmail_add_delegate":
      return gws.addGmailDelegate(args.email);
    case "gmail_remove_delegate":
      return gws.removeGmailDelegate(args.email);
    // Drive Extended
    case "drive_delete":
      return gws.deleteDriveFile(args.fileId);
    case "drive_update":
      return gws.updateDriveFile(args.fileId, {
        name: args.name,
        description: args.description,
        starred: args.starred,
        mimeType: args.mimeType,
        addParents: args.addParents,
        removeParents: args.removeParents
      });
    case "drive_metadata":
      return gws.getDriveFileMetadata(args.fileId);
    case "drive_permissions":
      return gws.getDriveFilePermissions(args.fileId);
    case "drive_about":
      return gws.getDriveSupportedFormats();
    case "drive_download":
      return gws.getDriveFileDownloadUrl(args.fileId);
    case "drive_revisions":
      return gws.getDriveRevisions(args.fileId, args.pageSize);
    // Calendar Extended
    case "calendar_get_event":
      return gws.getCalendarEvent(args.calendarId ?? "primary", args.eventId);
    case "calendar_quick_add":
      return gws.quickAddCalendarEvent(args.calendarId ?? "primary", args.text);
    case "calendar_move":
      return gws.moveCalendarEvent(args.calendarId ?? "primary", args.eventId, args.destinationCalendarId);
    case "calendar_instances":
      return gws.getCalendarEventInstances(args.calendarId ?? "primary", args.eventId);
    case "calendar_settings":
      return gws.listCalendarSettings();
    // Tasks Extended
    case "tasks_get":
      return gws.getTask(args.taskListId, args.taskId);
    case "tasks_move":
      return gws.moveTask(args.taskListId, args.taskId, args.parent, args.previous);
    case "tasks_delete_list":
      return gws.deleteTaskList(args.taskListId);
    case "tasks_clear_completed":
      return gws.clearCompletedTasks(args.taskListId);
    // Contacts Extended
    case "contacts_get":
      return gws.getContact(args.resourceName);
    case "contacts_create": {
      const contact = { names: [{ givenName: args.givenName, familyName: args.familyName }] };
      if (args.email) contact.emailAddresses = [{ value: args.email }];
      if (args.phone) contact.phoneNumbers = [{ value: args.phone }];
      if (args.organization || args.jobTitle) contact.organizations = [{ name: args.organization, title: args.jobTitle }];
      return gws.createContact(contact);
    }
    case "contacts_update": {
      const updates = {};
      if (args.givenName || args.familyName) updates.names = [{ givenName: args.givenName, familyName: args.familyName }];
      if (args.email) updates.emailAddresses = [{ value: args.email }];
      if (args.phone) updates.phoneNumbers = [{ value: args.phone }];
      return gws.updateContact(args.resourceName, updates);
    }
    case "contacts_delete":
      return gws.deleteContact(args.resourceName);
    // Slides
    case "slides_create":
      return gws.createPresentation(args.title);
    case "slides_get":
      return gws.getPresentation(args.presentationId);
    case "slides_batch_update":
      return gws.batchUpdatePresentation(args.presentationId, args.requests);
    case "slides_get_page":
      return gws.getSlidePage(args.presentationId, args.pageObjectId);
    case "slides_get_thumbnail":
      return gws.getSlidePageThumbnail(args.presentationId, args.pageObjectId);
    // Docs Extended
    case "docs_comments":
      return gws.readDocumentComments(args.fileId, args.maxResults);
    case "docs_add_comment":
      return gws.createDocumentComment(args.fileId, args.content);
    case "docs_reply_comment":
      return gws.replyToComment(args.fileId, args.commentId, args.content);
    case "docs_resolve_comment":
      return gws.resolveComment(args.fileId, args.commentId);
    case "docs_insert_image":
      return gws.insertDocImage(args.documentId, args.imageUri, args.index, args.width, args.height);
    case "docs_insert_elements":
      return gws.insertDocElements(args.documentId, args.elements);
    case "docs_headers_footers":
      return gws.updateDocHeadersFooters(args.documentId, { header: args.header, footer: args.footer });
    case "docs_structure":
      return gws.inspectDocStructure(args.documentId);
    case "docs_export_pdf":
      return gws.exportDocToPdf(args.documentId, args.folderId);
    // Sheets Extended
    case "sheets_format":
      return gws.formatSheetRange(args.spreadsheetId, args.sheetId, args.range, {
        bold: args.bold, italic: args.italic, fontSize: args.fontSize,
        textColor: args.textColor, backgroundColor: args.backgroundColor,
        horizontalAlignment: args.horizontalAlignment, wrapStrategy: args.wrapStrategy,
        numberFormat: args.numberFormat
      });
    case "sheets_validation":
      return gws.addSheetDataValidation(args.spreadsheetId, args.sheetId, args.range, args.rule);
    case "sheets_conditional_format":
      return gws.addSheetConditionalFormatting(args.spreadsheetId, args.sheetId, args.ranges, args.condition, args.format);
    case "sheets_chart":
      return gws.createSheetChart(args.spreadsheetId, args.sheetId, args.chartSpec);
    case "sheets_named_range":
      return gws.createSheetNamedRange(args.spreadsheetId, args.name, args.range);
    // Drive Extended
    case "drive_folder":
      return gws.createDriveFolder(args.name, args.parentId);
    case "drive_move":
      return gws.moveDriveFile(args.fileId, args.targetFolderId);
    case "drive_batch_move":
      return gws.batchMoveDriveFiles(args.moves);
    case "drive_shortcut":
      return gws.createDriveShortcut(args.targetFileId, args.name, args.folderId);
    case "drive_comments":
      return gws.listDriveComments(args.fileId);
    case "drive_add_comment":
      return gws.createDriveComment(args.fileId, args.content);
    case "drive_reply_comment":
      return gws.replyToDriveComment(args.fileId, args.commentId, args.content);
    case "drive_resolve_comment":
      return gws.resolveDriveComment(args.fileId, args.commentId);
    case "drive_activity":
      return gws.queryDriveActivity(args);
    case "drive_extract_text":
      return gws.extractTextFromDriveFile(args.fileId);
    case "drive_changes_token":
      return gws.getDriveStartPageToken();
    case "drive_changes":
      return gws.listDriveChanges(args.pageToken, { pageSize: args.pageSize });
    // Drive Labels
    case "drive_labels":
      return gws.listDriveLabels();
    case "drive_get_label":
      return gws.getDriveLabel(args.labelId);
    case "drive_create_label":
      return gws.createDriveLabel(args.name, args.labelType, args.fields);
    case "drive_apply_label":
      return gws.applyLabelToFile(args.fileId, args.labelId, args.fields);
    case "drive_file_labels":
      return gws.listFileLabels(args.fileId);
    case "drive_remove_label":
      return gws.removeLabelFromFile(args.fileId, args.labelId);
    // Gemini AI
    case "gemini_generate":
      return gws.geminiGenerate(args.prompt, {
        model: args.model, systemInstruction: args.systemInstruction,
        temperature: args.temperature, maxTokens: args.maxTokens,
        groundingWithSearch: args.groundingWithSearch
      });
    case "gemini_generate_content":
      return gws.geminiGenerateContent(args.model, args.contents, {
        systemInstruction: args.systemInstruction, temperature: args.temperature,
        maxOutputTokens: args.maxOutputTokens, topP: args.topP, topK: args.topK,
        responseMimeType: args.responseMimeType, responseSchema: args.responseSchema,
        thinkingBudget: args.thinkingBudget, googleSearchGrounding: args.googleSearchGrounding,
        codeExecution: args.codeExecution
      });
    case "gemini_analyze":
      return gws.geminiAnalyzeDocument(args.content, args.analysisType, { model: args.model, customPrompt: args.customPrompt });
    case "gemini_research":
      return gws.geminiResearch(args.query, { model: args.model, systemInstruction: args.systemInstruction });
    case "gemini_embed":
      return gws.geminiEmbedContent(args.model, args.content, args.taskType);
    case "gemini_batch_embed":
      return gws.geminiBatchEmbedContents(args.model, args.requests);
    case "gemini_count_tokens":
      return gws.geminiCountTokens(args.model, args.contents);
    case "gemini_models":
      return gws.listGeminiModels();
    case "gemini_upload_file":
      return gws.geminiUploadFile(args.displayName, args.mimeType, args.data);
    case "gemini_list_files":
      return gws.geminiListFiles();
    case "gemini_get_file":
      return gws.geminiGetFile(args.fileName);
    case "gemini_delete_file":
      return gws.geminiDeleteFile(args.fileName);
    case "gemini_cache_create":
      return gws.createGeminiCachedContent(args.model, args.contents, args.displayName, args.ttl);
    case "gemini_cache_list":
      return gws.listGeminiCachedContents();
    case "gemini_cache_delete":
      return gws.deleteGeminiCachedContent(args.name);
    case "gemini_analyze_video":
      return gws.geminiAnalyzeVideo(args.videoUri, args.prompt, args.model);
    // Vision
    case "vision_annotate":
      return gws.annotateImage(args.imageUri, args.features);
    case "vision_ocr":
      return gws.detectTextInImage(args.imageUri);
    // Apps Script
    case "script_list":
      return gws.listScriptProjects();
    case "script_get":
      return gws.getScriptProject(args.scriptId);
    case "script_get_file":
      return gws.getScriptContent(args.scriptId, args.fileName);
    case "script_create":
      return gws.createScriptProject(args.title, args.parentId);
    case "script_update":
      return gws.updateScriptContent(args.scriptId, args.files);
    case "script_run":
      return gws.runScriptFunction(args.scriptId, args.functionName, args.parameters, args.devMode !== false);
    case "script_versions":
      return gws.listScriptVersions(args.scriptId);
    case "script_version_get":
      return gws.getScriptVersion(args.scriptId, args.versionNumber);
    case "script_version_create":
      return gws.createScriptVersion(args.scriptId, args.description);
    case "script_deployments":
      return gws.listDeployments(args.scriptId);
    case "script_deploy":
      return gws.createDeployment(args.scriptId, args.versionNumber, args.description);
    case "script_deploy_update":
      return gws.updateDeployment(args.scriptId, args.deploymentId, args.versionNumber, args.description);
    case "script_deploy_delete":
      return gws.deleteDeployment(args.scriptId, args.deploymentId);
    case "script_delete":
      return gws.deleteScriptProject(args.scriptId);
    case "script_metrics":
      return gws.getScriptMetrics(args.scriptId);
    case "script_processes":
      return gws.listScriptProcesses();
    case "script_get_info":
      return gws.getScriptProjectInfo(args.scriptId);
    case "script_add_file":
      return gws.addScriptFile(args.scriptId, args.name, args.type, args.source);
    case "script_delete_file":
      return gws.deleteScriptFile(args.scriptId, args.fileName);
    case "script_manifest":
      return gws.getScriptManifest(args.scriptId);
    case "script_set_manifest":
      return gws.setScriptManifest(args.scriptId, args.manifest, args.merge !== false);
    case "script_add_scope":
      return gws.addScriptScope(args.scriptId, args.scope);
    case "script_run_batch":
      return gws.runScriptFunctionBatch(args.scriptId, args.calls, args.devMode !== false);
    case "script_trigger_code":
      return gws.generateTriggerCode(args.triggerType, args.functionName, args);
    // Search
    case "web_search":
      return gws.customSearch(args.query, {
        apiKey: env2.GOOGLE_CLOUD_API_KEY ?? "",
        engineId: env2.GOOGLE_PSE_ENGINE_ID ?? "",
        num: args.num,
        siteSearch: args.siteRestrict
      });
    // Status
    case "gws_status": {
      const token = await gws.authManager.getAccessToken(env2);
      return { status: "ok", hasToken: !!token, tokenPrefix: token ? token.slice(0, 8) + "..." : null };
    }
    // Meet
    case "meet_create":
      return gws.createMeetSpace(args.config);
    case "meet_get":
      return gws.getMeetSpace(args.spaceName);
    case "meet_update":
      return gws.updateMeetSpace(args.spaceName, args.config);
    case "meet_end":
      return gws.endMeetActiveConference(args.spaceName);
    case "meet_conferences":
      return gws.listMeetConferenceRecords(args.filter);
    case "meet_participants":
      return gws.listMeetParticipants(args.conferenceRecord);
    case "meet_recordings":
      return gws.listMeetRecordings(args.conferenceRecord);
    case "meet_transcripts":
      return gws.listMeetTranscripts(args.conferenceRecord);
    case "meet_transcript_entries":
      return gws.getMeetTranscriptEntries(args.transcript);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
__name(callTool, "callTool");
async function handleMcp(request, env2) {
  if (request.method === "GET") {
    return json({
      name: "gws-worker",
      version: "1.0.0",
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} }
    });
  }
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }
  if (!checkAuth(request, env2)) {
    return json({ error: "Unauthorized" }, 401);
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
  }
  const { jsonrpc, id, method, params } = body;
  const respond = /* @__PURE__ */ __name((result) => json({ jsonrpc: "2.0", id, result }), "respond");
  const respondError = /* @__PURE__ */ __name((code, message, data) => json({ jsonrpc: "2.0", id, error: { code, message, ...data ? { data } : {} } }), "respondError");
  switch (method) {
    case "initialize":
      return respond({
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: "gws-worker", version: "1.0.0" }
      });
    case "notifications/initialized":
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    case "tools/list":
      return respond({ tools: GROUPED_TOOLS });
    case "tools/call": {
      let toolName = params?.name;
      let toolArgs = params?.arguments ?? {};
      const groupedTool = GROUPED_TOOLS.find((t) => t.name === toolName);
      if (groupedTool && toolArgs.action) {
        toolName = `${toolName}_${toolArgs.action}`;
      }
      const tool = TOOLS.find((t) => t.name === toolName) || groupedTool;
      if (!tool) {
        return respondError(-32601, `Tool not found: ${toolName}`);
      }
      const gws = new GoogleWorkspaceClient(env2);
      try {
        const result = await callTool(toolName, toolArgs, gws, env2);
        return respond({
          content: [{ type: "text", text: JSON.stringify(result ?? { success: true }, null, 2) }]
        });
      } catch (err) {
        return respond({
          content: [{ type: "text", text: `Error: ${err?.message ?? String(err)}` }],
          isError: true
        });
      }
    }
    default:
      return respondError(-32601, `Method not found: ${method}`);
  }
}
__name(handleMcp, "handleMcp");
var index_default = {
  async fetch(request, env2) {
    const url = new URL(request.url);
    // Normalize: strip /v1 prefix added by CF AI Gateway custom provider routing
    if (url.pathname.startsWith('/v1/')) url.pathname = url.pathname.slice(3);
    else if (url.pathname === '/v1') url.pathname = '/';
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }
    if (url.pathname === "/health") {
      let oauthFreshness = {};
      try {
        const tokenRaw = await env2.CACHE?.get("google_oauth_tokens");
        const token = tokenRaw ? JSON.parse(tokenRaw) : null;
        if (token) {
          const tokenFresh = token.expires_at ? Date.now() < token.expires_at : false;
          oauthFreshness = {
            oauth_fresh: tokenFresh,
            oauth_expires_at: token.expires_at ? new Date(token.expires_at).toISOString() : null,
            oauth_has_refresh: !!token.refresh_token,
          };
        } else {
          oauthFreshness = { oauth_fresh: false, oauth_expires_at: null, oauth_has_refresh: false };
        }
      } catch {}
      let bindingOk = false;
      try {
        if (env2.GOOGLE_AUTH) {
          const br = await env2.GOOGLE_AUTH.fetch(new Request("http://internal/token"));
          bindingOk = br.ok;
        }
      } catch {}
      return withCors(json({
        status: "ok",
        worker: "gws-worker",
        auth: "session-key",
        tools: TOOLS.length,
        hasGoogleCreds: !!(env2.GOOGLE_REFRESH_TOKEN && env2.GOOGLE_OAUTH_CLIENT_ID),
        kv: !!env2.CACHE,
        r2: !!env2.R2_AUTH,
        google_auth_binding: !!env2.GOOGLE_AUTH,
        google_auth_binding_ok: bindingOk,
        ...oauthFreshness,
      }));
    }
    if (url.pathname === "/.well-known/oauth-protected-resource") {
      return withCors(json({
        resource: url.origin,
        authorization_servers: [url.origin],
        scopes_supported: ["read", "write"],
        bearer_methods_supported: ["header"],
        resource_documentation: `${url.origin}/mcp`
      }));
    }
    if (url.pathname === "/.well-known/oauth-authorization-server") {
      return withCors(json({
        issuer: url.origin,
        authorization_endpoint: `${url.origin}/oauth/authorize`,
        token_endpoint: `${url.origin}/oauth/token`,
        response_types_supported: ["code"],
        grant_types_supported: ["authorization_code"],
        scopes_supported: ["read", "write"]
      }));
    }
    if (url.pathname === "/oauth/authorize") {
      const redirectUri = url.searchParams.get("redirect_uri") ?? "";
      const state = url.searchParams.get("state") ?? "";
      if (!redirectUri) {
        // Direct browser visit — serve info page instead of crashing
        return new Response(`<html><body><h2>MCP OAuth Endpoint</h2><p>This endpoint is for MCP client authentication. Google auth is managed by the d1-rest worker.</p></body></html>`,
          { status: 200, headers: { "Content-Type": "text/html" } });
      }
      const code = `gws-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const sep = redirectUri.includes("?") ? "&" : "?";
      return Response.redirect(`${redirectUri}${sep}code=${code}&state=${state}`, 302);
    }
    if (url.pathname === "/oauth/token") {
      return withCors(json({
        access_token: env2.SESSION_KEY ?? `gws-token-${Date.now()}`,
        token_type: "bearer",
        expires_in: 3600,
        scope: "read write"
      }));
    }
    if (url.pathname === "/mcp") {
      const resp = await handleMcp(request, env2);
      const sessionId = request.headers.get("Mcp-Session-Id") ?? `gws-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const headers = new Headers(resp.headers);
      headers.set("MCP-Protocol-Version", "2024-11-05");
      headers.set("Mcp-Session-Id", sessionId);
      headers.set("Access-Control-Expose-Headers", "Mcp-Session-Id, MCP-Protocol-Version");
      return new Response(resp.body, { status: resp.status, headers });
    }
    if (url.pathname === "/sse" && request.method === "GET") {
      const sessionId = `gws-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const origin = url.origin;
      const messageUrl = `${origin}/message?sessionId=${sessionId}`;
      return new Response(`event: endpoint
data: ${messageUrl}

`, {
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "MCP-Protocol-Version": "2024-11-05",
          "Mcp-Session-Id": sessionId
        }
      });
    }
    if (url.pathname === "/message") {
      if (request.method === "DELETE") {
        return new Response(null, { status: 200, headers: { ...CORS_HEADERS, "MCP-Protocol-Version": "2024-11-05" } });
      }
      if (request.method === "POST") {
        const resp = await handleMcp(request, env2);
        const sessionId = request.headers.get("Mcp-Session-Id") ?? url.searchParams.get("sessionId") ?? "";
        const headers = new Headers(resp.headers);
        headers.set("MCP-Protocol-Version", "2024-11-05");
        if (sessionId) headers.set("Mcp-Session-Id", sessionId);
        return new Response(resp.body, { status: resp.status, headers });
      }
    }
    return withCors(json({ error: "Not found" }, 404));
  }
};
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
