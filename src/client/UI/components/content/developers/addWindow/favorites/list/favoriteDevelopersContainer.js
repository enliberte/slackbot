"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var favoriteDevelopers_1 = __importDefault(require("./favoriteDevelopers"));
var developersActionCreators_1 = require("../../../../../../../BLL/store/action_creators/developers/developersActionCreators");
var FavoriteDevelopersContainer = function (_a) {
    var getDevelopers = _a.getDevelopers;
    react_1.default.useEffect(function () {
        getDevelopers();
    });
    return react_1.default.createElement(favoriteDevelopers_1.default, null);
};
var mapDispatchToProps = function (dispatch) { return ({
    getDevelopers: function () {
        dispatch(developersActionCreators_1.runGetFavoriteDevelopersSaga());
    }
}); };
exports.default = react_redux_1.connect(null, mapDispatchToProps)(FavoriteDevelopersContainer);
