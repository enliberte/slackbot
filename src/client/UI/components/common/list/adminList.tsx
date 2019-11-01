import React, {ReactNode, ComponentType} from 'react';
import Paper from '@material-ui/core/Paper';
import useStyles from "./styles";
import List from "@material-ui/core/List";

interface IAdminListProps {
    search?: ComponentType<any>;
    children: ReactNode;
}

const AdminList = ({search, children}: IAdminListProps) => {
    const classes = useStyles();
    const Search = search;

    return (
        <Paper className={classes.paper}>
            {Search && <Search />}
            <List className={classes.root}>
                {children}
            </List>
        </Paper>
    );
};

export default AdminList;