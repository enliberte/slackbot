"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
var useStyles = core_1.makeStyles(function (theme) {
    return core_1.createStyles({
        root: {
            height: 250,
            flexGrow: 1,
        },
        container: {
            position: 'relative',
        },
        suggestionsContainerOpen: {
            position: 'absolute',
            zIndex: 1,
            marginTop: theme.spacing(1),
            left: 0,
            right: 0,
        },
        suggestion: {
            display: 'block',
        },
        suggestionsList: {
            margin: 0,
            padding: 0,
            listStyleType: 'none',
        }
    });
});
exports.default = useStyles;
