"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var tocAdminIconButton_1 = __importDefault(require("../../buttons/iconButtons/tocAdminIconButton/tocAdminIconButton"));
var textfield_1 = __importDefault(require("../textfield/textfield"));
var dialog_1 = __importDefault(require("../../dialog/dialog"));
var core_1 = require("@material-ui/core");
var AdminTextFieldWithSelection = function (_a) {
    var value = _a.value, onChange = _a.onChange, isValid = _a.isValid, label = _a.label, focused = _a.focused, dialogTitle = _a.dialogTitle, toggleAddPanel = _a.toggleAddPanel, isAddPanelOpened = _a.isAddPanelOpened, children = _a.children, data = _a.data;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Grid, { container: true, xs: 12, spacing: 2 },
            react_1.default.createElement(core_1.Grid, { item: true, xs: 11 },
                react_1.default.createElement(textfield_1.default, { value: value, onChange: onChange, focused: focused, isValid: isValid, label: label, data: data })),
            react_1.default.createElement(core_1.Grid, { item: true, xs: 1 },
                react_1.default.createElement(tocAdminIconButton_1.default, { handleClick: toggleAddPanel }))),
        react_1.default.createElement(dialog_1.default, { dialogTitle: dialogTitle, open: isAddPanelOpened, handleClose: toggleAddPanel, actions: [{ text: 'Cancel', onClick: toggleAddPanel }] }, children)));
};
exports.default = AdminTextFieldWithSelection;
