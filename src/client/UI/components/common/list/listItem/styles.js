"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
var useStyles = core_1.makeStyles(function (theme) {
    return core_1.createStyles({
        inline: {
            display: 'inline',
        },
        button: {
            margin: theme.spacing(1),
        },
    });
});
exports.default = useStyles;
