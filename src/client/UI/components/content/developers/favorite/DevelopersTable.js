import React from 'react';
import MaterialTable from 'material-table';
import {connect} from "react-redux";
import {selectFavoriteDevelopers, selectIsDevelopersFetching} from "../../../../../BLL/store/selectors/developers";
import {runGetFavoriteDevelopersSaga} from "../../../../../BLL/store/action_creators/developers/developersActionCreators";


const DevelopersTable = ({developers, getDevelopers, isFetching}) => {
    const columns = [
        {title: 'Name', field: 'username', cellStyle: {width: '500px'}}
    ];

    React.useEffect(() => {
        getDevelopers();
    }, []);

    return (
        <MaterialTable
            style={{width: '100%'}}
            title="Developers"
            options={{pageSize: 10}}
            columns={columns}
            data={developers}
            isLoading={isFetching}
            actions={[
                {
                    icon: 'delete',
                    tooltip: 'Delete developer',
                    onClick: (event, rowData) => console.log(event, rowData)
                }
            ]}
        />
    );
};

const mapStateToProps = state => ({
    isFetching: selectIsDevelopersFetching(state),
    developers: selectFavoriteDevelopers(state)
});

const mapDispatchToProps = dispatch => ({
    getDevelopers() {
        dispatch(runGetFavoriteDevelopersSaga());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DevelopersTable);