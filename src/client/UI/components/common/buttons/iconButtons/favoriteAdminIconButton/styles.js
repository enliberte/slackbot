"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
var colors_1 = require("@material-ui/core/colors");
var useStyles = core_1.makeStyles(function (theme) {
    return core_1.createStyles({
        icon: {
            '&:hover, &.active': {
                color: colors_1.red[800],
            }
        }
    });
});
exports.default = useStyles;
