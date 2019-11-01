import {createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inline: {
            display: 'inline',
        },
        button: {
            margin: theme.spacing(1),
        },
    }),
);

export default useStyles;