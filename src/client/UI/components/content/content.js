"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    }
}); });
var Content = function (_a) {
    var children = _a.children;
    var classes = useStyles();
    return (react_1.default.createElement("main", { className: classes.content },
        react_1.default.createElement(core_1.Grid, { container: true, spacing: 3 }, children)));
};
exports.default = Content;
