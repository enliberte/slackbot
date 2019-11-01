"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var useStyles = core_1.makeStyles(function (theme) {
    var _a, _b;
    return ({
        search: (_a = {
                position: 'relative',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: styles_1.fade(theme.palette.common.white, 0.15),
                '&:hover': {
                    backgroundColor: styles_1.fade(theme.palette.common.white, 0.25),
                },
                marginLeft: 0,
                width: '100%'
            },
            _a[theme.breakpoints.up('sm')] = {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
            _a),
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: (_b = {
                padding: theme.spacing(1, 1, 1, 7),
                transition: theme.transitions.create('width'),
                width: '100%'
            },
            _b[theme.breakpoints.up('sm')] = {
                width: 120,
                '&:focus': {
                    width: 200,
                },
            },
            _b)
    });
});
exports.default = useStyles;
