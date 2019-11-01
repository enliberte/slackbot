"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
var core_1 = require("@material-ui/core");
var DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
var DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var DialogWindow = function (_a) {
    var open = _a.open, dialogTitle = _a.dialogTitle, children = _a.children, handleClose = _a.handleClose, actions = _a.actions;
    return (react_1.default.createElement(Grid_1.default, { container: true, xs: 12 },
        react_1.default.createElement(Dialog_1.default, { fullWidth: true, maxWidth: "lg", open: open, onClose: handleClose },
            react_1.default.createElement(core_1.DialogTitle, null, dialogTitle),
            react_1.default.createElement(DialogContent_1.default, null, children),
            react_1.default.createElement(DialogActions_1.default, null, actions.map(function (action) { return react_1.default.createElement(Button_1.default, { onClick: action.onClick, color: "primary" }, action.text); })))));
};
exports.default = DialogWindow;
