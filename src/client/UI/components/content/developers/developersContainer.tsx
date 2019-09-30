import React from 'react';
import {connect} from "react-redux";
import {runGetDevelopersSaga} from "../../../../BLL/store/action_creators/developers/developersActionCreators";
import Developers from "./developers";


type DevelopersContainerProps = ReturnType<typeof mapDispatchToProps>;

const DevelopersContainer = ({getDevelopers}: DevelopersContainerProps) => {
    React.useEffect(() => {
        getDevelopers();
    });
    return <Developers />;
};

const mapDispatchToProps = (dispatch: any) => ({
    getDevelopers() {
        dispatch(runGetDevelopersSaga());
    }
});

export default connect(mapDispatchToProps)(DevelopersContainer);