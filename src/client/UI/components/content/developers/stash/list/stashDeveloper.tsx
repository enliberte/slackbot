import React from 'react';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {connect} from "react-redux";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {
    runAddStashDeveloperToFavoritesSaga,
    runDeleteFavoriteDeveloperSaga
} from "../../../../../../BLL/store/action_creators/developers/developersActionCreators";
import {red} from "@material-ui/core/colors";
import {IStashDeveloperWithFavoriteSign} from "../../../../../../../backend/db/models/developer/stash/StashDeveloperModel";


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

const StashDeveloper = ({developer, addStashDeveloperToFavorites, removeStashDeveloperFromFavorites}: IStashDeveloperProps) => {
    const classes = useStyles();
    const [isActive, setIsActive] = React.useState(developer.isFavorite);
    const activityClass = isActive ? 'active' : 'passive';

    const handleClick = (): void => {
        if (isActive) {
            removeStashDeveloperFromFavorites(developer.displayName);
        } else {
            addStashDeveloperToFavorites(developer.displayName);
        }
        setIsActive(!isActive);
    };

    return (
        <ListItem button>
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
            <IconButton
                size="small"
                className={classes.button} aria-label="to_favorites"
                onClick={handleClick}>
                <StarBorderIcon className={`${classes.icon} ${activityClass}`} />
            </IconButton>
        </ListItem>
    )
};

const mapDispatchToProps = (dispatch: any) => ({
    addStashDeveloperToFavorites(developerDisplayName: string) {
        dispatch(runAddStashDeveloperToFavoritesSaga(developerDisplayName));
    },
    removeStashDeveloperFromFavorites(developerDisplayName: string) {
        dispatch(runDeleteFavoriteDeveloperSaga({username: developerDisplayName}));
    }
});

export default connect(null, mapDispatchToProps)(StashDeveloper);