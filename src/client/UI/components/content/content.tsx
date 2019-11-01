import React, {ReactNode} from 'react';
import {Grid} from "@material-ui/core";
import useStyles from "./styles";

interface IContentProps {
    children: ReactNode;
}

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