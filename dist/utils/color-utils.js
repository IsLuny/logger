var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/color-utils.ts
var color_utils_exports = {};
__export(color_utils_exports, {
  ColorUtils: () => ColorUtils
});
module.exports = __toCommonJS(color_utils_exports);
var hexRegex = /^#[0-9A-F]{6}$/i;
var hexWithTransparency = /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i;
var ColorUtils = class {
  static isHex(string, supportTransparent = false) {
    const regex = supportTransparent ? hexWithTransparency : hexRegex;
    return regex.test(string);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ColorUtils
});
//# sourceMappingURL=color-utils.js.map