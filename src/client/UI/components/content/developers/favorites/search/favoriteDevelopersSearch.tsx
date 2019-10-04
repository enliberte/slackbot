import React from 'react';
import Search from "../../../../navigation/search/search";
import {selectSearchFavoriteDevelopersTerm} from "../../../../../../BLL/store/selectors/developers";
import {searchFavoriteDevelopers} from "../../../../../../BLL/store/action_creators/developers/developersActionCreators";
import {connect} from "react-redux";

type FavoriteDevelopersSearchProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const FavoriteDevelopersSearch = ({search, handleSearch}: FavoriteDevelopersSearchProps) => {
    return (
        <Search search={search} handleSearch={handleSearch} />
    );
};

const mapStateToProps = (state: any) => ({
    search: selectSearchFavoriteDevelopersTerm(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(searchFavoriteDevelopers(event.target.value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteDevelopersSearch);