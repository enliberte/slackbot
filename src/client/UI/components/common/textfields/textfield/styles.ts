import {createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    }),
);

export default useStyles;