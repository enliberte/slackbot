"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
var useStyles = core_1.makeStyles(function (theme) {
    return core_1.createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
        },
        paper: {
            margin: theme.spacing(1) + "px 0px",
            padding: theme.spacing(2),
        }
    });
});
exports.default = useStyles;
