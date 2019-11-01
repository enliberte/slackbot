"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
// @ts-ignore
var DevelopersTable_1 = __importDefault(require("./favorite/DevelopersTable"));
// @ts-ignore
var DevelopersTable_2 = __importDefault(require("./stash/DevelopersTable"));
var FavoriteTabs_1 = __importDefault(require("../../../common/tabs/favoriteTabs/FavoriteTabs"));
var AddDeveloperPanel = function (_a) {
    var handleClick = _a.handleClick;
    var _b = react_1.default.useState(true), isFavoriteTabActive = _b[0], setIsFavoriteTabActive = _b[1];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(FavoriteTabs_1.default, { setActiveTab: setIsFavoriteTabActive }),
        isFavoriteTabActive ? react_1.default.createElement(DevelopersTable_1.default, { handleClick: handleClick }) : react_1.default.createElement(DevelopersTable_2.default, { handleClick: handleClick })));
};
exports.default = AddDeveloperPanel;
