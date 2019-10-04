"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var BITBUCKET_CREDENTIALS = require('../../../../config').BITBUCKET_CREDENTIALS;
var StashClient = axios_1.default.create({
    baseURL: 'https://stash.firmglobal.com/rest/api/1.0/',
    withCredentials: true,
    headers: {
        Authorization: "Basic " + BITBUCKET_CREDENTIALS
    }
});
exports.default = StashClient;
