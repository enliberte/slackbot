import React from 'react';
import {connect} from "react-redux";
import {getChannelId} from "../../../../BLL/store/selectors/auth";
import {IRepositoriesFilters} from "../../../../BLL/store/action_creators/repositories/IRepositoriesFilters";
import {runGetRepositoriesSaga} from "../../../../BLL/store/action_creators/repositories/repositoriesActionCreators";
import Repositories from "./repositories";


type RepositoriesContainerProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

const RepositoriesContainer = ({channelId, getRepositories}: RepositoriesContainerProps) => {
    React.useEffect(() => {
        getRepositories({channelId});
    });
    return <Repositories />;
};

const mapStateToProps = (state: any) => ({
    channelId: getChannelId(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    getRepositories(filters: IRepositoriesFilters) {
        dispatch(runGetRepositoriesSaga(filters));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesContainer);