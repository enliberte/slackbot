"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var favoriteRepositories_1 = __importDefault(require("./favoriteRepositories"));
var repositoriesActionCreators_1 = require("../../../../../../BLL/store/action_creators/repositories/repositoriesActionCreators");
var FavoriteRepositoriesContainer = function (_a) {
    var getRepositories = _a.getRepositories;
    react_1.default.useEffect(function () {
        getRepositories();
    });
    return react_1.default.createElement(favoriteRepositories_1.default, null);
};
var mapDispatchToProps = function (dispatch) { return ({
    getRepositories: function () {
        dispatch(repositoriesActionCreators_1.runGetFavoriteRepositoriesSaga());
    }
}); };
exports.default = react_redux_1.connect(null, mapDispatchToProps)(FavoriteRepositoriesContainer);
