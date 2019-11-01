"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
var drawerWidth = 240;
var useStyles = core_1.makeStyles(function (theme) { return ({
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
    }
}); });
exports.default = useStyles;
