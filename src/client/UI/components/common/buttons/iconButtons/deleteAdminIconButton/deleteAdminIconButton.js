"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Delete_1 = __importDefault(require("@material-ui/icons/Delete"));
var adminIconButton_1 = __importDefault(require("../adminIconButton"));
var DeleteAdminIconButton = function (_a) {
    var handleClick = _a.handleClick;
    return (react_1.default.createElement(adminIconButton_1.default, { handleClick: handleClick },
        react_1.default.createElement(Delete_1.default, null)));
};
exports.default = DeleteAdminIconButton;
