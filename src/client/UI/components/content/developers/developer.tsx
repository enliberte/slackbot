import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";
import {IDeveloper} from "../../../../../backend/db/models/DeveloperModel";
import {runGetSubscribesSaga} from "../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";
import {connect} from "react-redux";
import {selectChannelId} from "../../../../BLL/store/selectors/auth";
import {ISubscribe} from "../../../../../backend/db/models/SubscribeModel";


interface IDeveloperProps extends ReturnType<typeof mapDispatchToProps> {
    channelId: string;
    developer: IDeveloper;
}

const Developer = ({channelId, developer, getSubscribes}: IDeveloperProps) => (
    <Grid item xs={12} zeroMinWidth>
        <Typography
            noWrap
            onClick={() => getSubscribes({followed: developer.username, channelId})}
        >
            {developer.username}
        </Typography>
    </Grid>
);

const mapStateToProps = (state: any) => ({
    channelId: selectChannelId(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    getSubscribes(filters: Partial<ISubscribe>) {
        dispatch(runGetSubscribesSaga(filters));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Developer);