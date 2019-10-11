"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var URLS_1 = __importDefault(require("../../../../../../common/URLS"));
var tabs_1 = __importDefault(require("../../../navigation/tabs/tabs"));
var react_router_dom_1 = require("react-router-dom");
var RepositoriesTabs = function (_a) {
    var history = _a.history;
    return (react_1.default.createElement(tabs_1.default, { tabs: [
            { label: 'FAVORITES', clickHandler: function () { return history.push(URLS_1.default.FAVORITE_REPOSITORIES); } },
            { label: 'ALL', clickHandler: function () { return history.push(URLS_1.default.STASH_REPOSITORIES); } }
        ] }));
};
exports.default = react_router_dom_1.withRouter(RepositoriesTabs);
