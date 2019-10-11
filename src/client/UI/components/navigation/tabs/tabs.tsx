import React, {MouseEvent} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Paper} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles({
    root: {
        margin: '40px 0px 0px 0px',
        flexGrow: 1
    },
});

interface ITab {
    label: string;
    clickHandler: (event: MouseEvent) => void;
}

export interface IItemTabsProps {
    tabs: ITab[];
}

const ItemTabs = ({tabs}: IItemTabsProps) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Grid item xs={12}>
            <Paper square className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                >
                    {tabs.map(tab => <Tab label={tab.label} onClick={tab.clickHandler}/>)}
                </Tabs>
            </Paper>
        </Grid>
    )
};

export default ItemTabs;