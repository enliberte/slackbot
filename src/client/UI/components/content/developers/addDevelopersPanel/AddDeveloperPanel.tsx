import React from 'react';
// @ts-ignore
import FavoriteDevelopersTable from './favorite/DevelopersTable'
// @ts-ignore
import StashDevelopersTable from './stash/DevelopersTable'
import FavoriteTabs from "../../../common/tabs/favoriteTabs/FavoriteTabs";

const AddDeveloperPanel = ({handleClick}: any) => {
    const [isFavoriteTabActive, setIsFavoriteTabActive] = React.useState(true);

    return (
        <>
            <FavoriteTabs setActiveTab={setIsFavoriteTabActive} />
            {isFavoriteTabActive ? <FavoriteDevelopersTable handleClick={handleClick}/> : <StashDevelopersTable handleClick={handleClick}/>}
        </>
    );
};

export default AddDeveloperPanel;