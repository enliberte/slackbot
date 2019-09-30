import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";


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
            <Grid container spacing={3}>
                {props.children}
            </Grid>
        </main>
    );
};

export default Content;