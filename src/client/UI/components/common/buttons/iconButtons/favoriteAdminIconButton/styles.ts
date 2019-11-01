import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {red} from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            '&:hover, &.active': {
                color: red[800],
            }
        }
    }),
);

export default useStyles;