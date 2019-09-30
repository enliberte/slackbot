import React from 'react';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {makeStyles, createStyles, Theme} from "@material-ui/core";
import List from "@material-ui/core/List";
import {selectSubscribes} from "../../../../BLL/store/selectors/subscribes";
import Subscribe from "./subscribe";
import Grid from "@material-ui/core/Grid";


type SubscribesProps = ReturnType<typeof mapStateToProps>;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 800,
            backgroundColor: theme.palette.background.paper,
        },
        paper: {
            maxWidth: 800,
            margin: `${theme.spacing(1)}px 0px`,
            padding: theme.spacing(2),
        }
    }),
);


const Subscribes = ({subscribes}: SubscribesProps) => {
    const classes = useStyles();

    return (
        <Grid item xs={9}>
            <Paper className={classes.paper}>
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

export default connect(mapStateToProps)(Subscribes);