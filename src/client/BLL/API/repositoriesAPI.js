"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var URLS_1 = __importDefault(require("../../../common/URLS"));
var query_string_1 = __importDefault(require("query-string"));
exports.fetchGetFavoriteRepositories = function (filters) {
    return axios_1.default.get(URLS_1.default.API_FAVORITE_REPOSITORIES + "?" + query_string_1.default.stringify(filters));
};
exports.fetchGetStashRepositories = function (filters) {
    return axios_1.default.get(URLS_1.default.API_STASH_REPOSITORIES + "?" + query_string_1.default.stringify(filters));
};
exports.fetchDeleteRepository = function (repository) {
    return axios_1.default.delete(URLS_1.default.API_FAVORITE_REPOSITORIES + "?" + query_string_1.default.stringify(repository));
};
exports.fetchAddStashRepositoryToFavorites = function (repository) {
    return axios_1.default.post(URLS_1.default.API_FAVORITE_REPOSITORIES, repository);
};
