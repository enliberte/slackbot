import React from 'react';
import {Grid, makeStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {selectRepositories} from "../../../../BLL/store/selectors/repositories";
import Repository from "./repository";


type RepositoriesProps = ReturnType<typeof mapStateToProps>;

const useStyles = makeStyles(theme => ({
    paper: {
        maxWidth: 400,
        margin: `${theme.spacing(1)}px 0px`,
        padding: theme.spacing(2),
    },
}));

const Repositories = ({repositories}: RepositoriesProps) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={2}>
                {repositories.map(repository => <Repository key={repository.reponame} repository={repository} />)}
            </Grid>
        </Paper>
    );
};

const mapStateToProps = (state: any) => ({
    repositories: selectRepositories(state)
});

export default connect(mapStateToProps)(Repositories);