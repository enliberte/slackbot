"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var authActions_1 = __importDefault(require("./authActions"));
exports.setAuthData = function (authData) { return ({ type: authActions_1.default.SET_AUTH, payload: authData }); };
exports.runGetAuthSaga = function () { return ({ type: authActions_1.default.GET_AUTH_SAGA }); };
