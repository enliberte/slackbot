import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListIcon from '@material-ui/icons/List';


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 500,
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