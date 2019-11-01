"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Toc_1 = __importDefault(require("@material-ui/icons/Toc"));
var adminIconButton_1 = __importDefault(require("../adminIconButton"));
var TocAdminIconButton = function (_a) {
    var handleClick = _a.handleClick;
    return (react_1.default.createElement(adminIconButton_1.default, { handleClick: handleClick },
        react_1.default.createElement(Toc_1.default, null)));
};
exports.default = TocAdminIconButton;
