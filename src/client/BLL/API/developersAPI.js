"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var URLS_1 = __importDefault(require("../../../common/URLS"));
var query_string_1 = __importDefault(require("query-string"));
exports.fetchGetFavoriteDevelopers = function (filters) {
    return axios_1.default.get(URLS_1.default.API_FAVORITE_DEVELOPERS + "?" + query_string_1.default.stringify(filters));
};
exports.fetchGetStashDevelopers = function (filters) {
    return axios_1.default.get(URLS_1.default.API_STASH_DEVELOPERS + "?" + query_string_1.default.stringify(filters));
};
exports.fetchDeleteDeveloper = function (developer) {
    return axios_1.default.delete(URLS_1.default.API_FAVORITE_DEVELOPERS + "?" + query_string_1.default.stringify(developer));
};
exports.fetchAddStashDeveloperToFavorites = function (developer) {
    return axios_1.default.post(URLS_1.default.API_FAVORITE_DEVELOPERS, developer);
};
