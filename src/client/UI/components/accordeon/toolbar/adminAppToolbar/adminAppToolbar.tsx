import React from 'react';
import clsx from 'clsx';
import AdminToolbar, {IAdminToolbarProps} from "./adminToolbar/adminToolbar";
import AppBar from "@material-ui/core/AppBar/AppBar";
import useStyles from './styles';

interface IAdminAppToolbarProps extends IAdminToolbarProps {}

const AdminAppToolbar = ({open, handleDrawerOpen}: IAdminAppToolbarProps) => {
    const classes = useStyles();

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <AdminToolbar open={open} handleDrawerOpen={handleDrawerOpen} />
        </AppBar>
    )
};

export default AdminAppToolbar;