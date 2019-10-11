"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var subscribesActions_1 = __importDefault(require("./subscribesActions"));
exports.setSubscribesData = function (subscribesData) { return ({ type: subscribesActions_1.default.SET_SUBSCRIBES, payload: subscribesData }); };
exports.setSubscribe = function (subscribe) { return ({ type: subscribesActions_1.default.SET_SUBSCRIBE, payload: subscribe }); };
exports.setIsSuccess = function (isSuccess) { return ({ type: subscribesActions_1.default.SET_IS_SUCCESS, payload: isSuccess }); };
exports.setIsNew = function (isNew) { return ({ type: subscribesActions_1.default.SET_IS_NEW, payload: isNew }); };
exports.setSubscribeFilters = function (filters) { return ({ type: subscribesActions_1.default.SET_SUBSCRIBE_FILTERS, payload: filters }); };
exports.toggleEditingWindow = function () { return ({ type: subscribesActions_1.default.TOGGLE_EDITING_WINDOW }); };
exports.toggleEditingRepositoryWindow = function () { return ({ type: subscribesActions_1.default.TOGGLE_EDITING_REPOSITORY_WINDOW }); };
exports.toggleEditingDeveloperWindow = function () { return ({ type: subscribesActions_1.default.TOGGLE_EDITING_DEVELOPER_WINDOW }); };
exports.runGetSubscribesSaga = function () { return ({ type: subscribesActions_1.default.GET_SUBSCRIBES_SAGA }); };
exports.runSaveSubscribeSaga = function () { return ({ type: subscribesActions_1.default.SAVE_SUBSCRIBE_SAGA }); };
exports.runEditSubscribeSaga = function () { return ({ type: subscribesActions_1.default.EDIT_SUBSCRIBE_SAGA }); };
exports.runDeleteSubscribeSaga = function (subscribe) { return ({ type: subscribesActions_1.default.DELETE_SUBSCRIBE_SAGA, payload: subscribe }); };
