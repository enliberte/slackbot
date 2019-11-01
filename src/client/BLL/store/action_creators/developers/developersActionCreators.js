"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var developersActions_1 = __importDefault(require("./developersActions"));
exports.setFavoriteDevelopersData = function (developersData) {
    return ({ type: developersActions_1.default.SET_FAVORITE_DEVELOPERS, payload: developersData });
};
exports.setStashDevelopersData = function (developersData) {
    return ({ type: developersActions_1.default.SET_STASH_DEVELOPERS, payload: developersData });
};
exports.searchFavoriteDevelopers = function (search) {
    return ({ type: developersActions_1.default.SEARCH_FAVORITE_DEVELOPERS, payload: search });
};
exports.filterStashDevelopers = function (filter) {
    return ({ type: developersActions_1.default.FILTER_STASH_DEVELOPERS, payload: filter });
};
exports.runGetFavoriteDevelopersSaga = function () {
    return ({ type: developersActions_1.default.GET_FAVORITE_DEVELOPERS_SAGA });
};
exports.runGetStashDevelopersSaga = function () {
    return ({ type: developersActions_1.default.GET_STASH_DEVELOPERS_SAGA });
};
exports.runDeleteFavoriteDeveloperSaga = function (developer) {
    return ({ type: developersActions_1.default.DELETE_FAVORITE_DEVELOPER_SAGA, payload: developer });
};
exports.runAddStashDeveloperToFavoritesSaga = function (developer) {
    return ({ type: developersActions_1.default.ADD_STASH_DEVELOPER_TO_FAVORITES_SAGA, payload: developer });
};
exports.setIsDevelopersFetching = function (isFetching) {
    return ({ type: developersActions_1.default.SET_IS_DEVELOPERS_FETCHING, payload: isFetching });
};
exports.setIsFavoriteDevelopersOnly = function (isFavoriteOnly) {
    return ({ type: developersActions_1.default.SET_IS_FAVORITE_ONLY, payload: isFavoriteOnly });
};
