"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var styles_1 = require("@material-ui/core/styles");
var useStyles = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        root: {
            padding: theme.spacing(3, 2),
        },
        close: {
            padding: theme.spacing(0.5),
        },
    });
});
exports.default = useStyles;
