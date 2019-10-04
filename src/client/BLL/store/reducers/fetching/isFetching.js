"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fetchingActions_1 = __importDefault(require("../../action_creators/fetching/fetchingActions"));
var initialState = false;
exports.default = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case fetchingActions_1.default.SET_IS_FETCHING:
            return action.payload;
        default:
            return state;
    }
});
