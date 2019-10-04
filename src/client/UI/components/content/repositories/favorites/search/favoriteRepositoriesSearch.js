"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var search_1 = __importDefault(require("../../../../navigation/search/search"));
var react_redux_1 = require("react-redux");
var repositories_1 = require("../../../../../../BLL/store/selectors/repositories");
var repositoriesActionCreators_1 = require("../../../../../../BLL/store/action_creators/repositories/repositoriesActionCreators");
var FavoriteRepositoriesSearch = function (_a) {
    var search = _a.search, handleSearch = _a.handleSearch;
    return (react_1.default.createElement(search_1.default, { search: search, handleSearch: handleSearch }));
};
var mapStateToProps = function (state) { return ({
    search: repositories_1.selectSearchFavoriteRepositoriesTerm(state)
}); };
var mapDispatchToProps = function (dispatch) { return ({
    handleSearch: function (event) {
        dispatch(repositoriesActionCreators_1.searchFavoriteRepositories(event.target.value));
    }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FavoriteRepositoriesSearch);
