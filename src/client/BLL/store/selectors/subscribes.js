"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectSubscribes = function (state) { return state.subscribes.data; };
exports.selectSubscribeFilters = function (state) { return state.subscribes.filters; };
exports.selectFollowed = function (state) { return state.subscribes.filters.followed; };
exports.selectIsSubscribeEditing = function (state) { return state.subscribes.isEditing; };
