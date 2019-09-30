import React from 'react';
import ItemTabs from "./tabs/tabs";
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const Content = (props: any) => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            {props.children}
        </main>
    );
};

export default Content;