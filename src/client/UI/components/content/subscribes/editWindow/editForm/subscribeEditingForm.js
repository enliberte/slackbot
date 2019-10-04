"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var subscribes_1 = require("../../../../../../BLL/store/selectors/subscribes");
var Toc_1 = __importDefault(require("@material-ui/icons/Toc"));
var SubscribeEditingForm = function (_a) {
    var followed = _a.followed, openAddRepositoryPanel = _a.openAddRepositoryPanel;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("span", null, followed),
        react_1.default.createElement(Toc_1.default, { onClick: openAddRepositoryPanel })));
};
var mapStateToProps = function (state) { return ({
    repositoryPanelOpened: false,
    followed: subscribes_1.selectFollowed(state)
}); };
var mapDispatchToProps = function (dispatch) { return ({
    openAddRepositoryPanel: function () { }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SubscribeEditingForm);
