import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Grid, makeStyles} from "@material-ui/core";
import {IDeveloper} from "../../../../../backend/db/models/DeveloperModel";


interface DeveloperProps {
    developer: IDeveloper
}

const Developer = ({developer}: DeveloperProps) => (
    <Grid item xs zeroMinWidth>
        <Typography noWrap>{developer.username}</Typography>
    </Grid>
);

export default Developer;