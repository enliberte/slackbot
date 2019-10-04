import React from 'react';
import {connect} from "react-redux";
import {selectFollowed} from "../../../../../../BLL/store/selectors/subscribes";
import TocIcon from '@material-ui/icons/Toc';


type SubscribeEditingFormProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const SubscribeEditingForm = ({followed, openAddRepositoryPanel}: SubscribeEditingFormProps) => {
    return (
        <div>
            <span>{followed}</span>
            <TocIcon onClick={openAddRepositoryPanel}/>
        </div>
    )
};

const mapStateToProps = (state: any) => ({
    repositoryPanelOpened: false,
    followed: selectFollowed(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    openAddRepositoryPanel() {}
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeEditingForm);