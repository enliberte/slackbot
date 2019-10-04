"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
exports.fetchGetFavoriteDevelopers = function (filters) { return axios_1.default.post('/api/developers/get', { filters: filters }); };
exports.fetchGetStashDevelopers = function (filters) { return axios_1.default.post('/api/stash/developers/get', { filters: filters }); };
exports.fetchDeleteDeveloper = function (filters) { return axios_1.default.post('/api/developers/delete', { filters: filters }); };
exports.fetchAddStashDeveloperToFavorites = function (developer) { return axios_1.default.post('/api/developers/add', { developer: developer }); };
