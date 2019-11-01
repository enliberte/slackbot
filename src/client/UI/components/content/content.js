"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var styles_1 = __importDefault(require("./styles"));
var Content = function (_a) {
    var children = _a.children;
    var classes = styles_1.default();
    return (react_1.default.createElement("main", { className: classes.content },
        react_1.default.createElement(core_1.Grid, { container: true, spacing: 3 }, children)));
};
exports.default = Content;
