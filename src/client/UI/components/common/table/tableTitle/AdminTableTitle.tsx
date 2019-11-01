import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";


interface IAdminTableTitleProps {
    titleText: string;
    isFavoriteOnly: boolean;
    setIsFavoriteOnly: (isFavoriteOnly: boolean) => void;
}

const AdminTableTitle = ({titleText, isFavoriteOnly, setIsFavoriteOnly}: IAdminTableTitleProps) => {
    return (
        <Grid container spacing={3}>
            <Grid item>
                <Typography variant="h6" style={{lineHeight: 2}}>{titleText}</Typography>
            </Grid>
            <Grid item>
                <FormControlLabel
                    control={
                        <Checkbox color="primary" value={isFavoriteOnly} onChange={() => setIsFavoriteOnly(!isFavoriteOnly)} />
                    }
                    label={<Typography style={{fontSize: "0.8rem"}}>Favorite Only</Typography>}
                    labelPlacement="start"
                />
            </Grid>
        </Grid>
    );
};

export default AdminTableTitle;