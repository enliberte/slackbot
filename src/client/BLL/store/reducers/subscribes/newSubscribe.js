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
var subscribesActions_1 = __importDefault(require("../../action_creators/subscribes/subscribesActions"));
var initialState = {
    data: {
        id: '',
        followed: '',
        reponame: ''
    },
    isNew: true,
    isDeveloperPanelDisplayed: false,
    isRepositoryPanelDisplayed: false,
    success: true
};
exports.default = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case subscribesActions_1.default.SET_SUBSCRIBE:
            return __assign(__assign({}, state), { data: __assign(__assign({}, state.data), action.payload) });
        case subscribesActions_1.default.TOGGLE_EDITING_REPOSITORY_WINDOW:
            return __assign(__assign({}, state), { isRepositoryPanelDisplayed: !state.isRepositoryPanelDisplayed });
        case subscribesActions_1.default.TOGGLE_EDITING_DEVELOPER_WINDOW:
            return __assign(__assign({}, state), { isDeveloperPanelDisplayed: !state.isDeveloperPanelDisplayed });
        case subscribesActions_1.default.SET_IS_SUCCESS:
            return __assign(__assign({}, state), { success: action.payload });
        case subscribesActions_1.default.SET_IS_NEW:
            return __assign(__assign({}, state), { isNew: action.payload });
        default:
            return state;
    }
});
