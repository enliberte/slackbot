import React from 'react';
import FavoriteDevelopers from './favorites/list/favoriteDevelopersContainer';
import StashDevelopers from './stash/list/stashDevelopersContainer';
import DevelopersTabs from './tabs/developersTabs';

const AddDeveloperPanel = () => {
    const [isFavoriteTabActive, setIsFavoriteTabActive] = React.useState(true);

    return (
        <>
            <DevelopersTabs setActiveTab={setIsFavoriteTabActive} />
            {isFavoriteTabActive ? <FavoriteDevelopers/> : <StashDevelopers/>}
        </>
    );
};

export default AddDeveloperPanel;