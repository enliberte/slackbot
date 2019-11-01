import React from 'react';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import useStyles from "./styles";
import {Snackbar} from "@material-ui/core";

export interface IAdminWarningSnackbarProps {
    open: boolean;
    message?: string;
}

const AdminWarningSnackbar = ({open, message}: IAdminWarningSnackbarProps) => {
    const classes = useStyles();

    return (
        <Snackbar
            open={open}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            autoHideDuration={6000}
        >
            <SnackbarContent
                className={classes.warning}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <WarningIcon className={clsx(classes.icon, classes.iconVariant)}/>
                            {message}
                    </span>
                }
            />
        </Snackbar>
    );
};

export default AdminWarningSnackbar;
