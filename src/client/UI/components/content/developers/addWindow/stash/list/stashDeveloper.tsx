import React from 'react';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {connect} from "react-redux";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import {red} from "@material-ui/core/colors";
import {
    setSubscribe, toggleEditingDeveloperWindow
} from "../../../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";
import {IStashDeveloperWithFavoriteSign} from "../../../../../../../../backend/db/models/developer/stash/StashDeveloperModel";


interface IStashDeveloperProps extends ReturnType<typeof mapDispatchToProps> {
    developer: IStashDeveloperWithFavoriteSign;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inline: {
            display: 'inline',
        },
        button: {
            margin: theme.spacing(1),
        },
        icon: {
            '&:hover, &.active': {
                color: red[800],
            }
        }
    }),
);

const StashDeveloper = ({developer, setDeveloper}: IStashDeveloperProps) => {
    const classes = useStyles();

    return (
        <ListItem button onClick={() => setDeveloper(developer.displayName)}>
            <ListItemText
                primary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {developer.displayName}
                        </Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    )
};

const mapDispatchToProps = (dispatch: any) => ({
    setDeveloper(followed: string) {
        dispatch(setSubscribe({followed}));
        dispatch(toggleEditingDeveloperWindow());
    }
});

export default connect(null, mapDispatchToProps)(StashDeveloper);