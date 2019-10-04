"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var core_1 = require("@material-ui/core");
var react_redux_1 = require("react-redux");
var ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
var ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
var Delete_1 = __importDefault(require("@material-ui/icons/Delete"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var useStyles = core_1.makeStyles(function (theme) {
    return core_1.createStyles({
        inline: {
            display: 'inline',
        },
        button: {
            margin: theme.spacing(1),
        }
    });
});
var Subscribe = function (_a) {
    var subscribe = _a.subscribe, deleteSubscribe = _a.deleteSubscribe;
    var classes = useStyles();
    return (react_1.default.createElement(ListItem_1.default, { button: true },
        react_1.default.createElement(ListItemText_1.default, { primary: react_1.default.createElement(Grid_1.default, { container: true, spacing: 3 },
                react_1.default.createElement(Grid_1.default, { item: true, xs: 4 },
                    react_1.default.createElement(Typography_1.default, { component: "span", variant: "body2", className: classes.inline, color: "textPrimary" }, subscribe.followed)),
                react_1.default.createElement(Grid_1.default, { item: true, xs: 8 },
                    react_1.default.createElement(Typography_1.default, { component: "span", variant: "body2", className: classes.inline, color: "textPrimary" }, subscribe.reponame))) }),
        react_1.default.createElement(IconButton_1.default, { size: "small", className: classes.button, "aria-label": "delete", onClick: function () { return deleteSubscribe({ reponame: subscribe.reponame }); } },
            react_1.default.createElement(Delete_1.default, null))));
};
var mapDispatchToProps = function (dispatch) { return ({
    deleteSubscribe: function (filters) {
        // dispatch(runDeleteSubscribeSaga(filters))
    }
}); };
exports.default = react_redux_1.connect(null, mapDispatchToProps)(Subscribe);
