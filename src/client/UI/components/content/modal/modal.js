"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styles_1 = require("@material-ui/core/styles");
var Modal_1 = __importDefault(require("@material-ui/core/Modal"));
var useStyles = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        paper: {
            position: 'absolute',
            left: '0',
            right: '0',
            top: '50%',
            margin: 'auto',
            width: 800,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        }
    });
});
var ModalWindow = function (_a) {
    var open = _a.open, children = _a.children, handleClose = _a.handleClose;
    var classes = useStyles();
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Modal_1.default, { open: open, onClose: handleClose },
            react_1.default.createElement("div", { className: classes.paper }, children))));
};
exports.default = ModalWindow;
