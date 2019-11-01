"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var adminIconButton_1 = __importDefault(require("../adminIconButton"));
var ChevronRight_1 = __importDefault(require("@material-ui/icons/ChevronRight"));
var ChevronLeft_1 = __importDefault(require("@material-ui/icons/ChevronLeft"));
var ToggleMassAdminIconButton = function (_a) {
    var isOpened = _a.isOpened, handleClick = _a.handleClick;
    return (react_1.default.createElement(adminIconButton_1.default, { handleClick: handleClick }, isOpened ? react_1.default.createElement(ChevronLeft_1.default, null) : react_1.default.createElement(ChevronRight_1.default, null)));
};
exports.default = ToggleMassAdminIconButton;
