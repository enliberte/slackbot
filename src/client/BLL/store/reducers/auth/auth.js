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
var authActions_1 = __importDefault(require("../../action_creators/auth/authActions"));
var initialState = {
    isAuth: false,
    isFetching: true,
    channelId: '',
    stashDisplayName: '',
    stashSlug: '',
    commentsNotifications: false,
    reviewNotifications: false,
    subscribesNotifications: true,
    isSessionWarningMsgDisplayed: false,
    sessionEndWarningMsg: '',
    exp: 0
};
exports.default = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case authActions_1.default.SET_AUTH:
            return __assign(__assign({}, state), action.payload);
        case authActions_1.default.SET_IS_AUTH_FETCHING:
            return __assign(__assign({}, state), { isFetching: action.payload });
        case authActions_1.default.SET_STASH_USER:
            return __assign(__assign({}, state), action.payload);
        case authActions_1.default.SET_SNACKBAR:
            return __assign(__assign({}, state), { isSessionWarningMsgDisplayed: action.payload.isSessionWarningMsgDisplayed, sessionEndWarningMsg: action.payload.sessionEndWarningMsg });
        case authActions_1.default.LOGOUT:
            return __assign(__assign({}, state), { isAuth: false });
        case authActions_1.default.SET_EXP:
            return __assign(__assign({}, state), { exp: action.payload });
        default:
            return state;
    }
});
