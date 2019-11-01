import React from 'react';
import MaterialTable from 'material-table';
import {selectIsDevelopersFetching} from "../../../../../BLL/store/selectors/developers";
import {connect} from "react-redux";
import {selectStashDevelopers} from "../../../../../BLL/store/selectors/developers";
import {
    runAddStashDeveloperToFavoritesSaga, runDeleteFavoriteDeveloperSaga
} from "../../../../../BLL/store/action_creators/developers/developersActionCreators";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import StashDevelopersTableTitle from "./DevelopersTableTitle";


const DevelopersTable = ({developers, isFetching, addDeveloperToFavorites, removeDeveloperFromFavorites}) => {
    const columns = [
        {title: 'Name', field: 'displayName', cellStyle: {width: '500px'}},
        {title: 'E-mail', field: 'emailAddress', cellStyle: {width: '800px'}}
    ];

    const handleAddToFavorites = (event, rowData) => new Promise(resolve => {
        const {displayName: username} = rowData;
        if (rowData.isFavorite) {
            removeDeveloperFromFavorites({username});
        } else {
            addDeveloperToFavorites({username});
        }
        resolve();
    });

    return (
        <MaterialTable
            style={{width: '100%'}}
            title={<StashDevelopersTableTitle />}
            options={{pageSize: 10}}
            columns={columns}
            data={developers}
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
    isFetching: selectIsDevelopersFetching(state),
    developers: selectStashDevelopers(state)
});

const mapDispatchToProps = dispatch => ({
    addDeveloperToFavorites(developerData) {
        dispatch(runAddStashDeveloperToFavoritesSaga(developerData));
    },
    removeDeveloperFromFavorites(developerData) {
        dispatch(runDeleteFavoriteDeveloperSaga(developerData));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DevelopersTable);