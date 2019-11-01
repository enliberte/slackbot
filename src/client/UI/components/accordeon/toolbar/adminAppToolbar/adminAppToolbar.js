"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var clsx_1 = __importDefault(require("clsx"));
var adminToolbar_1 = __importDefault(require("./adminToolbar/adminToolbar"));
var AppBar_1 = __importDefault(require("@material-ui/core/AppBar/AppBar"));
var styles_1 = __importDefault(require("./styles"));
var AdminAppToolbar = function (_a) {
    var _b;
    var open = _a.open, handleDrawerOpen = _a.handleDrawerOpen;
    var classes = styles_1.default();
    return (react_1.default.createElement(AppBar_1.default, { position: "fixed", className: clsx_1.default(classes.appBar, (_b = {},
            _b[classes.appBarShift] = open,
            _b)) },
        react_1.default.createElement(adminToolbar_1.default, { open: open, handleDrawerOpen: handleDrawerOpen })));
};
exports.default = AdminAppToolbar;
