"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var styles_1 = require("@material-ui/core/styles");
var subscribes_1 = require("../../../../../../BLL/store/selectors/subscribes");
var Toc_1 = __importDefault(require("@material-ui/icons/Toc"));
var dialog_1 = __importDefault(require("../../../dialog/dialog"));
var addRepositoryPanel_1 = __importDefault(require("../../../repositories/addWindow/addRepositoryPanel"));
var subscribesActionCreators_1 = require("../../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators");
var core_1 = require("@material-ui/core");
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var addDeveloperPanel_1 = __importDefault(require("../../../developers/addWindow/addDeveloperPanel"));
var useStyles = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '440px',
        },
        button: {
            margin: theme.spacing(3),
        }
    });
});
var SubscribeEditingForm = function (_a) {
    var subscribe = _a.subscribe, setRepository = _a.setRepository, setDeveloper = _a.setDeveloper, isRepositoryPanelDisplayed = _a.isRepositoryPanelDisplayed, isDeveloperPanelDisplayed = _a.isDeveloperPanelDisplayed, toggleAddRepositoryPanel = _a.toggleAddRepositoryPanel, toggleAddDeveloperPanel = _a.toggleAddDeveloperPanel;
    var classes = useStyles();
    return (react_1.default.createElement(Grid_1.default, { container: true, spacing: 3 },
        react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
            react_1.default.createElement(core_1.TextField, { id: "followed", label: "Developer", className: classes.textField, value: subscribe.followed, onChange: setDeveloper, margin: "normal" }),
            react_1.default.createElement(IconButton_1.default, { size: "small", className: classes.button, "aria-label": "add-developer", onClick: toggleAddDeveloperPanel },
                react_1.default.createElement(Toc_1.default, null))),
        react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
            react_1.default.createElement(core_1.TextField, { id: "repository", label: "Repository", className: classes.textField, value: subscribe.reponame, onChange: setRepository, margin: "normal" }),
            react_1.default.createElement(IconButton_1.default, { size: "small", className: classes.button, "aria-label": "add-repository", onClick: toggleAddRepositoryPanel },
                react_1.default.createElement(Toc_1.default, null))),
        react_1.default.createElement(dialog_1.default, { dialogTitle: "Select repository", open: isRepositoryPanelDisplayed, handleClose: toggleAddRepositoryPanel, actions: [{ text: 'Cancel', onClick: toggleAddRepositoryPanel }] },
            react_1.default.createElement(addRepositoryPanel_1.default, null)),
        react_1.default.createElement(dialog_1.default, { dialogTitle: "Select developer", open: isDeveloperPanelDisplayed, handleClose: toggleAddDeveloperPanel, actions: [{ text: 'Cancel', onClick: toggleAddDeveloperPanel }] },
            react_1.default.createElement(addDeveloperPanel_1.default, null))));
};
var mapStateToProps = function (state) { return ({
    isRepositoryPanelDisplayed: subscribes_1.selectIsRepositoryEditing(state),
    isDeveloperPanelDisplayed: subscribes_1.selectIsDeveloperEditing(state),
    subscribe: subscribes_1.selectSubscribe(state)
}); };
var mapDispatchToProps = function (dispatch) { return ({
    toggleAddRepositoryPanel: function () {
        dispatch(subscribesActionCreators_1.toggleEditingRepositoryWindow());
    },
    toggleAddDeveloperPanel: function () {
        dispatch(subscribesActionCreators_1.toggleEditingDeveloperWindow());
    },
    setRepository: function (event) {
        dispatch(subscribesActionCreators_1.setSubscribe({ reponame: event.target.value }));
    },
    setDeveloper: function (event) {
        dispatch(subscribesActionCreators_1.setSubscribe({ followed: event.target.value }));
    }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SubscribeEditingForm);
