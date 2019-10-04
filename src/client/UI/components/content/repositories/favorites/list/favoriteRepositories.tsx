import React from 'react';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {makeStyles, createStyles, Theme} from "@material-ui/core";
import Repository from "./favoriteRepository";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import FavoriteRepositoriesSearch from '../search/favoriteRepositoriesSearch';
import {selectFavoriteRepositories} from "../../../../../../BLL/store/selectors/repositories";


type RepositoriesProps = ReturnType<typeof mapStateToProps>;

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


const FavoriteRepositories = ({repositories}: RepositoriesProps) => {
    const classes = useStyles();

    return (
        <Grid item xs={3}>
            <Paper className={classes.paper}>
                <FavoriteRepositoriesSearch />
                <List className={classes.root}>
                    {repositories.map(repository => <Repository key={repository.reponame} repository={repository} />)}
                </List>
            </Paper>
        </Grid>
    );
};

const mapStateToProps = (state: any) => ({
    repositories: selectFavoriteRepositories(state)
});

export default connect(mapStateToProps)(FavoriteRepositories);