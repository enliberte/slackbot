import React from 'react';
import FavoriteIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ListIcon from '@material-ui/icons/List';
import URLS from "../../../../URLS";
import ItemTabs from "../../../navigation/tabs/tabs";

const tabs = [
    {icon: FavoriteIcon, label: 'FAVORITES', link: URLS.FAVORITE_DEVELOPERS},
    {icon: ListIcon, label: 'ALL', link: URLS.STASH_DEVELOPERS}
];

const DevelopersTabs = () => {
    return <ItemTabs tabs={tabs} />
};

export default DevelopersTabs;