"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var subscribes_1 = __importDefault(require("./subscribes"));
var subscribesActionCreators_1 = require("../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators");
var SubscribesContainer = function (_a) {
    var getSubscribes = _a.getSubscribes;
    react_1.default.useEffect(function () {
        getSubscribes();
    });
    return react_1.default.createElement(subscribes_1.default, null);
};
var mapDispatchToProps = function (dispatch) { return ({
    getSubscribes: function () {
        dispatch(subscribesActionCreators_1.runGetSubscribesSaga());
    }
}); };
exports.default = react_redux_1.connect(null, mapDispatchToProps)(SubscribesContainer);
