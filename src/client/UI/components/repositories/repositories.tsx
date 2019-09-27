import React from 'react';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import {getChannelId} from "../../../BLL/store/selectors/auth";
import {IDevelopersFilters} from "../../../BLL/store/action_creators/developers/IDevelopersFilters";
import {runGetDevelopersSaga} from "../../../BLL/store/action_creators/developers/developersActionCreators";
import {IRepositoriesFilters} from "../../../BLL/store/action_creators/repositories/IRepositoriesFilters";
import {runGetRepositoriesSaga} from "../../../BLL/store/action_creators/repositories/repositoriesActionCreators";


type RepositoriesProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;


const Repositories = ({channelId, getRepositories}: RepositoriesProps) => {
    React.useEffect(() => {
        getRepositories({channelId});
    });

    return (
        <Typography paragraph>
            Repositories
        </Typography>
    );
};

const mapStateToProps = (state: any) => ({
    channelId: getChannelId(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    getRepositories(filters: IRepositoriesFilters) {
        dispatch(runGetRepositoriesSaga(filters));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);