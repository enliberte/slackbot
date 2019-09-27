import React from 'react';
import ItemTabs from "./tabs/tabs";
import { makeStyles, useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(10),
    },
}));

const Content = (props: any) => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <ItemTabs />
            {props.children}
        </main>
    );
};

export default Content;