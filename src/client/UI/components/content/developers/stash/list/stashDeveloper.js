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
var developersActionCreators_1 = require("../../../../../../BLL/store/action_creators/developers/developersActionCreators");
var colors_1 = require("@material-ui/core/colors");
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
var StashDeveloper = function (_a) {
    var developer = _a.developer, addStashDeveloperToFavorites = _a.addStashDeveloperToFavorites, removeStashDeveloperFromFavorites = _a.removeStashDeveloperFromFavorites;
    var classes = useStyles();
    var _b = react_1.default.useState(developer.isFollow), isActive = _b[0], setIsActive = _b[1];
    var activityClass = isActive ? 'active' : 'passive';
    var handleClick = function () {
        if (isActive) {
            removeStashDeveloperFromFavorites(developer.displayName);
        }
        else {
            addStashDeveloperToFavorites(developer.displayName);
        }
        setIsActive(!isActive);
    };
    return (react_1.default.createElement(ListItem_1.default, { button: true },
        react_1.default.createElement(ListItemText_1.default, { primary: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Typography_1.default, { component: "span", variant: "body2", className: classes.inline, color: "textPrimary" }, developer.displayName)) }),
        react_1.default.createElement(IconButton_1.default, { size: "small", className: classes.button, "aria-label": "to_favorites", onClick: handleClick },
            react_1.default.createElement(StarBorder_1.default, { className: classes.icon + " " + activityClass }))));
};
var mapDispatchToProps = function (dispatch) { return ({
    addStashDeveloperToFavorites: function (developerDisplayName) {
        dispatch(developersActionCreators_1.runAddStashDeveloperToFavoritesSaga(developerDisplayName));
    },
    removeStashDeveloperFromFavorites: function (developerDisplayName) {
        dispatch(developersActionCreators_1.runDeleteFavoriteDeveloperSaga({ username: developerDisplayName }));
    }
}); };
exports.default = react_redux_1.connect(null, mapDispatchToProps)(StashDeveloper);
