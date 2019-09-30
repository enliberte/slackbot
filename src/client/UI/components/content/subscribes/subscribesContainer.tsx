import React from 'react';
import {connect} from "react-redux";
import {selectChannelId} from "../../../../BLL/store/selectors/auth";
import Developers from "./subscribes";
import {ISubscribe} from "../../../../../backend/db/models/SubscribeModel";
import {runGetSubscribesSaga} from "../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";


type SubscribesContainerProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

const SubscribesContainer = ({channelId, getSubscribes}: SubscribesContainerProps) => {
    React.useEffect(() => {
        getSubscribes({channelId});
    });
    return <Developers />;
};

const mapStateToProps = (state: any) => ({
    channelId: selectChannelId(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    getSubscribes(filters: Partial<ISubscribe>) {
        dispatch(runGetSubscribesSaga(filters));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscribesContainer);