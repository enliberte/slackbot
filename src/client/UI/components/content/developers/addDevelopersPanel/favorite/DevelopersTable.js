import React from 'react';
import MaterialTable from 'material-table';
import {connect} from "react-redux";
import {selectFavoriteDevelopers, selectIsDevelopersFetching} from "../../../../../../BLL/store/selectors/developers";
import {
    toggleEditingDeveloperWindow
} from "../../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";


const DevelopersTable = ({developers, isFetching, handleClick, toggleEditingDeveloperWindow}) => {
    const columns = [
        {title: 'Name', field: 'username', cellStyle: {width: '500px'}}
    ];

    const handleRowClick = (event, rowData) => {
        handleClick(rowData.username);
        toggleEditingDeveloperWindow();
    };

    return (
        <MaterialTable
            style={{width: '100%'}}
            options={{pageSize: 5, searchFieldAlignment: 'left', showTitle: false}}
            columns={columns}
            data={developers}
            isLoading={isFetching}
            onRowClick={handleRowClick}
        />
    );
};

const mapStateToProps = state => ({
    isFetching: selectIsDevelopersFetching(state),
    developers: selectFavoriteDevelopers(state)
});

const mapDispatchToProps = (dispatch) => ({
    toggleEditingDeveloperWindow() {
        dispatch(toggleEditingDeveloperWindow());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DevelopersTable);