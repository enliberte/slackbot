"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var history_1 = require("history");
var accordeon_1 = __importDefault(require("../accordeon/accordeon"));
var core_1 = require("@material-ui/core");
var content_1 = __importDefault(require("../content/content"));
var react_redux_1 = require("react-redux");
var auth_1 = require("../../../BLL/store/selectors/auth");
var unauthorized_1 = __importDefault(require("../pages/unauthorized/unauthorized"));
var URLS_1 = __importDefault(require("../../../../common/URLS"));
// @ts-ignore
var RepositoriesTable_1 = __importDefault(require("../content/repositories/stash/RepositoriesTable"));
// @ts-ignore
var DevelopersTable_1 = __importDefault(require("../content/developers/stash/DevelopersTable"));
// @ts-ignore
var SubscribesTable_1 = __importDefault(require("../content/subscribes/SubscribesTable"));
var authActionCreators_1 = require("../../../BLL/store/action_creators/auth/authActionCreators");
var circular_1 = __importDefault(require("../common/loader/circular/circular"));
var SettingsPanel_1 = __importDefault(require("../content/settings/SettingsPanel"));
var snackbar_1 = __importDefault(require("../common/snackbars/snackbar"));
var history = history_1.createBrowserHistory();
var useStyles = core_1.makeStyles(function (theme) { return ({
    root: {
        display: 'flex',
    }
}); });
var App = function (_a) {
    var isAuth = _a.isAuth, isStashDeveloper = _a.isStashDeveloper, isAuthFetching = _a.isAuthFetching, getAuthData = _a.getAuthData, isSnackbarDisplayed = _a.isSnackbarDisplayed, snackbarText = _a.snackbarText;
    var classes = useStyles();
    react_1.default.useEffect(function () {
        getAuthData();
    }, []);
    return (react_1.default.createElement(react_router_dom_1.Router, { history: history },
        react_1.default.createElement("div", { className: classes.root }, isAuthFetching ? react_1.default.createElement(circular_1.default, null) :
            isAuth ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(snackbar_1.default, { open: isSnackbarDisplayed, message: snackbarText }),
                react_1.default.createElement(accordeon_1.default, { isStashDeveloper: isStashDeveloper }),
                react_1.default.createElement(content_1.default, null,
                    isStashDeveloper ? react_1.default.createElement(react_router_dom_1.Redirect, { to: URLS_1.default.SUBSCRIBES }) : react_1.default.createElement(react_router_dom_1.Redirect, { to: URLS_1.default.SETTINGS }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: URLS_1.default.SUBSCRIBES, component: SubscribesTable_1.default }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: URLS_1.default.DEVELOPERS, component: DevelopersTable_1.default }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: URLS_1.default.REPOSITORIES, component: RepositoriesTable_1.default }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: URLS_1.default.SETTINGS, component: SettingsPanel_1.default })))) : (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: URLS_1.default.UNAUTHORIZED, component: unauthorized_1.default }),
                react_1.default.createElement(react_router_dom_1.Redirect, { to: URLS_1.default.UNAUTHORIZED }))))));
};
var mapStateToProps = function (state) { return ({
    isAuth: auth_1.selectIsAuth(state),
    isSnackbarDisplayed: auth_1.selectIsSessionWarningMsgDisplayed(state),
    snackbarText: auth_1.selectSessionEndWarningMsg(state),
    isStashDeveloper: auth_1.selectIsStashDeveloper(state),
    isAuthFetching: auth_1.selectIsAuthFetching(state)
}); };
var mapDispatchToProps = function (dispatch) { return ({
    getAuthData: function () {
        dispatch(authActionCreators_1.runGetAuthSaga());
    },
    closeSnackbar: function () {
        dispatch(authActionCreators_1.setSessionEndWarning({ sessionEndWarningMsg: '', isSessionWarningMsgDisplayed: false }));
    }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App);
