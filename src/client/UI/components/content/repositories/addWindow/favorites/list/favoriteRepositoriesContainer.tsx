import React from 'react';
import {connect} from "react-redux";
import Repositories from "./favoriteRepositories";
import {runGetFavoriteRepositoriesSaga} from "../../../../../../../BLL/store/action_creators/repositories/repositoriesActionCreators";


type RepositoriesContainerProps = ReturnType<typeof mapDispatchToProps>;

const FavoriteRepositoriesContainer = ({getRepositories}: RepositoriesContainerProps) => {
    React.useEffect(() => {
        getRepositories();
    });
    return <Repositories />;
};

const mapDispatchToProps = (dispatch: any) => ({
    getRepositories() {
        dispatch(runGetFavoriteRepositoriesSaga());
    }
});

export default connect(null, mapDispatchToProps)(FavoriteRepositoriesContainer);