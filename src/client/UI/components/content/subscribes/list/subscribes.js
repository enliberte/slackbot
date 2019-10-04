"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var List_1 = __importDefault(require("@material-ui/core/List"));
var subscribes_1 = require("../../../../../BLL/store/selectors/subscribes");
var subscribe_1 = __importDefault(require("./subscribe"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var Fab_1 = __importDefault(require("@material-ui/core/Fab"));
var Add_1 = __importDefault(require("@material-ui/icons/Add"));
var subscribesActionCreators_1 = require("../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators");
var subscribeEditingWindow_1 = __importDefault(require("../editWindow/subscribeEditingWindow"));
var useStyles = core_1.makeStyles(function (theme) {
    return core_1.createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
        },
        paper: {
            margin: theme.spacing(1) + "px 0px",
            padding: theme.spacing(2),
        }
    });
});
var Subscribes = function (_a) {
    var subscribes = _a.subscribes, openSubscribeEditingWindow = _a.openSubscribeEditingWindow;
    var classes = useStyles();
    return (react_1.default.createElement(Grid_1.default, { item: true, xs: 9 },
        react_1.default.createElement(Paper_1.default, { className: classes.paper },
            react_1.default.createElement(subscribeEditingWindow_1.default, null),
            react_1.default.createElement(Fab_1.default, { size: "small", color: "primary", "aria-label": "add", onClick: openSubscribeEditingWindow },
                react_1.default.createElement(Add_1.default, null)),
            react_1.default.createElement(List_1.default, { className: classes.root }, subscribes.map(function (subscribe) { return react_1.default.createElement(subscribe_1.default, { key: subscribe.reponame, subscribe: subscribe }); })))));
};
var mapStateToProps = function (state) { return ({
    subscribes: subscribes_1.selectSubscribes(state)
}); };
var mapDispatchToProps = function (dispatch) { return ({
    openSubscribeEditingWindow: function () {
        dispatch(subscribesActionCreators_1.toggleEditingWindow());
    }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Subscribes);
