"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
exports.fetchGetSubscribes = function (filters) { return axios_1.default.post('/api/subscribes/get', { filters: filters }); };
exports.fetchDeleteSubscribes = function (filters) { return axios_1.default.post('/api/subscribes/delete', { filters: filters }); };
