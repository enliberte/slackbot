import React from 'react';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {makeStyles, createStyles, Theme} from "@material-ui/core";
import List from "@material-ui/core/List";
import {selectSubscribes} from "../../../../../BLL/store/selectors/subscribes";
import Subscribe from "./subscribe";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import {toggleEditingWindow} from "../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";
import SubscribeEditingWindow from "../editWindow/subscribeEditingWindow";


type SubscribesProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

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


const Subscribes = ({subscribes, openSubscribeEditingWindow}: SubscribesProps) => {
    const classes = useStyles();

    return (
        <Grid item xs={9}>
            <Paper className={classes.paper}>
                <SubscribeEditingWindow />
                <Fab size="small" color="primary" aria-label="add" onClick={openSubscribeEditingWindow}>
                    <AddIcon />
                </Fab>
                <List className={classes.root}>
                    {subscribes.map(subscribe => <Subscribe key={subscribe.reponame} subscribe={subscribe} />)}
                </List>
            </Paper>
        </Grid>
    );
};

const mapStateToProps = (state: any) => ({
    subscribes: selectSubscribes(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    openSubscribeEditingWindow() {
        dispatch(toggleEditingWindow());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscribes);