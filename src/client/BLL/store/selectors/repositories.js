"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectFavoriteRepositories = function (state) { return state.repositories.favorites.data; };
exports.selectStashRepositories = function (state) {
    return state.repositories.stash.isFavoriteOnly ?
        state.repositories.stash.data.filter(function (repository) { return repository.isFavorite; }) : state.repositories.stash.data;
};
exports.selectIsFavoriteRepositoriesOnly = function (state) { return state.repositories.stash.isFavoriteOnly; };
exports.selectIsRepositoriesFetching = function (state) { return state.repositories.isFetching; };
exports.selectStashRepositoriesSuggests = function (state) { return state.repositories.stash.data.map(function (repository) { return repository.name; }); };
