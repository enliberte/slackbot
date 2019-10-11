import React from 'react';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {setSubscribeFilters} from "../../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";
import {connect} from "react-redux";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import {runDeleteFavoriteDeveloperSaga} from "../../../../../../BLL/store/action_creators/developers/developersActionCreators";
import {IFavoriteDeveloper} from "../../../../../../../backend/db/models/developer/favorite/FavoriteDeveloperModel";


interface IFavoriteDeveloperProps extends ReturnType<typeof mapDispatchToProps> {
    developer: IFavoriteDeveloper;
}

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

const FavoriteDeveloper = ({developer, setFollowed, deleteDeveloper}: IFavoriteDeveloperProps) => {
    const classes = useStyles();

    return (
        <ListItem button onClick={() => setFollowed(developer.username)}>
            <ListItemText
                primary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {developer.username}
                        </Typography>
                    </React.Fragment>
                }
            />
            <IconButton
                size="small"
                className={classes.button} aria-label="delete"
                onClick={() => deleteDeveloper({username: developer.username})}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
};

const mapDispatchToProps = (dispatch: any) => ({
    setFollowed(followed: string) {
        dispatch(setSubscribeFilters({followed}));
    },
    deleteDeveloper(developer: Partial<IFavoriteDeveloper>) {
        dispatch(runDeleteFavoriteDeveloperSaga(developer));
    }
});

export default connect(null, mapDispatchToProps)(FavoriteDeveloper);