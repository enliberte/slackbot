"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var textfieldWithSelection_1 = __importDefault(require("../../../common/textfields/textfieldWithSelection/textfieldWithSelection"));
var react_redux_1 = require("react-redux");
var subscribes_1 = require("../../../../../BLL/store/selectors/subscribes");
var subscribesActionCreators_1 = require("../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators");
var repositories_1 = require("../../../../../BLL/store/selectors/repositories");
var AddRepositoryPanel_1 = __importDefault(require("../../repositories/addRepositoriesPanel/AddRepositoryPanel"));
var RepositoryTextfield = function (_a) {
    var value = _a.value, onChange = _a.onChange, isValid = _a.isValid, errorText = _a.errorText, repositoriesSuggests = _a.repositoriesSuggests, toggleAddRepositoryPanel = _a.toggleAddRepositoryPanel, isRepositoryPanelDisplayed = _a.isRepositoryPanelDisplayed, clearErrors = _a.clearErrors;
    var label = isValid ? 'Repository Name' : errorText;
    react_1.default.useEffect(function () {
        clearErrors();
    }, []);
    return (react_1.default.createElement(textfieldWithSelection_1.default, { dialogTitle: "Click on repository to choose", value: value || '', focused: false, onChange: onChange, isValid: isValid, label: label, data: repositoriesSuggests, toggleAddPanel: toggleAddRepositoryPanel, isAddPanelOpened: isRepositoryPanelDisplayed },
        react_1.default.createElement(AddRepositoryPanel_1.default, { handleClick: onChange })));
};
var mapStateToProps = function (state) { return ({
    isRepositoryPanelDisplayed: subscribes_1.selectIsRepositoryEditing(state),
    repositoriesSuggests: repositories_1.selectStashRepositoriesSuggests(state),
    isValid: subscribes_1.selectIsRepositoryValid(state),
    errorText: subscribes_1.selectRepositoryErrorText(state),
}); };
var mapDispatchToProps = function (dispatch) { return ({
    toggleAddRepositoryPanel: function () {
        dispatch(subscribesActionCreators_1.toggleEditingRepositoryWindow());
    },
    clearErrors: function () {
        dispatch(subscribesActionCreators_1.setIsSuccess(true));
        dispatch(subscribesActionCreators_1.setSubscribeError({ developer: '', repository: '', subscribe: '' }));
    }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(RepositoryTextfield);
