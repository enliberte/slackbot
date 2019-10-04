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
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var StarBorder_1 = __importDefault(require("@material-ui/icons/StarBorder"));
var colors_1 = require("@material-ui/core/colors");
var repositoriesActionCreators_1 = require("../../../../../../BLL/store/action_creators/repositories/repositoriesActionCreators");
var useStyles = core_1.makeStyles(function (theme) {
    return core_1.createStyles({
        inline: {
            display: 'inline',
        },
        button: {
            margin: theme.spacing(1),
        },
        icon: {
            '&:hover, &.active': {
                color: colors_1.red[800],
            }
        }
    });
});
var StashRepository = function (_a) {
    var repository = _a.repository, addStashRepositoryToFavorites = _a.addStashRepositoryToFavorites, removeStashRepositoryFromFavorites = _a.removeStashRepositoryFromFavorites;
    var classes = useStyles();
    var _b = react_1.default.useState(repository.isFavorite), isActive = _b[0], setIsActive = _b[1];
    var activityClass = isActive ? 'active' : 'passive';
    var handleClick = function () {
        if (isActive) {
            removeStashRepositoryFromFavorites(repository.links.self[0].href);
        }
        else {
            addStashRepositoryToFavorites(repository.links.self[0].href);
        }
        setIsActive(!isActive);
    };
    return (react_1.default.createElement(ListItem_1.default, { button: true },
        react_1.default.createElement(ListItemText_1.default, { primary: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Typography_1.default, { component: "span", variant: "body2", className: classes.inline, color: "textPrimary" }, repository.links.self[0].href)) }),
        react_1.default.createElement(IconButton_1.default, { size: "small", className: classes.button, "aria-label": "to_favorites", onClick: handleClick },
            react_1.default.createElement(StarBorder_1.default, { className: classes.icon + " " + activityClass }))));
};
var mapDispatchToProps = function (dispatch) { return ({
    addStashRepositoryToFavorites: function (reponame) {
        dispatch(repositoriesActionCreators_1.runAddStashRepositoryToFavoritesSaga(reponame));
    },
    removeStashRepositoryFromFavorites: function (reponame) {
        dispatch(repositoriesActionCreators_1.runDeleteFavoriteRepositorySaga({ reponame: reponame }));
    }
}); };
exports.default = react_redux_1.connect(null, mapDispatchToProps)(StashRepository);
