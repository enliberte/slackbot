"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectSubscribes = function (state) { return state.subscribes.data; };
exports.selectSubscribe = function (state) { return state.subscribe.data; };
exports.selectSubscribeFilters = function (state) { return state.subscribes.filters; };
exports.selectIsSubscribeEditing = function (state) { return state.subscribes.isEditing; };
exports.selectIsNewSubscribe = function (state) { return state.subscribe.isNew; };
exports.selectIsRepositoryEditing = function (state) { return state.subscribe.isRepositoryPanelDisplayed; };
exports.selectIsDeveloperEditing = function (state) { return state.subscribe.isDeveloperPanelDisplayed; };
