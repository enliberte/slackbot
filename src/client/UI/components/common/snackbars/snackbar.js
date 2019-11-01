"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var clsx_1 = __importDefault(require("clsx"));
var SnackbarContent_1 = __importDefault(require("@material-ui/core/SnackbarContent"));
var Warning_1 = __importDefault(require("@material-ui/icons/Warning"));
var styles_1 = __importDefault(require("./styles"));
var core_1 = require("@material-ui/core");
var AdminWarningSnackbar = function (_a) {
    var open = _a.open, message = _a.message;
    var classes = styles_1.default();
    return (react_1.default.createElement(core_1.Snackbar, { open: open, anchorOrigin: { vertical: 'top', horizontal: 'right' }, autoHideDuration: 6000 },
        react_1.default.createElement(SnackbarContent_1.default, { className: classes.warning, "aria-describedby": "client-snackbar", message: react_1.default.createElement("span", { id: "client-snackbar", className: classes.message },
                react_1.default.createElement(Warning_1.default, { className: clsx_1.default(classes.icon, classes.iconVariant) }),
                message) })));
};
exports.default = AdminWarningSnackbar;
