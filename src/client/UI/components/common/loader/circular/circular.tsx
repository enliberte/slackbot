import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './styles';

const AdminCircular = () => {
    const classes = useStyles();

    return (
        <div>
            <CircularProgress className={classes.progress} />
        </div>
    );
};

export default AdminCircular;