import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminAppToolbar from "./toolbar/adminAppToolbar/adminAppToolbar";
import AdminDrawer from "./drawer/adminDrawer";
import {IAdminDrawerListProps} from "./drawer/drawerList/adminDrawerList";

interface IAccordeonProps extends IAdminDrawerListProps{}

const Accordeon = ({isStashDeveloper}: IAccordeonProps) => {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AdminAppToolbar open={open} handleDrawerOpen={handleDrawerOpen} />
            <AdminDrawer open={open} handleDrawerClose={handleDrawerClose} isStashDeveloper={isStashDeveloper} />
        </React.Fragment>
    );
};

export default Accordeon;