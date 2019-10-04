import React from 'react';
import {connect} from "react-redux";
import {runGetStashDevelopersSaga} from "../../../../../../BLL/store/action_creators/developers/developersActionCreators";
import Developers from "./stashDevelopers";


type DevelopersContainerProps = ReturnType<typeof mapDispatchToProps>;

const StashDevelopersContainer = ({getDevelopers}: DevelopersContainerProps) => {
    React.useEffect(() => {
        getDevelopers();
    });
    return <Developers />;
};

const mapDispatchToProps = (dispatch: any) => ({
    getDevelopers() {
        dispatch(runGetStashDevelopersSaga());
    }
});

export default connect(null, mapDispatchToProps)(StashDevelopersContainer);