import React from 'react';
import {connect} from "react-redux";
import {selectChannelId} from "../../../../BLL/store/selectors/auth";
import {runGetDevelopersSaga} from "../../../../BLL/store/action_creators/developers/developersActionCreators";
import {IDevelopersFilters} from "../../../../BLL/store/action_creators/developers/IDevelopersFilters";
import Developers from "./developers";


type DevelopersContainerProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

const DevelopersContainer = ({channelId, getDevelopers}: DevelopersContainerProps) => {
    React.useEffect(() => {
        getDevelopers({channelId});
    });
    return <Developers />;
};

const mapStateToProps = (state: any) => ({
    channelId: selectChannelId(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    getDevelopers(filters: IDevelopersFilters) {
        dispatch(runGetDevelopersSaga(filters));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DevelopersContainer);