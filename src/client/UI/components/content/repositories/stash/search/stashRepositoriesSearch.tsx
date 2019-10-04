import React from 'react';
import Search from "../../../../navigation/search/search";
import {connect} from "react-redux";
import {selectFilterStashRepositoriesTerm} from "../../../../../../BLL/store/selectors/repositories";
import {filterStashRepositories} from "../../../../../../BLL/store/action_creators/repositories/repositoriesActionCreators";

type StashRepositoriesSearch = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const StashRepositoriesSearch = ({search, handleSearch}: StashRepositoriesSearch) => {
    return (
        <Search search={search} handleSearch={handleSearch} />
    );
};

const mapStateToProps = (state: any) => ({
    search: selectFilterStashRepositoriesTerm(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(filterStashRepositories(event.target.value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(StashRepositoriesSearch);