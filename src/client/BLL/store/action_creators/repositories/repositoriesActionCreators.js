"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var repositoriesActions_1 = __importDefault(require("./repositoriesActions"));
exports.setFavoriteRepositoriesData = function (repositoriesData) {
    return ({ type: repositoriesActions_1.default.SET_FAVORITE_REPOSITORIES, payload: repositoriesData });
};
exports.setStashRepositoriesData = function (repositoriesData) {
    return ({ type: repositoriesActions_1.default.SET_STASH_REPOSITORIES, payload: repositoriesData });
};
exports.searchFavoriteRepositories = function (search) {
    return ({ type: repositoriesActions_1.default.SEARCH_FAVORITE_REPOSITORIES, payload: search });
};
exports.filterStashRepositories = function (filter) {
    return ({ type: repositoriesActions_1.default.FILTER_STASH_REPOSITORIES, payload: filter });
};
exports.runGetFavoriteRepositoriesSaga = function () {
    return ({ type: repositoriesActions_1.default.GET_FAVORITE_REPOSITORIES_SAGA });
};
exports.runGetStashRepositoriesSaga = function () {
    return ({ type: repositoriesActions_1.default.GET_STASH_REPOSITORIES_SAGA });
};
exports.runDeleteFavoriteRepositorySaga = function (filters) {
    return ({ type: repositoriesActions_1.default.DELETE_FAVORITE_REPOSITORY_SAGA, payload: filters });
};
exports.runAddStashRepositoryToFavoritesSaga = function (repositoryURL) {
    return ({ type: repositoriesActions_1.default.ADD_STASH_REPOSITORY_TO_FAVORITES_SAGA, payload: repositoryURL });
};
