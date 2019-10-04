import React from 'react';
import Search from "../../../../navigation/search/search";
import {selectFilterStashDevelopersTerm} from "../../../../../../BLL/store/selectors/developers";
import {filterStashDevelopers} from "../../../../../../BLL/store/action_creators/developers/developersActionCreators";
import {connect} from "react-redux";

type StashDevelopersSearchProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const StashDevelopersSearch = ({search, handleSearch}: StashDevelopersSearchProps) => {
    return (
        <Search search={search} handleSearch={handleSearch} />
    );
};

const mapStateToProps = (state: any) => ({
    search: selectFilterStashDevelopersTerm(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(filterStashDevelopers(event.target.value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(StashDevelopersSearch);