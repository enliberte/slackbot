import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3, 2),
        },
        close: {
            padding: theme.spacing(0.5),
        },
    }),
);

export default useStyles;