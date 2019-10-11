"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var authActionCreators_1 = require("../../../BLL/store/action_creators/auth/authActionCreators");
var App_1 = __importDefault(require("./App"));
var AppContainer = function (_a) {
    var getAuthData = _a.getAuthData;
    react_1.default.useEffect(function () {
        getAuthData();
    });
    return (react_1.default.createElement(App_1.default, null));
};
var mapDispatchToProps = function (dispatch) { return ({
    getAuthData: function () {
        dispatch(authActionCreators_1.runGetAuthSaga());
    }
}); };
exports.default = react_redux_1.connect(null, mapDispatchToProps)(AppContainer);
