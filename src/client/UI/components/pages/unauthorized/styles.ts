import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
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
}));

export default useStyles;