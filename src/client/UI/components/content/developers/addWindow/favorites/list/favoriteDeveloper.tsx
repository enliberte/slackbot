import React from 'react';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {connect} from "react-redux";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import {
    setSubscribe, toggleEditingDeveloperWindow
} from "../../../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";
import {IFavoriteDeveloper} from "../../../../../../../../backend/db/models/developer/favorite/FavoriteDeveloperModel";


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

const FavoriteDevelopers = ({developer, setDeveloper}: IFavoriteDeveloperProps) => {
    const classes = useStyles();

    return (
        <ListItem button onClick={() => setDeveloper(developer.username)}>
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
        </ListItem>
    )
};

const mapDispatchToProps = (dispatch: any) => ({
    setDeveloper(followed: string) {
        dispatch(setSubscribe({followed}));
        dispatch(toggleEditingDeveloperWindow());
    }
});

export default connect(null, mapDispatchToProps)(FavoriteDevelopers);