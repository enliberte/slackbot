import React from 'react';
import {connect} from "react-redux";
import StashRepositories from "./stashRepositories";
import {runGetStashRepositoriesSaga} from "../../../../../../../BLL/store/action_creators/repositories/repositoriesActionCreators";


type DevelopersContainerProps = ReturnType<typeof mapDispatchToProps>;

const StashRepositoriesContainer = ({getRepositories}: DevelopersContainerProps) => {
    React.useEffect(() => {
        getRepositories();
    });
    return <StashRepositories />;
};

const mapDispatchToProps = (dispatch: any) => ({
    getRepositories() {
        dispatch(runGetStashRepositoriesSaga());
    }
});

export default connect(null, mapDispatchToProps)(StashRepositoriesContainer);