import {takeEvery} from 'redux-saga/effects';
import developersActions from "../../action_creators/developers/developersActions";
import {
    addStashDeveloperToFavorites,
    deleteFavoriteDeveloper,
    getFavoriteDevelopers,
    getStashDevelopers
} from "../workers/developersWorkers";

export function *watchGetFavoriteDevelopers() {
    yield takeEvery([
        developersActions.GET_FAVORITE_DEVELOPERS_SAGA,
        developersActions.SEARCH_FAVORITE_DEVELOPERS
        ], getFavoriteDevelopers);
}

export function *watchGetStashDevelopers() {
    yield takeEvery([
        developersActions.GET_STASH_DEVELOPERS_SAGA,
        developersActions.FILTER_STASH_DEVELOPERS
    ], getStashDevelopers);
}

export function *watchDeleteFavoriteDeveloper() {
    yield takeEvery(developersActions.DELETE_FAVORITE_DEVELOPER_SAGA, deleteFavoriteDeveloper);
}

export function *watchAddStashDeveloperToFavorites() {
    yield takeEvery(developersActions.ADD_STASH_DEVELOPER_TO_FAVORITES_SAGA, addStashDeveloperToFavorites);
}