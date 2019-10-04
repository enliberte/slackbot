"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var react_redux_1 = require("react-redux");
var developers_1 = require("../../../../../../BLL/store/selectors/developers");
var core_1 = require("@material-ui/core");
var stashDeveloper_1 = __importDefault(require("./stashDeveloper"));
var List_1 = __importDefault(require("@material-ui/core/List"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
var fetching_1 = require("../../../../../../BLL/store/selectors/fetching");
var stashDevelopersSearch_1 = __importDefault(require("../search/stashDevelopersSearch"));
var useStyles = core_1.makeStyles(function (theme) {
    return core_1.createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
        },
        paper: {
            margin: theme.spacing(1) + "px 0px",
            padding: theme.spacing(2),
        },
        progress: {
            margin: "auto",
        }
    });
});
var StashDevelopers = function (_a) {
    var isFetching = _a.isFetching, developers = _a.developers;
    var classes = useStyles();
    return (react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
        react_1.default.createElement(Paper_1.default, { className: classes.paper },
            react_1.default.createElement(stashDevelopersSearch_1.default, null),
            isFetching ? react_1.default.createElement(CircularProgress_1.default, { className: classes.progress }) :
                react_1.default.createElement(List_1.default, { className: classes.root }, developers.map(function (developer) { return react_1.default.createElement(stashDeveloper_1.default, { key: developer.displayName, developer: developer }); })))));
};
var mapStateToProps = function (state) { return ({
    developers: developers_1.selectStashDevelopers(state),
    isFetching: fetching_1.selectIsFetching(state)
}); };
exports.default = react_redux_1.connect(mapStateToProps)(StashDevelopers);
