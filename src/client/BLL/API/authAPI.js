"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var URLS_1 = __importDefault(require("../../../common/URLS"));
exports.fetchGetAuth = function () { return axios_1.default.get(URLS_1.default.API_AUTH); };
exports.fetchRefreshToken = function () { return axios_1.default.get(URLS_1.default.REFRESH); };
exports.fetchPostStashUser = function (user) { return axios_1.default.post(URLS_1.default.API_USERS, user); };
