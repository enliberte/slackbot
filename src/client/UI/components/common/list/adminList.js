"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var styles_1 = __importDefault(require("./styles"));
var List_1 = __importDefault(require("@material-ui/core/List"));
var AdminList = function (_a) {
    var search = _a.search, children = _a.children;
    var classes = styles_1.default();
    var Search = search;
    return (react_1.default.createElement(Paper_1.default, { className: classes.paper },
        Search && react_1.default.createElement(Search, null),
        react_1.default.createElement(List_1.default, { className: classes.root }, children)));
};
exports.default = AdminList;
