import React from 'react';
import {connect} from "react-redux";
import {selectIsSubscribeEditing} from "../../../../../BLL/store/selectors/subscribes";
import ModalWindow from "../../modal/modal";
import {toggleEditingWindow} from "../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";
// @ts-ignore
import SubscribeEditingForm from './editForm/subscribeEditingForm';


type SubscribeEditingWindowProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;


const SubscribeEditingWindow = ({open, handleClose}: SubscribeEditingWindowProps) => {
    return (
        <ModalWindow open={open} handleClose={handleClose}>
            <SubscribeEditingForm />
        </ModalWindow>
    );
};

const mapStateToProps = (state: any) => ({
    open: selectIsSubscribeEditing(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    handleClose() {
        dispatch(toggleEditingWindow());
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(SubscribeEditingWindow);