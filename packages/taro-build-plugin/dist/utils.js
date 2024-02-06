"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformCallbackglobalObject = void 0;
const AppType_enum_1 = require("./AppType.enum");
const platformCallbackglobalObject = (appType) => {
    switch (appType) {
        case AppType_enum_1.AppType.DD:
            return "dd";
        case AppType_enum_1.AppType.WEAPP:
        default:
            return "wx";
    }
};
exports.platformCallbackglobalObject = platformCallbackglobalObject;
