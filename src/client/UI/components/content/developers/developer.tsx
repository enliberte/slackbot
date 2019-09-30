import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";
import {IDeveloper} from "../../../../../backend/db/models/DeveloperModel";


interface IDeveloperProps {
    developer: IDeveloper
}

const Developer = ({developer}: IDeveloperProps) => (
    <Grid item xs={12} zeroMinWidth>
        <Typography noWrap>{developer.username}</Typography>
    </Grid>
);

export default Developer;