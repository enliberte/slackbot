"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var repositories_1 = require("../../../../../BLL/store/selectors/repositories");
var repositoriesActionCreators_1 = require("../../../../../BLL/store/action_creators/repositories/repositoriesActionCreators");
var react_redux_1 = require("react-redux");
var AdminTableTitle_1 = __importDefault(require("../../../common/table/tableTitle/AdminTableTitle"));
var StashRepositoriesTableTitle = function (_a) {
    var isFavoriteOnly = _a.isFavoriteOnly, setIsFavoriteOnly = _a.setIsFavoriteOnly;
    return (react_1.default.createElement(AdminTableTitle_1.default, { titleText: "Repositories", isFavoriteOnly: isFavoriteOnly, setIsFavoriteOnly: setIsFavoriteOnly }));
};
var mapStateToProps = function (state) { return ({
    isFavoriteOnly: repositories_1.selectIsFavoriteRepositoriesOnly(state),
}); };
var mapDispatchToProps = function (dispatch) { return ({
    setIsFavoriteOnly: function (isFavoriteOnly) {
        dispatch(repositoriesActionCreators_1.setIsFavoriteRepositoriesOnly(isFavoriteOnly));
    }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(StashRepositoriesTableTitle);
