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
var colors_1 = require("@material-ui/core/colors");
var subscribesActionCreators_1 = require("../../../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators");
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
    var repository = _a.repository, setRepository = _a.setRepository;
    var classes = useStyles();
    return (react_1.default.createElement(ListItem_1.default, { button: true, onClick: function () { return setRepository(repository.links.self[0].href); } },
        react_1.default.createElement(ListItemText_1.default, { primary: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Typography_1.default, { component: "span", variant: "body2", className: classes.inline, color: "textPrimary" }, repository.links.self[0].href)) })));
};
var mapDispatchToProps = function (dispatch) { return ({
    setRepository: function (reponame) {
        dispatch(subscribesActionCreators_1.setSubscribe({ reponame: reponame }));
        dispatch(subscribesActionCreators_1.toggleEditingRepositoryWindow());
    }
}); };
exports.default = react_redux_1.connect(null, mapDispatchToProps)(StashRepository);
