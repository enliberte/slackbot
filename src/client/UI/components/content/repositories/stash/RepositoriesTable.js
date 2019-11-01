import React from 'react';
import MaterialTable from 'material-table';
import {
    selectIsRepositoriesFetching,
    selectStashRepositories
} from "../../../../../BLL/store/selectors/repositories";
import {connect} from "react-redux";
import {
    runAddStashRepositoryToFavoritesSaga, runDeleteFavoriteRepositorySaga
} from "../../../../../BLL/store/action_creators/repositories/repositoriesActionCreators";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import StashRepositoriesTableTitle from "./RepositoriesTableTitle";


const columns = [
    {title: 'Name', field: 'name', cellStyle: {width: '500px'}},
    {title: 'URL', field: 'url', cellStyle: {width: '800px'}},
];


const RepositoriesTable = ({repositories, isFetching, addRepositoryToFavorites, removeRepositoryFromFavorites}) => {
    const handleAddToFavorites = (event, rowData) => new Promise(resolve => {
        const {name: reponame} = rowData;
        if (rowData.isFavorite) {
            removeRepositoryFromFavorites({reponame});
        } else {
            addRepositoryToFavorites({reponame});
        }
        resolve();
    });

    return (
        <MaterialTable
            style={{width: '100%'}}
            title={<StashRepositoriesTableTitle />}
            options={{pageSize: 10}}
            columns={columns}
            data={repositories}
            isLoading={isFetching}
            actions={[
                rowData => ({
                    icon: rowData.isFavorite ? StarIcon : StarBorderIcon,
                    tooltip: rowData.isFavorite ? 'Remove from favorites' : 'Add to favorites',
                    onClick: handleAddToFavorites
                })
            ]}
        />
    );
};

const mapStateToProps = state => ({
    isFetching: selectIsRepositoriesFetching(state),
    repositories: selectStashRepositories(state)
});

const mapDispatchToProps = dispatch => ({
    addRepositoryToFavorites(repositoryData) {
        dispatch(runAddStashRepositoryToFavoritesSaga(repositoryData));
    },
    removeRepositoryFromFavorites(repositoryData) {
        dispatch(runDeleteFavoriteRepositorySaga(repositoryData));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesTable);