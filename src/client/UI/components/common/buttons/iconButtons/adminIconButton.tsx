import React, {ReactNode} from 'react';
import IconButton from "@material-ui/core/IconButton";
import useStyles from "./styles";
import IButtonProps from "../IButtonProps";

interface IAdminIconButtonProps extends IButtonProps {
    children: ReactNode;
}

const AdminIconButton = ({handleClick, children}: IAdminIconButtonProps) => {
    const classes = useStyles();

    return (
        <IconButton
            className={classes.button}
            onClick={handleClick}>
            {children}
        </IconButton>
    )
};

export default AdminIconButton;