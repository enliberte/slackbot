"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var tabs_1 = __importDefault(require("../tabs"));
var FavoriteTabs = function (_a) {
    var setActiveTab = _a.setActiveTab;
    return (react_1.default.createElement(tabs_1.default, { tabs: [
            { label: 'FAVORITES', clickHandler: function () { return setActiveTab(true); } },
            { label: 'ALL', clickHandler: function () { return setActiveTab(false); } }
        ] }));
};
exports.default = FavoriteTabs;
