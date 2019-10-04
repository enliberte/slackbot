"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectUsername = function (state) { return state.auth.username; };
exports.selectChannelId = function (state) { return state.auth.channelId; };
exports.selectIsAuth = function (state) { return state.auth.isAuth; };
