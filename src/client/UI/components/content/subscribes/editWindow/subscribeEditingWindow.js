"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var subscribes_1 = require("../../../../../BLL/store/selectors/subscribes");
var dialog_1 = __importDefault(require("../../dialog/dialog"));
var subscribesActionCreators_1 = require("../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators");
var subscribeEditingForm_1 = __importDefault(require("./editForm/subscribeEditingForm"));
var SubscribeEditingWindow = function (_a) {
    var open = _a.open, isNew = _a.isNew, handleClose = _a.handleClose, saveSubscribe = _a.saveSubscribe, editSubscribe = _a.editSubscribe;
    var actions = [
        { text: 'Cancel', onClick: handleClose },
        isNew ? { text: 'Subscribe', onClick: saveSubscribe } : { text: 'Edit', onClick: editSubscribe }
    ];
    return (react_1.default.createElement(dialog_1.default, { open: open, handleClose: handleClose, dialogTitle: "Subscribe", actions: actions },
        react_1.default.createElement(subscribeEditingForm_1.default, null)));
};
var mapStateToProps = function (state) { return ({
    open: subscribes_1.selectIsSubscribeEditing(state),
    isNew: subscribes_1.selectIsNewSubscribe(state)
}); };
var mapDispatchToProps = function (dispatch) { return ({
    handleClose: function () {
        dispatch(subscribesActionCreators_1.toggleEditingWindow());
    },
    saveSubscribe: function () {
        dispatch(subscribesActionCreators_1.runSaveSubscribeSaga());
    },
    editSubscribe: function () {
        dispatch(subscribesActionCreators_1.runEditSubscribeSaga());
    }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SubscribeEditingWindow);
