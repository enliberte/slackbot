"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var adminIconButton_1 = __importDefault(require("../adminIconButton"));
var StarBorder_1 = __importDefault(require("@material-ui/icons/StarBorder"));
var clsx_1 = __importDefault(require("clsx"));
var styles_1 = __importDefault(require("./styles"));
var FavoriteAdminIconButton = function (_a) {
    var isFavorite = _a.isFavorite, handleClick = _a.handleClick;
    var classes = styles_1.default();
    return (react_1.default.createElement(adminIconButton_1.default, { handleClick: handleClick },
        react_1.default.createElement(StarBorder_1.default, { className: clsx_1.default(classes.icon, { 'active': isFavorite }) })));
};
exports.default = FavoriteAdminIconButton;
