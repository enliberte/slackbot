"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var stashRepository_1 = __importDefault(require("./stashRepository"));
var List_1 = __importDefault(require("@material-ui/core/List"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var stashRepositoriesSearch_1 = __importDefault(require("../search/stashRepositoriesSearch"));
var CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
var fetching_1 = require("../../../../../../BLL/store/selectors/fetching");
var repositories_1 = require("../../../../../../BLL/store/selectors/repositories");
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
var StashRepositories = function (_a) {
    var isFetching = _a.isFetching, repositories = _a.repositories;
    var classes = useStyles();
    return (react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
        react_1.default.createElement(Paper_1.default, { className: classes.paper },
            react_1.default.createElement(stashRepositoriesSearch_1.default, null),
            isFetching ? react_1.default.createElement(CircularProgress_1.default, { className: classes.progress }) :
                react_1.default.createElement(List_1.default, { className: classes.root }, repositories.map(function (repository) { return react_1.default.createElement(stashRepository_1.default, { key: repository.links.self[0].href, repository: repository }); })))));
};
var mapStateToProps = function (state) { return ({
    repositories: repositories_1.selectStashRepositories(state),
    isFetching: fetching_1.selectIsFetching(state)
}); };
exports.default = react_redux_1.connect(mapStateToProps)(StashRepositories);
