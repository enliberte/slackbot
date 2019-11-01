"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
var ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
var styles_1 = __importDefault(require("./styles"));
var AdminListItem = function (_a) {
    var children = _a.children, handleClick = _a.handleClick, text = _a.text;
    var classes = styles_1.default();
    return (react_1.default.createElement(ListItem_1.default, { button: true, onClick: handleClick },
        react_1.default.createElement(ListItemText_1.default, { primary: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Typography_1.default, { component: "span", variant: "body2", className: classes.inline, color: "textPrimary" }, text)) }),
        children));
};
exports.default = AdminListItem;
