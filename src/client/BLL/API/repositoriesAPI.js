"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
exports.fetchGetFavoriteRepositories = function (filters) { return axios_1.default.post('/api/repositories/get', { filters: filters }); };
exports.fetchGetStashRepositories = function (filters) { return axios_1.default.post('/api/stash/repositories/get', { filters: filters }); };
exports.fetchDeleteRepository = function (filters) { return axios_1.default.post('/api/repositories/delete', { filters: filters }); };
exports.fetchAddStashRepositoryToFavorites = function (repository) { return axios_1.default.post('/api/repositories/add', { repository: repository }); };
