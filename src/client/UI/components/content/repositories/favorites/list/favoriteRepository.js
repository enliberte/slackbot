"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var core_1 = require("@material-ui/core");
var subscribesActionCreators_1 = require("../../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators");
var react_redux_1 = require("react-redux");
var ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
var ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Delete_1 = __importDefault(require("@material-ui/icons/Delete"));
var repositoriesActionCreators_1 = require("../../../../../../BLL/store/action_creators/repositories/repositoriesActionCreators");
var useStyles = core_1.makeStyles(function (theme) {
    return core_1.createStyles({
        inline: {
            display: 'inline',
        },
        button: {
            margin: theme.spacing(1),
        },
    });
});
var FavoriteRepository = function (_a) {
    var repository = _a.repository, setRepository = _a.setRepository, deleteRepository = _a.deleteRepository;
    var classes = useStyles();
    return (react_1.default.createElement(ListItem_1.default, { button: true, onClick: function () { return setRepository(repository.reponame); } },
        react_1.default.createElement(ListItemText_1.default, { primary: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Typography_1.default, { component: "span", variant: "body2", className: classes.inline, color: "textPrimary" }, repository.reponame)) }),
        react_1.default.createElement(IconButton_1.default, { size: "small", className: classes.button, "aria-label": "delete", onClick: function () { return deleteRepository({ reponame: repository.reponame }); } },
            react_1.default.createElement(Delete_1.default, null))));
};
var mapDispatchToProps = function (dispatch) { return ({
    setRepository: function (reponame) {
        dispatch(subscribesActionCreators_1.setSubscribeFilters({ reponame: reponame }));
    },
    deleteRepository: function (filters) {
        dispatch(repositoriesActionCreators_1.runDeleteFavoriteRepositorySaga(filters));
    }
}); };
exports.default = react_redux_1.connect(null, mapDispatchToProps)(FavoriteRepository);
