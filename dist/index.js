var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Logger: () => Logger,
  createLogger: () => createLogger
});
module.exports = __toCommonJS(index_exports);

// src/logger-class.ts
var import_chalk = __toESM(require("chalk"));
var import_node_util = require("util");

// src/utils/color-utils.ts
var hexRegex = /^#[0-9A-F]{6}$/i;
var hexWithTransparency = /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i;
var ColorUtils = class {
  static isHex(string, supportTransparent = false) {
    const regex = supportTransparent ? hexWithTransparency : hexRegex;
    return regex.test(string);
  }
};

// src/logger-class.ts
var printf = ({ label, badge, message }) => `${badge} ${label}: ${message}`;
var Logger = class {
  constructor(config) {
    for (const [level, levelConfig] of Object.entries(config.levels)) {
      this[level] = this.makeLogger({ ...levelConfig, level });
    }
    this.debugActived = config.debug ?? true;
    this.formatOptions = {
      colorize: config.format?.colorize ?? {},
      function: config.format?.function ?? printf
    };
  }
  makeLogger(config) {
    return (message, more) => {
      if (!(config.logLevel === "debug" && !this.debugActived)) {
        this._log(config, message, more);
      }
    };
  }
  async _log({ level, ...config }, _message, more) {
    let colorFn = (string) => string;
    if (config.color) {
      if (ColorUtils.isHex(config.color)) {
        colorFn = import_chalk.default.hex(config.color);
      } else {
        colorFn = import_chalk.default[config.color];
      }
    }
    const commonBadge = config.badge || "\u25C9";
    const badge = this.formatOptions.colorize.label ? colorFn(commonBadge) : commonBadge;
    const commonLabel = config.label ?? level;
    const label = this.formatOptions.colorize?.label ? colorFn(commonLabel) : commonLabel;
    let inspectedMessage = _message;
    if (inspectedMessage instanceof Promise) {
      inspectedMessage = await inspectedMessage;
    }
    if (typeof inspectedMessage !== "string") {
      inspectedMessage = await (0, import_node_util.inspect)(inspectedMessage, { depth: more?.depth ?? 0 });
    }
    const messageToPrint = this.formatOptions.function({
      badge,
      label,
      level,
      message: inspectedMessage,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      more,
      color: config.color,
      commonLabel
    });
    console.log(messageToPrint);
  }
};

// src/index.ts
var Resource = Logger;
var createLogger = (config) => {
  return new Resource(config);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Logger,
  createLogger
});
//# sourceMappingURL=index.js.map