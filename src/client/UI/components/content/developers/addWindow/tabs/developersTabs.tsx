import React from 'react';
import ItemTabs from "../../../../navigation/tabs/tabs";


interface IDevelopersTabsProps {
    setActiveTab: (isFavorite: boolean) => void;
}


const DevelopersTabs = ({setActiveTab}: IDevelopersTabsProps) => {
    return (
        <ItemTabs tabs={[
            {label: 'FAVORITES', clickHandler: () => setActiveTab(true)},
            {label: 'ALL', clickHandler: () => setActiveTab(false)}
        ]} />
    );
};

export default DevelopersTabs;