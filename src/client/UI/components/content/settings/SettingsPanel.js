"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var SettingsEditForm_1 = __importDefault(require("./settingsEditForm/SettingsEditForm"));
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var core_1 = require("@material-ui/core");
var styles_1 = __importDefault(require("./styles"));
var developersActionCreators_1 = require("../../../../BLL/store/action_creators/developers/developersActionCreators");
var settings_1 = require("../../../../BLL/store/selectors/settings");
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Close_1 = __importDefault(require("@material-ui/icons/Close"));
var settingsActionCreators_1 = require("../../../../BLL/store/action_creators/settings/settingsActionCreators");
var SettingsPanel = function (_a) {
    var getStashDevelopers = _a.getStashDevelopers, isSaveSuccessDisplayed = _a.isSaveSuccessDisplayed, closeSaveSuccess = _a.closeSaveSuccess;
    var classes = styles_1.default();
    react_1.default.useEffect(function () {
        closeSaveSuccess();
        getStashDevelopers();
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Paper_1.default, { className: classes.root },
            react_1.default.createElement(core_1.Typography, { variant: "h5", component: "h3", style: { marginBottom: '20px' } }, "Settings"),
            react_1.default.createElement(SettingsEditForm_1.default, null)),
        react_1.default.createElement(core_1.Snackbar, { anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            }, open: isSaveSuccessDisplayed, autoHideDuration: 3000, onClose: closeSaveSuccess, ContentProps: {
                'aria-describedby': 'message-id',
            }, message: react_1.default.createElement("span", { id: "message-id" }, "Settings saved successfully"), action: [
                react_1.default.createElement(IconButton_1.default, { key: "close", "aria-label": "close", color: "inherit", className: classes.close, onClick: closeSaveSuccess },
                    react_1.default.createElement(Close_1.default, null)),
            ] })));
};
var mapStateToProps = function (state) { return ({
    isSaveSuccessDisplayed: settings_1.selectIsSaveSuccessDisplayed(state)
}); };
var mapDispatchToProps = function (dispatch) { return ({
    getStashDevelopers: function () {
        dispatch(developersActionCreators_1.runGetStashDevelopersSaga());
    },
    closeSaveSuccess: function () {
        dispatch(settingsActionCreators_1.setSaveSuccessDisplayed(false));
    }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SettingsPanel);
