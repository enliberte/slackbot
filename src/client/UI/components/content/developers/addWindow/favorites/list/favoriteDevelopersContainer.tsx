import React from 'react';
import {connect} from "react-redux";
import Developers from "./favoriteDevelopers";
import {runGetFavoriteDevelopersSaga} from "../../../../../../../BLL/store/action_creators/developers/developersActionCreators";


type DevelopersContainerProps = ReturnType<typeof mapDispatchToProps>;

const FavoriteDevelopersContainer = ({getDevelopers}: DevelopersContainerProps) => {
    React.useEffect(() => {
        getDevelopers();
    });
    return <Developers />;
};

const mapDispatchToProps = (dispatch: any) => ({
    getDevelopers() {
        dispatch(runGetFavoriteDevelopersSaga());
    }
});

export default connect(null, mapDispatchToProps)(FavoriteDevelopersContainer);