import React from 'react';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {makeStyles, createStyles, Theme} from "@material-ui/core";
import StashDeveloper from "./stashDeveloper";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import StashDevelopersSearch from '../../../stash/search/stashDevelopersSearch';
import CircularProgress from '@material-ui/core/CircularProgress';
import {selectIsFetching} from "../../../../../../../BLL/store/selectors/fetching";
import {selectStashDevelopers} from "../../../../../../../BLL/store/selectors/developers";


type StashDevelopersProps = ReturnType<typeof mapStateToProps>;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
        },
        paper: {
            margin: `${theme.spacing(1)}px 0px`,
            padding: theme.spacing(2),
        },
        progress: {
            margin: "auto",
        }
    }),
);


const StashDevelopers = ({isFetching, developers}: StashDevelopersProps) => {
    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <StashDevelopersSearch />
                {isFetching ? <CircularProgress className={classes.progress} /> :
                <List className={classes.root}>
                    {developers.map(developer => <StashDeveloper key={developer.displayName} developer={developer} />)}
                </List>}
            </Paper>
        </Grid>
    );
};

const mapStateToProps = (state: any) => ({
    developers: selectStashDevelopers(state),
    isFetching: selectIsFetching(state)
});

export default connect(mapStateToProps)(StashDevelopers);