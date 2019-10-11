import React from 'react';
import FavoriteRepositories from './favorites/list/favoriteRepositoriesContainer';
import StashRepositories from './stash/list/stashRepositoriesContainer';
import RepositoryTabs from './tabs/repositoriesTabs';

const AddRepositoryPanel = () => {
    const [isFavoriteTabActive, setIsFavoriteTabActive] = React.useState(true);

    return (
        <>
            <RepositoryTabs setActiveTab={setIsFavoriteTabActive} />
            {isFavoriteTabActive ? <FavoriteRepositories/> : <StashRepositories/>}
        </>
    );
};

export default AddRepositoryPanel;