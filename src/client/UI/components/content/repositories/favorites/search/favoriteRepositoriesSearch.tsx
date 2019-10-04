import React from 'react';
import Search from "../../../../navigation/search/search";
import {connect} from "react-redux";
import {selectSearchFavoriteRepositoriesTerm} from "../../../../../../BLL/store/selectors/repositories";
import {searchFavoriteRepositories} from "../../../../../../BLL/store/action_creators/repositories/repositoriesActionCreators";

type FavoriteRepositoriesSearchProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const FavoriteRepositoriesSearch = ({search, handleSearch}: FavoriteRepositoriesSearchProps) => {
    return (
        <Search search={search} handleSearch={handleSearch} />
    );
};

const mapStateToProps = (state: any) => ({
    search: selectSearchFavoriteRepositoriesTerm(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(searchFavoriteRepositories(event.target.value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRepositoriesSearch);