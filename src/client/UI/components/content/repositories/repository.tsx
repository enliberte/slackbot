import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";
import {IRepository} from "../../../../../backend/db/models/RepositoryModel";


interface IRepositoryProps {
    repository: IRepository
}

const Repository = ({repository}: IRepositoryProps) => (
    <Grid item xs={12} zeroMinWidth>
        <Typography noWrap>{repository.reponame}</Typography>
    </Grid>
);

export default Repository;