import React from 'react';
import clsx from 'clsx';
import useStyles from './styles';
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import AdminDrawerList, {IAdminDrawerListProps} from "./drawerList/adminDrawerList";


interface IAdminDrawerProps extends IAdminDrawerListProps {
    open: boolean;
    handleDrawerClose: () => void;
}

const AdminDrawer = ({open, handleDrawerClose, isStashDeveloper}: IAdminDrawerProps) => {
    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
            open={open}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <AdminDrawerList isStashDeveloper={isStashDeveloper} />
        </Drawer>
    )
};

export default AdminDrawer;