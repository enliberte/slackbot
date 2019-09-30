import React from 'react';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {selectDevelopers} from "../../../../BLL/store/selectors/developers";
import {Grid, makeStyles} from "@material-ui/core";
import Developer from "./developer";


type DevelopersProps = ReturnType<typeof mapStateToProps>;

const useStyles = makeStyles(theme => ({
    paper: {
        maxWidth: 400,
        margin: `${theme.spacing(1)}px 0px`,
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
    developers: selectDevelopers(state)
});

export default connect(mapStateToProps)(Developers);