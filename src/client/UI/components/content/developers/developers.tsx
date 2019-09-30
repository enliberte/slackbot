import React from 'react';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {getDevelopers} from "../../../../BLL/store/selectors/developers";
import {Grid, makeStyles} from "@material-ui/core";
import Developer from "./developer";


type DevelopersProps = ReturnType<typeof mapStateToProps>;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    paper: {
        maxWidth: 400,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
}));


const Developers = ({developers}: DevelopersProps) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={2}>
                {developers.map(developer => <Developer key={developer.username} developer={developer} />)}
            </Grid>
        </Paper>
    );
};

const mapStateToProps = (state: any) => ({
    developers: getDevelopers(state)
});

export default connect(mapStateToProps)(Developers);