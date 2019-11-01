"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var clsx_1 = __importDefault(require("clsx"));
var Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Menu_1 = __importDefault(require("@material-ui/icons/Menu"));
var styles_1 = __importDefault(require("./styles"));
var AdminToolbar = function (_a) {
    var _b;
    var open = _a.open, handleDrawerOpen = _a.handleDrawerOpen;
    var classes = styles_1.default();
    return (react_1.default.createElement(Toolbar_1.default, null,
        react_1.default.createElement(IconButton_1.default, { color: "inherit", "aria-label": "open drawer", onClick: handleDrawerOpen, edge: "start", className: clsx_1.default(classes.menuButton, (_b = {},
                _b[classes.hide] = open,
                _b)) },
            react_1.default.createElement(Menu_1.default, null))));
};
exports.default = AdminToolbar;
