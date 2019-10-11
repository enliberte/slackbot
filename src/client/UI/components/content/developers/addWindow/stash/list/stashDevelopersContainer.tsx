import React from 'react';
import {connect} from "react-redux";
import StashDevelopers from "./stashDevelopers";
import {runGetStashDevelopersSaga} from "../../../../../../../BLL/store/action_creators/developers/developersActionCreators";


type DevelopersContainerProps = ReturnType<typeof mapDispatchToProps>;

const StashDevelopersContainer = ({getDevelopers}: DevelopersContainerProps) => {
    React.useEffect(() => {
        getDevelopers();
    });
    return <StashDevelopers />;
};

const mapDispatchToProps = (dispatch: any) => ({
    getDevelopers() {
        dispatch(runGetStashDevelopersSaga());
    }
});

export default connect(null, mapDispatchToProps)(StashDevelopersContainer);