import React from 'react';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {makeStyles, createStyles, Theme} from "@material-ui/core";
import List from "@material-ui/core/List";
import {selectSubscribes} from "../../../../BLL/store/selectors/subscribes";
import Subscribe from "./subscribe";


type SubscribesProps = ReturnType<typeof mapStateToProps>;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 400,
            backgroundColor: theme.palette.background.paper,
        },
        paper: {
            maxWidth: 400,
            margin: `${theme.spacing(1)}px 0px`,
            padding: theme.spacing(2),
        }
    }),
);


const Subscribes = ({subscribes}: SubscribesProps) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <List className={classes.root}>
                {subscribes.map(subscribe => <Subscribe key={subscribe.reponame} subscribe={subscribe} />)}
            </List>
        </Paper>
    );
};

const mapStateToProps = (state: any) => ({
    subscribes: selectSubscribes(state)
});

export default connect(mapStateToProps)(Subscribes);