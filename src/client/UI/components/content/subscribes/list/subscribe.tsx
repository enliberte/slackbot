import React from 'react';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {connect} from "react-redux";
import {ISubscribe} from "../../../../../../backend/db/models/subscribe/SubscribeModel";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import {
    runDeleteSubscribeSaga, setIsNew, setSubscribe, toggleEditingWindow
} from "../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";
import {ISubscribeData} from "../../../../../BLL/store/reducers/subscribes/newSubscribe";


interface ISubscribeProps extends ReturnType<typeof mapDispatchToProps> {
    subscribe: ISubscribe;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inline: {
            display: 'inline',
        },
        button: {
            margin: theme.spacing(1),
        }
    }),
);

const Subscribe = ({subscribe, deleteSubscribe, openSubscribeEditingWindow}: ISubscribeProps) => {
    const classes = useStyles();

    return (
        <ListItem button>
            <ListItemText
                primary={
                    <Grid container spacing={3}
                          onClick={() => openSubscribeEditingWindow(
                              {reponame: subscribe.reponame, followed: subscribe.followed, id: subscribe.id}
                          )}>
                        <Grid item xs={4}>
                            <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                                {subscribe.followed}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                                {subscribe.reponame}
                            </Typography>
                        </Grid>
                    </Grid>
                }
            />
            <IconButton
                size="small"
                className={classes.button} aria-label="delete"
                onClick={() => deleteSubscribe(subscribe)}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
};

const mapDispatchToProps = (dispatch: any) => ({
    deleteSubscribe(subscribe: Partial<ISubscribe>) {
        const {id, ...subscribeData} = subscribe;
        dispatch(runDeleteSubscribeSaga(subscribeData));
    },
    openSubscribeEditingWindow(subscribeData: ISubscribeData) {
        dispatch(setIsNew(false));
        dispatch(setSubscribe(subscribeData));
        dispatch(toggleEditingWindow());
    }
});

export default connect(null, mapDispatchToProps)(Subscribe);