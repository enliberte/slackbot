"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var history_1 = require("history");
var navigation_1 = __importDefault(require("../navigation/navigation"));
var core_1 = require("@material-ui/core");
var content_1 = __importDefault(require("../content/content"));
var favoriteDevelopersContainer_1 = __importDefault(require("../content/developers/favorites/list/favoriteDevelopersContainer"));
var stashDevelopersContainer_1 = __importDefault(require("../content/developers/stash/list/stashDevelopersContainer"));
var favoriteRepositoriesContainer_1 = __importDefault(require("../content/repositories/favorites/list/favoriteRepositoriesContainer"));
var stashRepositoriesContainer_1 = __importDefault(require("../content/repositories/stash/list/stashRepositoriesContainer"));
var subscribesContainer_1 = __importDefault(require("../content/subscribes/list/subscribesContainer"));
var react_redux_1 = require("react-redux");
var auth_1 = require("../../../BLL/store/selectors/auth");
var unauthorized_1 = __importDefault(require("../pages/unauthorized"));
var URLS_1 = __importDefault(require("../../../../common/URLS"));
var developersTabs_1 = __importDefault(require("../content/developers/tabs/developersTabs"));
var repositoriesTabs_1 = __importDefault(require("../content/repositories/tabs/repositoriesTabs"));
var history = history_1.createBrowserHistory();
var useStyles = core_1.makeStyles(function (theme) { return ({
    root: {
        display: 'flex',
    }
}); });
var App = function (_a) {
    var isAuth = _a.isAuth;
    var classes = useStyles();
    return (react_1.default.createElement(react_router_dom_1.Router, { history: history },
        react_1.default.createElement("div", { className: classes.root }, isAuth ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(navigation_1.default, null),
            react_1.default.createElement(content_1.default, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: URLS_1.default.DEVELOPERS, component: developersTabs_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { path: URLS_1.default.REPOSITORIES, component: repositoriesTabs_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { path: URLS_1.default.FAVORITE_DEVELOPERS, component: favoriteDevelopersContainer_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { path: URLS_1.default.FAVORITE_DEVELOPERS, component: subscribesContainer_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { path: URLS_1.default.STASH_DEVELOPERS, component: stashDevelopersContainer_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { path: URLS_1.default.FAVORITE_REPOSITORIES, component: favoriteRepositoriesContainer_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { path: URLS_1.default.FAVORITE_REPOSITORIES, component: subscribesContainer_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { path: URLS_1.default.STASH_REPOSITORIES, component: stashRepositoriesContainer_1.default }),
                react_1.default.createElement(react_router_dom_1.Redirect, { to: "/" })))) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: URLS_1.default.UNAUTHORIZED, component: unauthorized_1.default }),
            react_1.default.createElement(react_router_dom_1.Redirect, { to: URLS_1.default.UNAUTHORIZED }))))));
};
var mapStateToProps = function (state) { return ({
    isAuth: auth_1.selectIsAuth(state)
}); };
exports.default = react_redux_1.connect(mapStateToProps)(App);
