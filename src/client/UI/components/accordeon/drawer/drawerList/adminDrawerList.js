"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var List_1 = __importDefault(require("@material-ui/core/List"));
var react_router_dom_1 = require("react-router-dom");
var ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
var ListItemIcon_1 = __importDefault(require("@material-ui/core/ListItemIcon"));
var ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
var Person_1 = __importDefault(require("@material-ui/icons/Person"));
var Notifications_1 = __importDefault(require("@material-ui/icons/Notifications"));
var GitHub_1 = __importDefault(require("@material-ui/icons/GitHub"));
var Settings_1 = __importDefault(require("@material-ui/icons/Settings"));
var URLS_1 = __importDefault(require("../../../../../../common/URLS"));
var AdminDrawerList = function (_a) {
    var isStashDeveloper = _a.isStashDeveloper;
    var sections = [
        { name: 'Subscribes', link: URLS_1.default.SUBSCRIBES, icon: Notifications_1.default, isDisplayed: isStashDeveloper },
        { name: 'Developers', link: URLS_1.default.DEVELOPERS, icon: Person_1.default, isDisplayed: isStashDeveloper },
        { name: 'Repositories', link: URLS_1.default.REPOSITORIES, icon: GitHub_1.default, isDisplayed: isStashDeveloper },
        { name: 'Settings', link: URLS_1.default.SETTINGS, icon: Settings_1.default, isDisplayed: true },
    ];
    return (react_1.default.createElement(List_1.default, null, sections.filter(function (section) { return section.isDisplayed; }).map(function (section) {
        var Icon = section.icon;
        return (react_1.default.createElement(react_router_dom_1.Link, { to: section.link, key: section.name, style: { textDecoration: 'none', color: 'black' } },
            react_1.default.createElement(ListItem_1.default, { button: true },
                react_1.default.createElement(ListItemIcon_1.default, null,
                    react_1.default.createElement(Icon, null)),
                react_1.default.createElement(ListItemText_1.default, { primary: section.name }))));
    })));
};
exports.default = AdminDrawerList;
