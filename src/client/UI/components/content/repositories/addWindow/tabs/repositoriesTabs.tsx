import React from 'react';
import ItemTabs from "../../../../navigation/tabs/tabs";


interface IRepositoriesTabsProps {
    setActiveTab: (isFavorite: boolean) => void;
}


const RepositoriesTabs = ({setActiveTab}: IRepositoriesTabsProps) => {
    return (
        <ItemTabs tabs={[
            {label: 'FAVORITES', clickHandler: () => setActiveTab(true)},
            {label: 'ALL', clickHandler: () => setActiveTab(false)}
        ]} />
    );
};

export default RepositoriesTabs;