"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var styles_1 = __importDefault(require("./styles"));
var AdminIconButton = function (_a) {
    var handleClick = _a.handleClick, children = _a.children;
    var classes = styles_1.default();
    return (react_1.default.createElement(IconButton_1.default, { className: classes.button, onClick: handleClick }, children));
};
exports.default = AdminIconButton;
