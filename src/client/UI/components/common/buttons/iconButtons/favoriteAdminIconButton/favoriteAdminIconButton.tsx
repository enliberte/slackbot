import React from 'react';
import AdminIconButton from "../adminIconButton";
import IButtonProps from "../../IButtonProps";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import clsx from 'clsx';
import useStyles from "./styles";


interface IFavoriteAdminIconButtonProps extends IButtonProps {
    isFavorite: boolean;
}

const FavoriteAdminIconButton = ({isFavorite, handleClick}: IFavoriteAdminIconButtonProps) => {
    const classes = useStyles();

    return (
        <AdminIconButton handleClick={handleClick}>
            <StarBorderIcon className={clsx(classes.icon, {'active': isFavorite})} />
        </AdminIconButton>
    )
};

export default FavoriteAdminIconButton;