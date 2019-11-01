import React from 'react';
// @ts-ignore
import FavoriteRepositoriesTable from './favorite/RepositoriesTable'
// @ts-ignore
import StashRepositoriesTable from './stash/RepositoriesTable'
import FavoriteTabs from "../../../common/tabs/favoriteTabs/FavoriteTabs";

const AddRepositoryPanel = ({handleClick}: any) => {
    const [isFavoriteTabActive, setIsFavoriteTabActive] = React.useState(true);

    return (
        <>
            <FavoriteTabs setActiveTab={setIsFavoriteTabActive} />
            {isFavoriteTabActive ? <FavoriteRepositoriesTable handleClick={handleClick}/> : <StashRepositoriesTable handleClick={handleClick}/>}
        </>
    );
};

export default AddRepositoryPanel;