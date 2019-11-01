"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Avatar_1 = __importDefault(require("@material-ui/core/Avatar"));
var clipboard_copy_1 = __importDefault(require("clipboard-copy"));
var CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
var LockOutlined_1 = __importDefault(require("@material-ui/icons/LockOutlined"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var Container_1 = __importDefault(require("@material-ui/core/Container"));
var styles_1 = __importDefault(require("./styles"));
var core_1 = require("@material-ui/core");
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Close_1 = __importDefault(require("@material-ui/icons/Close"));
var Unauthorized = function () {
    var classes = styles_1.default();
    var _a = react_1.default.useState(false), isCopySnackbarDisplayed = _a[0], setIsCopySnackbarDisplayed = _a[1];
    var handleCopy = function () {
        clipboard_copy_1.default('signup');
        setIsCopySnackbarDisplayed(true);
    };
    return (react_1.default.createElement(Container_1.default, { component: "main", maxWidth: "xs" },
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement("div", { className: classes.paper },
            react_1.default.createElement(Avatar_1.default, { className: classes.avatar },
                react_1.default.createElement(LockOutlined_1.default, null)),
            react_1.default.createElement(Typography_1.default, { component: "h1", variant: "h5" }, "Sign in"),
            react_1.default.createElement(Typography_1.default, { className: classes.tip },
                "Send to slackbot a message with text ",
                react_1.default.createElement("a", { className: classes.signup, onClick: handleCopy }, "signup"))),
        react_1.default.createElement(core_1.Snackbar, { anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            }, open: isCopySnackbarDisplayed, autoHideDuration: 3000, onClose: function () { return setIsCopySnackbarDisplayed(false); }, ContentProps: {
                'aria-describedby': 'message-id',
            }, message: react_1.default.createElement("span", { id: "message-id" }, "Copied to clipboard"), action: [
                react_1.default.createElement(IconButton_1.default, { key: "close", "aria-label": "close", color: "inherit", className: classes.close, onClick: function () { return setIsCopySnackbarDisplayed(false); } },
                    react_1.default.createElement(Close_1.default, null)),
            ] })));
};
exports.default = Unauthorized;
