import React from 'react';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import {getChannelId} from "../../../BLL/store/selectors/auth";
import {runGetDevelopersSaga} from "../../../BLL/store/action_creators/developers/developersActionCreators";
import {IDevelopersFilters} from "../../../BLL/store/action_creators/developers/IDevelopersFilters";


type DevelopersProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;


const Developers = ({channelId, getDevelopers}: DevelopersProps) => {
    React.useEffect(() => {
        getDevelopers({channelId});
    });

    return (
        <Typography paragraph>
            Developers
        </Typography>
    );
};

const mapStateToProps = (state: any) => ({
    channelId: getChannelId(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    getDevelopers(filters: IDevelopersFilters) {
        dispatch(runGetDevelopersSaga(filters));
    }
});

export default connect()(Developers);