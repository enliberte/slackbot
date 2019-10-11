"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var favoriteDevelopersContainer_1 = __importDefault(require("./favorites/list/favoriteDevelopersContainer"));
var stashDevelopersContainer_1 = __importDefault(require("./stash/list/stashDevelopersContainer"));
var developersTabs_1 = __importDefault(require("./tabs/developersTabs"));
var AddDeveloperPanel = function () {
    var _a = react_1.default.useState(true), isFavoriteTabActive = _a[0], setIsFavoriteTabActive = _a[1];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(developersTabs_1.default, { setActiveTab: setIsFavoriteTabActive }),
        isFavoriteTabActive ? react_1.default.createElement(favoriteDevelopersContainer_1.default, null) : react_1.default.createElement(stashDevelopersContainer_1.default, null)));
};
exports.default = AddDeveloperPanel;
