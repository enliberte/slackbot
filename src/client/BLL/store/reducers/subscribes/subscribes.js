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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var subscribesActions_1 = __importDefault(require("../../action_creators/subscribes/subscribesActions"));
var initialState = {
    data: [],
    selected: [],
    isEditing: false,
    filters: {},
    isFetching: false
};
exports.default = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case subscribesActions_1.default.SET_SUBSCRIBES:
            return __assign(__assign({}, state), { data: action.payload });
        case subscribesActions_1.default.ADD_SELECTED:
            return __assign(__assign({}, state), { selected: __spreadArrays(state.selected, [action.payload]) });
        case subscribesActions_1.default.SET_SUBSCRIBE_FILTERS:
            return __assign(__assign({}, state), { filters: __assign({}, action.payload) });
        case subscribesActions_1.default.TOGGLE_EDITING_WINDOW:
            return __assign(__assign({}, state), { isEditing: !state.isEditing });
        case subscribesActions_1.default.SET_IS_SUBSCRIBES_FETCHING:
            return __assign(__assign({}, state), { isFetching: action.payload });
        default:
            return state;
    }
});
