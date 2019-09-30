import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";
import {IDeveloper} from "../../../../../backend/db/models/DeveloperModel";
import {runGetSubscribesSaga} from "../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";
import {connect} from "react-redux";


interface IDeveloperProps extends ReturnType<typeof mapDispatchToProps> {
    developer: IDeveloper
}

const Developer = ({developer, getSubscribes}: IDeveloperProps) => (
    <Grid item xs={12} zeroMinWidth>
        <Typography noWrap onClick={() => getSubscribes(developer.username)}>{developer.username}</Typography>
    </Grid>
);

const mapDispatchToProps = (dispatch: any) => ({
    getSubscribes(developerName: string) {
        dispatch(runGetSubscribesSaga({followed: developerName}));
    }
});

export default connect(null, mapDispatchToProps)(Developer);