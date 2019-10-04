"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var authActions_1 = __importDefault(require("../../action_creators/auth/authActions"));
var initialState = { isAuth: false, username: '', channelId: '' };
exports.default = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case authActions_1.default.SET_AUTH:
            return action.payload;
        default:
            return state;
    }
});
