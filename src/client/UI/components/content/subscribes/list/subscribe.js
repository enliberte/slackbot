"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
var subscribesActionCreators_1 = require("../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators");
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
    var subscribe = _a.subscribe, deleteSubscribe = _a.deleteSubscribe, openSubscribeEditingWindow = _a.openSubscribeEditingWindow;
    var classes = useStyles();
    return (react_1.default.createElement(ListItem_1.default, { button: true },
        react_1.default.createElement(ListItemText_1.default, { primary: react_1.default.createElement(Grid_1.default, { container: true, spacing: 3, onClick: function () { return openSubscribeEditingWindow({ reponame: subscribe.reponame, followed: subscribe.followed, id: subscribe.id }); } },
                react_1.default.createElement(Grid_1.default, { item: true, xs: 4 },
                    react_1.default.createElement(Typography_1.default, { component: "span", variant: "body2", className: classes.inline, color: "textPrimary" }, subscribe.followed)),
                react_1.default.createElement(Grid_1.default, { item: true, xs: 8 },
                    react_1.default.createElement(Typography_1.default, { component: "span", variant: "body2", className: classes.inline, color: "textPrimary" }, subscribe.reponame))) }),
        react_1.default.createElement(IconButton_1.default, { size: "small", className: classes.button, "aria-label": "delete", onClick: function () { return deleteSubscribe(subscribe); } },
            react_1.default.createElement(Delete_1.default, null))));
};
var mapDispatchToProps = function (dispatch) { return ({
    deleteSubscribe: function (subscribe) {
        var id = subscribe.id, subscribeData = __rest(subscribe, ["id"]);
        dispatch(subscribesActionCreators_1.runDeleteSubscribeSaga(subscribeData));
    },
    openSubscribeEditingWindow: function (subscribeData) {
        dispatch(subscribesActionCreators_1.setIsNew(false));
        dispatch(subscribesActionCreators_1.setSubscribe(subscribeData));
        dispatch(subscribesActionCreators_1.toggleEditingWindow());
    }
}); };
exports.default = react_redux_1.connect(null, mapDispatchToProps)(Subscribe);
