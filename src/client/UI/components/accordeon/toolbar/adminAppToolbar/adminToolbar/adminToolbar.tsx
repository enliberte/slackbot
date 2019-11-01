import React from 'react';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './styles';


export interface IAdminToolbarProps {
    open: boolean;
    handleDrawerOpen: () => void;
}


const AdminToolbar = ({open, handleDrawerOpen}: IAdminToolbarProps) => {
    const classes = useStyles();

    return (
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                })}
            >
                <MenuIcon />
            </IconButton>
        </Toolbar>
    );
};

export default AdminToolbar;