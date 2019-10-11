"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Tabs_1 = __importDefault(require("@material-ui/core/Tabs"));
var Tab_1 = __importDefault(require("@material-ui/core/Tab"));
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var useStyles = styles_1.makeStyles({
    root: {
        margin: '40px 0px 0px 0px',
        flexGrow: 1
    },
});
var ItemTabs = function (_a) {
    var tabs = _a.tabs;
    var classes = useStyles();
    var _b = react_1.default.useState(0), value = _b[0], setValue = _b[1];
    var handleChange = function (event, newValue) {
        setValue(newValue);
    };
    return (react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
        react_1.default.createElement(core_1.Paper, { square: true, className: classes.root },
            react_1.default.createElement(Tabs_1.default, { value: value, onChange: handleChange, variant: "fullWidth", indicatorColor: "secondary", textColor: "secondary" }, tabs.map(function (tab) { return react_1.default.createElement(Tab_1.default, { label: tab.label, onClick: tab.clickHandler }); })))));
};
exports.default = ItemTabs;
