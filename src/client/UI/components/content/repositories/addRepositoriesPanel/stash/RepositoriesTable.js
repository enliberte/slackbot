import React from 'react';
import MaterialTable from 'material-table';
import {connect} from "react-redux";
import {toggleEditingRepositoryWindow} from "../../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";
import {
    selectIsRepositoriesFetching,
    selectStashRepositories
} from "../../../../../../BLL/store/selectors/repositories";


const RepositoriesTable = ({repositories, isFetching, handleClick, closeEditingRepositoryWindow}) => {
    const columns = [
        {title: 'Name', field: 'name', cellStyle: {width: '800px'}}
    ];

    const handleRowClick = (event, rowData) => {
        handleClick(rowData.name);
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
    repositories: selectStashRepositories(state)
});

const mapDispatchToProps = (dispatch) => ({
    closeEditingRepositoryWindow() {
        dispatch(toggleEditingRepositoryWindow());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesTable);