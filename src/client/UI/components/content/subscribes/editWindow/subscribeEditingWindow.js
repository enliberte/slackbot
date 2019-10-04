"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var subscribes_1 = require("../../../../../BLL/store/selectors/subscribes");
var modal_1 = __importDefault(require("../../modal/modal"));
var subscribesActionCreators_1 = require("../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators");
// @ts-ignore
var subscribeEditingForm_1 = __importDefault(require("./editForm/subscribeEditingForm"));
var SubscribeEditingWindow = function (_a) {
    var open = _a.open, handleClose = _a.handleClose;
    return (react_1.default.createElement(modal_1.default, { open: open, handleClose: handleClose },
        react_1.default.createElement(subscribeEditingForm_1.default, null)));
};
var mapStateToProps = function (state) { return ({
    open: subscribes_1.selectIsSubscribeEditing(state)
}); };
var mapDispatchToProps = function (dispatch) { return ({
    handleClose: function () {
        dispatch(subscribesActionCreators_1.toggleEditingWindow());
    }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SubscribeEditingWindow);
