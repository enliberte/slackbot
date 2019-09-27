import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(10),
    },
}));

const Content = (props: any) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <main className={classes.content}>
            {props.children}
        </main>
    );
};

export default Content;