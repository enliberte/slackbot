"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
var useStyles = core_1.makeStyles(function (theme) { return ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    tip: {
        margin: theme.spacing(2)
    },
    close: {
        padding: theme.spacing(0.5),
    },
    signup: {
        color: '#3366ff',
        "&:hover": {
            cursor: 'pointer'
        }
    }
}); });
exports.default = useStyles;
