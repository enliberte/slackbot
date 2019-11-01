"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Checkbox_1 = __importDefault(require("@material-ui/core/Checkbox"));
var FormControlLabel_1 = __importDefault(require("@material-ui/core/FormControlLabel"));
var core_1 = require("@material-ui/core");
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var AdminTableTitle = function (_a) {
    var titleText = _a.titleText, isFavoriteOnly = _a.isFavoriteOnly, setIsFavoriteOnly = _a.setIsFavoriteOnly;
    return (react_1.default.createElement(core_1.Grid, { container: true, spacing: 3 },
        react_1.default.createElement(core_1.Grid, { item: true },
            react_1.default.createElement(Typography_1.default, { variant: "h6", style: { lineHeight: 2 } }, titleText)),
        react_1.default.createElement(core_1.Grid, { item: true },
            react_1.default.createElement(FormControlLabel_1.default, { control: react_1.default.createElement(Checkbox_1.default, { color: "primary", value: isFavoriteOnly, onChange: function () { return setIsFavoriteOnly(!isFavoriteOnly); } }), label: react_1.default.createElement(Typography_1.default, { style: { fontSize: "0.8rem" } }, "Favorite Only"), labelPlacement: "start" }))));
};
exports.default = AdminTableTitle;
