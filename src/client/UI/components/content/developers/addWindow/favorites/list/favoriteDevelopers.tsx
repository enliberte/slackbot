import React from 'react';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {makeStyles, createStyles, Theme} from "@material-ui/core";
import Developer from "./favoriteDeveloper";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import FavoriteDevelopersSearch from '../../../favorites/search/favoriteDevelopersSearch';
import {selectFavoriteDevelopers} from "../../../../../../../BLL/store/selectors/developers";

type DevelopersProps = ReturnType<typeof mapStateToProps>;

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


const FavoriteDevelopers = ({developers}: DevelopersProps) => {
    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <FavoriteDevelopersSearch />
                <List className={classes.root}>
                    {developers.map(developer => <Developer key={developer.username} developer={developer} />)}
                </List>
            </Paper>
        </Grid>
    );
};

const mapStateToProps = (state: any) => ({
    developers: selectFavoriteDevelopers(state)
});

export default connect(mapStateToProps)(FavoriteDevelopers);