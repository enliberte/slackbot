"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var clsx_1 = __importDefault(require("clsx"));
var styles_1 = __importDefault(require("./styles"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var ChevronLeft_1 = __importDefault(require("@material-ui/icons/ChevronLeft"));
var Divider_1 = __importDefault(require("@material-ui/core/Divider"));
var Drawer_1 = __importDefault(require("@material-ui/core/Drawer"));
var adminDrawerList_1 = __importDefault(require("./drawerList/adminDrawerList"));
var AdminDrawer = function (_a) {
    var _b, _c;
    var open = _a.open, handleDrawerClose = _a.handleDrawerClose, isStashDeveloper = _a.isStashDeveloper;
    var classes = styles_1.default();
    return (react_1.default.createElement(Drawer_1.default, { variant: "permanent", className: clsx_1.default(classes.drawer, (_b = {},
            _b[classes.drawerOpen] = open,
            _b[classes.drawerClose] = !open,
            _b)), classes: {
            paper: clsx_1.default((_c = {},
                _c[classes.drawerOpen] = open,
                _c[classes.drawerClose] = !open,
                _c)),
        }, open: open },
        react_1.default.createElement("div", { className: classes.toolbar },
            react_1.default.createElement(IconButton_1.default, { onClick: handleDrawerClose },
                react_1.default.createElement(ChevronLeft_1.default, null))),
        react_1.default.createElement(Divider_1.default, null),
        react_1.default.createElement(adminDrawerList_1.default, { isStashDeveloper: isStashDeveloper })));
};
exports.default = AdminDrawer;
