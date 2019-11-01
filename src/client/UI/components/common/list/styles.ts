import {createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
        },
        paper: {
            margin: `${theme.spacing(1)}px 0px`,
            padding: theme.spacing(2),
        }
    }),
);

export default useStyles;