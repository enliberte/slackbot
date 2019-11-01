"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Search_1 = __importDefault(require("@material-ui/icons/Search"));
var InputBase_1 = __importDefault(require("@material-ui/core/InputBase"));
var styles_1 = __importDefault(require("./styles"));
var Search = function (_a) {
    var search = _a.search, handleSearch = _a.handleSearch;
    var classes = styles_1.default();
    return (react_1.default.createElement("div", { className: classes.search },
        react_1.default.createElement("div", { className: classes.searchIcon },
            react_1.default.createElement(Search_1.default, null)),
        react_1.default.createElement(InputBase_1.default, { placeholder: "Search\u2026", classes: {
                root: classes.inputRoot,
                input: classes.inputInput,
            }, inputProps: { 'aria-label': 'search' }, value: search, onChange: handleSearch })));
};
exports.default = Search;
