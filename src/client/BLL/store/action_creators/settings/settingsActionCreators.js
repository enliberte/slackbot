"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var settingsActions_1 = __importDefault(require("./settingsActions"));
exports.setSaveSettingsError = function (errorText) {
    return ({ type: settingsActions_1.default.SET_SAVE_SETTINGS_ERROR, payload: errorText });
};
exports.clearSaveSettingsError = function () {
    return ({ type: settingsActions_1.default.CLEAR_SAVE_SETTINGS_ERROR });
};
exports.setSaveSuccessDisplayed = function (isDisplayed) {
    return ({ type: settingsActions_1.default.SET_SAVE_SUCCESS_DISPLAYED, payload: isDisplayed });
};
