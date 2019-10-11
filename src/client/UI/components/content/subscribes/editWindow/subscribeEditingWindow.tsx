import React from 'react';
import {connect} from "react-redux";
import {selectIsNewSubscribe, selectIsSubscribeEditing} from "../../../../../BLL/store/selectors/subscribes";
import ModalWindow from "../../dialog/dialog";
import {
    runEditSubscribeSaga,
    runSaveSubscribeSaga,
    toggleEditingWindow
} from "../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";
import SubscribeEditingForm from './editForm/subscribeEditingForm';


type SubscribeEditingWindowProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;


const SubscribeEditingWindow = ({open, isNew, handleClose, saveSubscribe, editSubscribe}: SubscribeEditingWindowProps) => {
    const actions = [
        {text: 'Cancel', onClick: handleClose},
        isNew ? {text: 'Subscribe', onClick: saveSubscribe} : {text: 'Edit', onClick: editSubscribe}];

    return (
        <ModalWindow
            open={open}
            handleClose={handleClose}
            dialogTitle="Subscribe"
            actions={actions}>
            <SubscribeEditingForm />
        </ModalWindow>
    );
};

const mapStateToProps = (state: any) => ({
    open: selectIsSubscribeEditing(state),
    isNew: selectIsNewSubscribe(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    handleClose() {
        dispatch(toggleEditingWindow());
    },
    saveSubscribe() {
        dispatch(runSaveSubscribeSaga());
    },
    editSubscribe() {
        dispatch(runEditSubscribeSaga());
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(SubscribeEditingWindow);