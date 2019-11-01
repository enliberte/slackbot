import {makeStyles, Theme} from "@material-ui/core";
import {amber, green} from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => ({
    warning: {
        backgroundColor: amber[700],
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
}));

export default useStyles;