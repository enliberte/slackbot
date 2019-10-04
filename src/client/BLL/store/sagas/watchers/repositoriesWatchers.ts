import {takeEvery} from 'redux-saga/effects';
import repositoriesActions from "../../action_creators/repositories/repositoriesActions";
import {
    addStashRepositoryToFavorites,
    deleteFavoriteRepository,
    getFavoriteRepositories,
    getStashRepositories
} from "../workers/repositoriesWorkers";

export function *watchGetFavoriteRepositories() {
    yield takeEvery([
        repositoriesActions.GET_FAVORITE_REPOSITORIES_SAGA,
        repositoriesActions.SEARCH_FAVORITE_REPOSITORIES
    ], getFavoriteRepositories);
}

export function *watchGetStashRepositories() {
    yield takeEvery([
        repositoriesActions.GET_STASH_REPOSITORIES_SAGA,
        repositoriesActions.FILTER_STASH_REPOSITORIES
    ], getStashRepositories);
}

export function *watchDeleteFavoriteRepository() {
    yield takeEvery(repositoriesActions.DELETE_FAVORITE_REPOSITORY_SAGA, deleteFavoriteRepository);
}

export function *watchAddStashRepositoryToFavorites() {
    yield takeEvery(repositoriesActions.ADD_STASH_REPOSITORY_TO_FAVORITES_SAGA, addStashRepositoryToFavorites);
}