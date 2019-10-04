"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var search_1 = __importDefault(require("../../../../navigation/search/search"));
var developers_1 = require("../../../../../../BLL/store/selectors/developers");
var developersActionCreators_1 = require("../../../../../../BLL/store/action_creators/developers/developersActionCreators");
var react_redux_1 = require("react-redux");
var StashDevelopersSearch = function (_a) {
    var search = _a.search, handleSearch = _a.handleSearch;
    return (react_1.default.createElement(search_1.default, { search: search, handleSearch: handleSearch }));
};
var mapStateToProps = function (state) { return ({
    search: developers_1.selectFilterStashDevelopersTerm(state)
}); };
var mapDispatchToProps = function (dispatch) { return ({
    handleSearch: function (event) {
        dispatch(developersActionCreators_1.filterStashDevelopers(event.target.value));
    }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(StashDevelopersSearch);
