"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
var styles_1 = __importDefault(require("./styles"));
var AdminCircular = function () {
    var classes = styles_1.default();
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(CircularProgress_1.default, { className: classes.progress })));
};
exports.default = AdminCircular;
