import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import {getChannelId} from "../../../../BLL/store/selectors/auth";
import {runGetDevelopersSaga} from "../../../../BLL/store/action_creators/developers/developersActionCreators";
import {IDevelopersFilters} from "../../../../BLL/store/action_creators/developers/IDevelopersFilters";
import {getDevelopers} from "../../../../BLL/store/selectors/developers";
import {Grid, makeStyles} from "@material-ui/core";
import Developer from "./developer";


type DevelopersProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

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


const Developers = ({developers, channelId, getDevelopers}: DevelopersProps) => {
    const classes = useStyles();

    React.useEffect(() => {
        getDevelopers({channelId});
    });

    return (
        <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
                {developers.map(developer => <Developer key={developer.username} developer={developer} />)}
            </Grid>
        </Paper>
    );
};

const mapStateToProps = (state: any) => ({
    channelId: getChannelId(state),
    developers: getDevelopers(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    getDevelopers(filters: IDevelopersFilters) {
        dispatch(runGetDevelopersSaga(filters));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Developers);