"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectFavoriteDevelopers = function (state) { return state.developers.favorites.data; };
exports.selectStashDevelopers = function (state) {
    return state.developers.stash.isFavoriteOnly ?
        state.developers.stash.data.filter(function (developer) { return developer.isFavorite; }) : state.developers.stash.data;
};
exports.selectIsFavoriteDevelopersOnly = function (state) { return state.developers.stash.isFavoriteOnly; };
exports.selectIsDevelopersFetching = function (state) { return state.developers.isFetching; };
exports.selectStashDevelopersSuggests = function (state) {
    return state.developers.stash.data.map(function (developer) { return developer.displayName; });
};
