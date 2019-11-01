import React from 'react';
import MaterialTable from 'material-table';
import {selectFavoriteRepositories, selectIsRepositoriesFetching} from "../../../../../BLL/store/selectors/repositories";
import {connect} from "react-redux";
import {runGetStashRepositoriesSaga} from "../../../../../BLL/store/action_creators/repositories/repositoriesActionCreators";


const columns = [
    {title: 'Name', field: 'reponame', cellStyle: {width: '500px'}}
];


const RepositoriesTable = ({repositories, getRepositories, isFetching}) => {
    React.useEffect(() => {
        getRepositories();
    }, []);

    return (
        <MaterialTable
            style={{width: '100%'}}
            title="Repositories"
            options={{pageSize: 10}}
            columns={columns}
            data={repositories}
            isLoading={isFetching}
            actions={[
                {
                    icon: 'delete',
                    tooltip: 'Delete repository',
                    onClick: (event, rowData) => console.log(event, rowData)
                }
            ]}
        />
    );
};

const mapStateToProps = state => ({
    isFetching: selectIsRepositoriesFetching(state),
    repositories: selectFavoriteRepositories(state)
});

const mapDispatchToProps = dispatch => ({
    getRepositories() {
        dispatch(runGetStashRepositoriesSaga());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesTable);