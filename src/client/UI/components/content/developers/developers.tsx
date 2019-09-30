import React from 'react';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {selectDevelopers} from "../../../../BLL/store/selectors/developers";
import {makeStyles, createStyles, Theme} from "@material-ui/core";
import Developer from "./developer";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";


type DevelopersProps = ReturnType<typeof mapStateToProps>;

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


const Developers = ({developers}: DevelopersProps) => {
    const classes = useStyles();

    return (
        <Grid item xs={4}>
            <Paper className={classes.paper}>
                <List className={classes.root}>
                    {developers.map(developer => <Developer key={developer.username} developer={developer} />)}
                </List>
            </Paper>
        </Grid>
    );
};

const mapStateToProps = (state: any) => ({
    developers: selectDevelopers(state)
});

export default connect(mapStateToProps)(Developers);