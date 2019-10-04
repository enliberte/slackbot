import React, {ReactNode} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";

interface IContentProps {
    children: ReactNode;
}

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    }
}));

const Content = ({children}: IContentProps) => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <Grid container spacing={3}>
                {children}
            </Grid>
        </main>
    );
};

export default Content;