import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import AdminIconButton from "../adminIconButton";
import IButtonProps from "../../IButtonProps";


const DeleteAdminIconButton = ({handleClick}: IButtonProps) => {
    return (
        <AdminIconButton handleClick={handleClick}>
            <DeleteIcon />
        </AdminIconButton>
    )
};

export default DeleteAdminIconButton;