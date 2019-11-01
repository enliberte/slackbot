"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
var colors_1 = require("@material-ui/core/colors");
var useStyles = core_1.makeStyles(function (theme) { return ({
    warning: {
        backgroundColor: colors_1.amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}); });
exports.default = useStyles;
