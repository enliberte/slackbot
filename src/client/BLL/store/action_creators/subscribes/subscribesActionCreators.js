"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var subscribesActions_1 = __importDefault(require("./subscribesActions"));
exports.setSubscribesData = function (subscribesData) { return ({ type: subscribesActions_1.default.SET_SUBSCRIBES, payload: subscribesData }); };
exports.setSubscribeFilters = function (filters) { return ({ type: subscribesActions_1.default.SET_SUBSCRIBE_FILTERS, payload: filters }); };
exports.toggleEditingWindow = function () { return ({ type: subscribesActions_1.default.TOGGLE_EDITING_WINDOW }); };
exports.runGetSubscribesSaga = function () { return ({ type: subscribesActions_1.default.GET_SUBSCRIBES_SAGA }); };
// export const runDeleteSubscribeSaga = (filters: Partial<ISubscribe>): IRunDeleteDeveloperSagaAction => ({type: subscribesActions.DELETE_SUBSCRIBE_SAGA, payload: filters})
