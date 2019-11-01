import React from 'react';
import AdminIconButton from "../adminIconButton";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IButtonProps from "../../IButtonProps";


interface IToggleMassAdminIconButtonProps extends IButtonProps {
    isOpened: boolean;
}

const ToggleMassAdminIconButton = ({isOpened, handleClick}: IToggleMassAdminIconButtonProps) => {
    return (
        <AdminIconButton handleClick={handleClick}>
            {isOpened ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </AdminIconButton>
    )
};

export default ToggleMassAdminIconButton;