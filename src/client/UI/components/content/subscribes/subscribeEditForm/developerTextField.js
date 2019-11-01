"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var textfieldWithSelection_1 = __importDefault(require("../../../common/textfields/textfieldWithSelection/textfieldWithSelection"));
var AddDeveloperPanel_1 = __importDefault(require("../../developers/addDevelopersPanel/AddDeveloperPanel"));
var react_redux_1 = require("react-redux");
var subscribes_1 = require("../../../../../BLL/store/selectors/subscribes");
var developers_1 = require("../../../../../BLL/store/selectors/developers");
var subscribesActionCreators_1 = require("../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators");
var DeveloperTextfield = function (_a) {
    var value = _a.value, onChange = _a.onChange, isValid = _a.isValid, errorText = _a.errorText, developersSuggests = _a.developersSuggests, toggleAddDeveloperPanel = _a.toggleAddDeveloperPanel, isDeveloperPanelDisplayed = _a.isDeveloperPanelDisplayed, clearErrors = _a.clearErrors;
    var label = isValid ? 'Developer Name' : errorText;
    react_1.default.useEffect(function () {
        clearErrors();
    }, []);
    return (react_1.default.createElement(textfieldWithSelection_1.default, { dialogTitle: "Click on developer to choose", value: value || '', focused: true, onChange: onChange, isValid: isValid, label: label, data: developersSuggests, toggleAddPanel: toggleAddDeveloperPanel, isAddPanelOpened: isDeveloperPanelDisplayed },
        react_1.default.createElement(AddDeveloperPanel_1.default, { handleClick: onChange })));
};
var mapStateToProps = function (state) { return ({
    isDeveloperPanelDisplayed: subscribes_1.selectIsDeveloperEditing(state),
    developersSuggests: developers_1.selectStashDevelopersSuggests(state),
    isValid: subscribes_1.selectIsDeveloperValid(state),
    errorText: subscribes_1.selectDeveloperErrorText(state),
}); };
var mapDispatchToProps = function (dispatch) { return ({
    toggleAddDeveloperPanel: function () {
        dispatch(subscribesActionCreators_1.toggleEditingDeveloperWindow());
    },
    clearErrors: function () {
        dispatch(subscribesActionCreators_1.setIsSuccess(true));
        dispatch(subscribesActionCreators_1.setSubscribeError({ developer: '', repository: '', subscribe: '' }));
    }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DeveloperTextfield);
