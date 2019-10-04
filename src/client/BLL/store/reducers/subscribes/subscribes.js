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
    data: [],
    isEditing: false,
    filters: { followed: null }
};
exports.default = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case subscribesActions_1.default.SET_SUBSCRIBES:
            return __assign(__assign({}, state), { data: action.payload });
        case subscribesActions_1.default.SET_SUBSCRIBE_FILTERS:
            return __assign(__assign({}, state), { filters: __assign(__assign({}, state.filters), action.payload) });
        case subscribesActions_1.default.TOGGLE_EDITING_WINDOW:
            return __assign(__assign({}, state), { isEditing: !state.isEditing });
        default:
            return state;
    }
});
