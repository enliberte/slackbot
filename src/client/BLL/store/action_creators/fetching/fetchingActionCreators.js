"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fetchingActions_1 = __importDefault(require("./fetchingActions"));
exports.setIsFetching = function (isFetching) { return ({ type: fetchingActions_1.default.SET_IS_FETCHING, payload: isFetching }); };
