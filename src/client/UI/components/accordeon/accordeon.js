"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
var adminAppToolbar_1 = __importDefault(require("./toolbar/adminAppToolbar/adminAppToolbar"));
var adminDrawer_1 = __importDefault(require("./drawer/adminDrawer"));
var Accordeon = function (_a) {
    var isStashDeveloper = _a.isStashDeveloper;
    var _b = react_1.default.useState(false), open = _b[0], setOpen = _b[1];
    var handleDrawerOpen = function () {
        setOpen(true);
    };
    var handleDrawerClose = function () {
        setOpen(false);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement(adminAppToolbar_1.default, { open: open, handleDrawerOpen: handleDrawerOpen }),
        react_1.default.createElement(adminDrawer_1.default, { open: open, handleDrawerClose: handleDrawerClose, isStashDeveloper: isStashDeveloper })));
};
exports.default = Accordeon;
