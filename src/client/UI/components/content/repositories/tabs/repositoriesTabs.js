"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var SvgIcon_1 = __importDefault(require("@material-ui/core/SvgIcon/SvgIcon"));
var List_1 = __importDefault(require("@material-ui/icons/List"));
var URLS_1 = __importDefault(require("../../../../URLS"));
var tabs_1 = __importDefault(require("../../../navigation/tabs/tabs"));
var tabs = [
    { icon: SvgIcon_1.default, label: 'FAVORITES', link: URLS_1.default.FAVORITE_REPOSITORIES },
    { icon: List_1.default, label: 'ALL', link: URLS_1.default.STASH_REPOSITORIES }
];
var RepositoriesTabs = function () {
    return react_1.default.createElement(tabs_1.default, { tabs: tabs });
};
exports.default = RepositoriesTabs;
