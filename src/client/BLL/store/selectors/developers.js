"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectFavoriteDevelopers = function (state) { return state.developers.favorites.data; };
exports.selectSearchFavoriteDevelopersTerm = function (state) { return state.developers.favorites.search; };
exports.selectLimitFavoriteDevelopers = function (state) { return state.developers.favorites.limit; };
exports.selectStashDevelopers = function (state) { return state.developers.stash.data; };
exports.selectFilterStashDevelopersTerm = function (state) { return state.developers.stash.filter; };
exports.selectLimitStashDevelopers = function (state) { return state.developers.stash.limit; };
