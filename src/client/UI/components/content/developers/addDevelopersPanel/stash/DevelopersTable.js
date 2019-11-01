import React from 'react';
import MaterialTable from 'material-table';
import {connect} from "react-redux";
import {selectIsDevelopersFetching, selectStashDevelopers} from "../../../../../../BLL/store/selectors/developers";
import {
    toggleEditingDeveloperWindow
} from "../../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";


const DevelopersTable = ({developers, isFetching, handleClick, toggleEditingDeveloperWindow}) => {
    const columns = [
        {title: 'Name', field: 'displayName', cellStyle: {width: '500px'}}
    ];

    const handleRowClick = (event, rowData) => {
        handleClick(rowData.displayName);
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
    developers: selectStashDevelopers(state)
});

const mapDispatchToProps = (dispatch) => ({
    toggleEditingDeveloperWindow() {
        dispatch(toggleEditingDeveloperWindow());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DevelopersTable);