"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var settingsActions_1 = __importDefault(require("../../action_creators/settings/settingsActions"));
var initialState = {
    stashDisplayNameError: false,
    stashDisplayNameErrorText: '',
    saveSuccessDisplayed: false
};
exports.default = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case settingsActions_1.default.SET_SAVE_SETTINGS_ERROR:
            return __assign(__assign({}, state), { stashDisplayNameError: true, stashDisplayNameErrorText: action.payload });
        case settingsActions_1.default.CLEAR_SAVE_SETTINGS_ERROR:
            return __assign(__assign({}, state), { stashDisplayNameError: false, stashDisplayNameErrorText: '' });
        case settingsActions_1.default.SET_SAVE_SUCCESS_DISPLAYED:
            return __assign(__assign({}, state), { saveSuccessDisplayed: action.payload });
        default:
            return state;
    }
});
