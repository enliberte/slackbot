import React from 'react';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {makeStyles, createStyles, Theme} from "@material-ui/core";
import StashRepository from "./stashRepository";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import StashRepositoriesSearch from '../../../stash/search/stashRepositoriesSearch';
import CircularProgress from '@material-ui/core/CircularProgress';
import {selectStashRepositories} from "../../../../../../../BLL/store/selectors/repositories";
import {selectIsFetching} from "../../../../../../../BLL/store/selectors/fetching";


type StashRepositoriesProps = ReturnType<typeof mapStateToProps>;

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


const StashRepositories = ({isFetching, repositories}: StashRepositoriesProps) => {
    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <StashRepositoriesSearch />
                {isFetching ? <CircularProgress className={classes.progress} /> :
                <List className={classes.root}>
                    {repositories.map(repository => <StashRepository key={repository.links.self[0].href} repository={repository} />)}
                </List>}
            </Paper>
        </Grid>
    );
};

const mapStateToProps = (state: any) => ({
    repositories: selectStashRepositories(state),
    isFetching: selectIsFetching(state)
});

export default connect(mapStateToProps)(StashRepositories);