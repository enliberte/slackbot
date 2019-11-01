import React from 'react';
import TocIcon from '@material-ui/icons/Toc';
import AdminIconButton from "../adminIconButton";
import IButtonProps from "../../IButtonProps";


const TocAdminIconButton = ({handleClick}: IButtonProps) => {
    return (
        <AdminIconButton handleClick={handleClick}>
            <TocIcon />
        </AdminIconButton>
    )
};

export default TocAdminIconButton;