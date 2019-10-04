import React from 'react';
import {connect} from "react-redux";
import Subscribes from "./subscribes";
import {runGetSubscribesSaga} from "../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";


type SubscribesContainerProps = ReturnType<typeof mapDispatchToProps>;

const SubscribesContainer = ({getSubscribes}: SubscribesContainerProps) => {
    React.useEffect(() => {
        getSubscribes();
    });
    return <Subscribes />;
};

const mapDispatchToProps = (dispatch: any) => ({
    getSubscribes() {
        dispatch(runGetSubscribesSaga());
    }
});

export default connect(null, mapDispatchToProps)(SubscribesContainer);