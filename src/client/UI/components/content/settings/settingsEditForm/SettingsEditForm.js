"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var textfield_1 = __importDefault(require("../../../common/textfields/textfield/textfield"));
var developers_1 = require("../../../../../BLL/store/selectors/developers");
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var Checkbox_1 = __importDefault(require("@material-ui/core/Checkbox"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var authActionCreators_1 = require("../../../../../BLL/store/action_creators/auth/authActionCreators");
var auth_1 = require("../../../../../BLL/store/selectors/auth");
var settings_1 = require("../../../../../BLL/store/selectors/settings");
var SettingsEditForm = function (_a) {
    var saveUser = _a.saveUser, developersSuggests = _a.developersSuggests, isStashDeveloperError = _a.isStashDeveloperError, stashDeveloperErrorText = _a.stashDeveloperErrorText, stashName = _a.stashName, isReviewNotifications = _a.isReviewNotifications, isCommentsNotifications = _a.isCommentsNotifications, isSubscribesNotifications = _a.isSubscribesNotifications;
    var _b = react_1.default.useState(stashName), stashDisplayName = _b[0], setStashDisplayName = _b[1];
    var _c = react_1.default.useState(isCommentsNotifications), commentsNotifications = _c[0], setCommentsNotifications = _c[1];
    var _d = react_1.default.useState(isReviewNotifications), reviewNotifications = _d[0], setReviewNotifications = _d[1];
    var _e = react_1.default.useState(isSubscribesNotifications), subscribesNotifications = _e[0], setSubscribesNotifications = _e[1];
    var label = isStashDeveloperError ? stashDeveloperErrorText : "Stash developer name";
    var checkboxes = [
        { label: 'Notify about new pull requests according to your subscriptions', checked: subscribesNotifications, onChange: setSubscribesNotifications },
        { label: 'Notify about pull requests where you was mentioned in comments', checked: commentsNotifications, onChange: setCommentsNotifications },
        { label: 'Notify about new pull requests where you was selected as reviewer', checked: reviewNotifications, onChange: setReviewNotifications }
    ];
    return (react_1.default.createElement(Grid_1.default, { container: true, direction: "column", spacing: 3 },
        react_1.default.createElement(Grid_1.default, { item: true },
            react_1.default.createElement(textfield_1.default, { value: stashDisplayName, onChange: function (newValue) { return setStashDisplayName(newValue); }, focused: true, isValid: !isStashDeveloperError, label: label, data: developersSuggests })),
        checkboxes.map(function (checkbox) { return (react_1.default.createElement(Grid_1.default, { item: true },
            react_1.default.createElement(core_1.FormControlLabel, { label: checkbox.label, control: react_1.default.createElement(Checkbox_1.default, { checked: checkbox.checked, onChange: function () { return checkbox.onChange(!checkbox.checked); } }) }))); }),
        react_1.default.createElement(Grid_1.default, { item: true },
            react_1.default.createElement(Button_1.default, { onClick: function () { return saveUser({ stashDisplayName: stashDisplayName, commentsNotifications: commentsNotifications, reviewNotifications: reviewNotifications, subscribesNotifications: subscribesNotifications }); }, variant: "contained", color: "primary" }, "Save"))));
};
var mapStateToProps = function (state) { return ({
    isStashDeveloperError: settings_1.selectIsStashDisplayNameError(state),
    stashDeveloperErrorText: settings_1.selectStashDisplayNameErrorText(state),
    stashName: auth_1.selectStashDisplayName(state),
    isCommentsNotifications: auth_1.selectIsCommentsNotifications(state),
    isSubscribesNotifications: auth_1.selectIsSubscribesNotifications(state),
    isReviewNotifications: auth_1.selectIsReviewNotifications(state),
    developersSuggests: developers_1.selectStashDevelopersSuggests(state)
}); };
var mapDispatchToProps = function (dispatch) { return ({
    saveUser: function (userData) {
        dispatch(authActionCreators_1.runAddStashUserSaga(userData));
    },
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SettingsEditForm);
