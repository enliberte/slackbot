import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListIcon from '@material-ui/icons/List';


const tabs = [
    {icon: FavoriteIcon, label: 'FAVORITES'},
    {icon: ListIcon, label: 'ALL'}
];


const ItemTabs = () => {
    return (
        <Tabs
            value={''}
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
    )
};

export default ItemTabs