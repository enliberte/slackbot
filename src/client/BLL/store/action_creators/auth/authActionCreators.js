"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var authActions_1 = __importDefault(require("./authActions"));
exports.setAuthData = function (authData) {
    return ({ type: authActions_1.default.SET_AUTH, payload: authData });
};
exports.setLogout = function () {
    return ({ type: authActions_1.default.LOGOUT, payload: false });
};
exports.setExp = function (exp) {
    return ({ type: authActions_1.default.SET_EXP, payload: exp });
};
exports.setSessionEndWarning = function (warming) {
    return ({ type: authActions_1.default.SET_SNACKBAR, payload: warming });
};
exports.runAddStashUserSaga = function (user) {
    return ({ type: authActions_1.default.ADD_STASH_USER_SAGA, payload: user });
};
exports.setStashUserData = function (user) {
    return ({ type: authActions_1.default.SET_STASH_USER, payload: user });
};
exports.setIsAuthFetching = function (isFetching) {
    return ({ type: authActions_1.default.SET_IS_AUTH_FETCHING, payload: isFetching });
};
exports.runGetAuthSaga = function () { return ({ type: authActions_1.default.GET_AUTH_SAGA }); };
exports.runRefreshSaga = function () { return ({ type: authActions_1.default.RUN_REFRESH_SAGA }); };
