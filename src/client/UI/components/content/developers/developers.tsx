import React from 'react';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {selectDevelopers} from "../../../../BLL/store/selectors/developers";
import {makeStyles, createStyles, Theme} from "@material-ui/core";
import Developer from "./developer";
import List from "@material-ui/core/List";


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
        <Paper className={classes.paper}>
            <List className={classes.root}>
                {developers.map(developer => <Developer key={developer.username} developer={developer} />)}
            </List>
        </Paper>
    );
};

const mapStateToProps = (state: any) => ({
    developers: selectDevelopers(state)
});

export default connect(mapStateToProps)(Developers);