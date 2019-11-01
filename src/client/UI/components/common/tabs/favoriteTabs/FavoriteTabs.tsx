import React from 'react';
import ItemTabs from "../tabs";


interface IFavoriteTabsProps {
    setActiveTab: (isFavorite: boolean) => void;
}


const FavoriteTabs = ({setActiveTab}: IFavoriteTabsProps) => {
    return (
        <ItemTabs tabs={[
            {label: 'FAVORITES', clickHandler: () => setActiveTab(true)},
            {label: 'ALL', clickHandler: () => setActiveTab(false)}
        ]} />
    );
};

export default FavoriteTabs;