import React from 'react';
import MaterialTable from 'material-table';
import {connect} from "react-redux";
import {toggleEditingRepositoryWindow} from "../../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";
import {
    selectFavoriteRepositories,
    selectIsRepositoriesFetching
} from "../../../../../../BLL/store/selectors/repositories";
import {runGetFavoriteRepositoriesSaga} from "../../../../../../BLL/store/action_creators/repositories/repositoriesActionCreators";


const RepositoriesTable = ({repositories, isFetching, handleClick, closeEditingRepositoryWindow}) => {
    const columns = [
        {title: 'Name', field: 'reponame', cellStyle: {width: '800px'}}
    ];

    const handleRowClick = (event, rowData) => {
        handleClick(rowData.reponame);
        closeEditingRepositoryWindow();
    };

    return (
        <MaterialTable
            style={{width: '100%'}}
            options={{pageSize: 5, searchFieldAlignment: 'left', showTitle: false}}
            columns={columns}
            data={repositories}
            isLoading={isFetching}
            onRowClick={handleRowClick}
        />
    );
};

const mapStateToProps = state => ({
    isFetching: selectIsRepositoriesFetching(state),
    repositories: selectFavoriteRepositories(state)
});

const mapDispatchToProps = (dispatch) => ({
    closeEditingRepositoryWindow() {
        dispatch(toggleEditingRepositoryWindow());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesTable);