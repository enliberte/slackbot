"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var clsx_1 = __importDefault(require("clsx"));
var styles_1 = require("@material-ui/core/styles");
var Drawer_1 = __importDefault(require("@material-ui/core/Drawer"));
var AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
var Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
var List_1 = __importDefault(require("@material-ui/core/List"));
var CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
var Divider_1 = __importDefault(require("@material-ui/core/Divider"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Menu_1 = __importDefault(require("@material-ui/icons/Menu"));
var ChevronLeft_1 = __importDefault(require("@material-ui/icons/ChevronLeft"));
var ChevronRight_1 = __importDefault(require("@material-ui/icons/ChevronRight"));
var ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
var ListItemIcon_1 = __importDefault(require("@material-ui/core/ListItemIcon"));
var ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
var Person_1 = __importDefault(require("@material-ui/icons/Person"));
var Build_1 = __importDefault(require("@material-ui/icons/Build"));
var react_router_dom_1 = require("react-router-dom");
var URLS_1 = __importDefault(require("../../../../common/URLS"));
var drawerWidth = 240;
var useStyles = styles_1.makeStyles(function (theme) {
    var _a;
    return ({
        appBar: {
            flexGrow: 1,
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: "calc(100% - " + drawerWidth + "px)",
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: (_a = {
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                overflowX: 'hidden',
                width: theme.spacing(7) + 1
            },
            _a[theme.breakpoints.up('sm')] = {
                width: theme.spacing(9) + 1,
            },
            _a),
        toolbar: __assign({ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: theme.spacing(0, 1) }, theme.mixins.toolbar)
    });
});
var sections = [
    { name: 'Developers', link: URLS_1.default.FAVORITE_DEVELOPERS, icon: Person_1.default },
    { name: 'Repositories', link: URLS_1.default.FAVORITE_REPOSITORIES, icon: Build_1.default }
];
var Navigation = function () {
    var _a, _b, _c, _d;
    var classes = useStyles();
    var theme = styles_1.useTheme();
    var _e = react_1.default.useState(false), open = _e[0], setOpen = _e[1];
    var handleDrawerOpen = function () {
        setOpen(true);
    };
    var handleDrawerClose = function () {
        setOpen(false);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement(AppBar_1.default, { position: "fixed", className: clsx_1.default(classes.appBar, (_a = {},
                _a[classes.appBarShift] = open,
                _a)) },
            react_1.default.createElement(Toolbar_1.default, null,
                react_1.default.createElement(IconButton_1.default, { color: "inherit", "aria-label": "open drawer", onClick: handleDrawerOpen, edge: "start", className: clsx_1.default(classes.menuButton, (_b = {},
                        _b[classes.hide] = open,
                        _b)) },
                    react_1.default.createElement(Menu_1.default, null)))),
        react_1.default.createElement(Drawer_1.default, { variant: "permanent", className: clsx_1.default(classes.drawer, (_c = {},
                _c[classes.drawerOpen] = open,
                _c[classes.drawerClose] = !open,
                _c)), classes: {
                paper: clsx_1.default((_d = {},
                    _d[classes.drawerOpen] = open,
                    _d[classes.drawerClose] = !open,
                    _d)),
            }, open: open },
            react_1.default.createElement("div", { className: classes.toolbar },
                react_1.default.createElement(IconButton_1.default, { onClick: handleDrawerClose }, theme.direction === 'rtl' ? react_1.default.createElement(ChevronRight_1.default, null) : react_1.default.createElement(ChevronLeft_1.default, null))),
            react_1.default.createElement(Divider_1.default, null),
            react_1.default.createElement(List_1.default, null, sections.map(function (section) {
                var Icon = section.icon;
                return (react_1.default.createElement(react_router_dom_1.Link, { to: section.link, key: section.name, style: { textDecoration: 'none', color: 'black' } },
                    react_1.default.createElement(ListItem_1.default, { button: true },
                        react_1.default.createElement(ListItemIcon_1.default, null,
                            react_1.default.createElement(Icon, null)),
                        react_1.default.createElement(ListItemText_1.default, { primary: section.name }))));
            })))));
};
exports.default = Navigation;
