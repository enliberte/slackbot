"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectFavoriteRepositories = function (state) { return state.repositories.favorites.data; };
exports.selectSearchFavoriteRepositoriesTerm = function (state) { return state.repositories.favorites.search; };
exports.selectLimitFavoriteRepositories = function (state) { return state.repositories.favorites.limit; };
exports.selectStashRepositories = function (state) { return state.repositories.stash.data; };
exports.selectFilterStashRepositoriesTerm = function (state) { return state.repositories.stash.name; };
exports.selectLimitStashRepositories = function (state) { return state.repositories.stash.limit; };
