"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var URLS_1 = __importDefault(require("../../../common/URLS"));
var query_string_1 = __importDefault(require("query-string"));
exports.fetchGetSubscribes = function (filters) {
    return axios_1.default.get(URLS_1.default.API_SUBSCRIBES + "?" + query_string_1.default.stringify(filters));
};
exports.fetchSaveSubscribe = function (subscribe) { return axios_1.default.post(URLS_1.default.API_SUBSCRIBES, subscribe); };
exports.fetchEditSubscribe = function (_a) {
    var id = _a.id, subscribeData = __rest(_a, ["id"]);
    return axios_1.default.put(URLS_1.default.API_SUBSCRIBES + "/" + id, subscribeData);
};
exports.fetchDeleteSubscribe = function (subscribe) {
    return axios_1.default.delete(URLS_1.default.API_SUBSCRIBES + "?" + query_string_1.default.stringify(subscribe));
};
