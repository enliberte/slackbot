import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListIcon from '@material-ui/icons/List';
import {Paper} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        margin: '40px 0px 0px 0px',
        flexGrow: 1,
        maxWidth: 400,
    },
});

const tabs = [
    {icon: FavoriteIcon, label: 'FAVORITES'},
    {icon: ListIcon, label: 'ALL'}
];


const ItemTabs = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Paper square className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="icon label tabs example"
            >
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return <Tab icon={<Icon/>} label={tab.label} />
                })}
            </Tabs>
        </Paper>
    )
};

export default ItemTabs