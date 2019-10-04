"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styles_1 = require("@material-ui/core/styles");
var Search_1 = __importDefault(require("@material-ui/icons/Search"));
var InputBase_1 = __importDefault(require("@material-ui/core/InputBase"));
var useStyles = styles_1.makeStyles(function (theme) {
    var _a, _b;
    return ({
        search: (_a = {
                position: 'relative',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: styles_1.fade(theme.palette.common.white, 0.15),
                '&:hover': {
                    backgroundColor: styles_1.fade(theme.palette.common.white, 0.25),
                },
                marginLeft: 0,
                width: '100%'
            },
            _a[theme.breakpoints.up('sm')] = {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
            _a),
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: (_b = {
                padding: theme.spacing(1, 1, 1, 7),
                transition: theme.transitions.create('width'),
                width: '100%'
            },
            _b[theme.breakpoints.up('sm')] = {
                width: 120,
                '&:focus': {
                    width: 200,
                },
            },
            _b)
    });
});
var Search = function (_a) {
    var search = _a.search, handleSearch = _a.handleSearch;
    var classes = useStyles();
    return (react_1.default.createElement("div", { className: classes.search },
        react_1.default.createElement("div", { className: classes.searchIcon },
            react_1.default.createElement(Search_1.default, null)),
        react_1.default.createElement(InputBase_1.default, { placeholder: "Search\u2026", classes: {
                root: classes.inputRoot,
                input: classes.inputInput,
            }, inputProps: { 'aria-label': 'search' }, value: search, onChange: handleSearch })));
};
exports.default = Search;
