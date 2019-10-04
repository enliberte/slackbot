import {all} from 'redux-saga/effects';
import {watchGetAuth} from "./watchers/authWatchers";
import {
    watchAddStashDeveloperToFavorites,
    watchDeleteFavoriteDeveloper,
    watchGetFavoriteDevelopers,
    watchGetStashDevelopers
} from "./watchers/developersWatchers";
import {watchGetSubscribes} from "./watchers/subscribesWatchers";
import {
    watchAddStashRepositoryToFavorites,
    watchDeleteFavoriteRepository,
    watchGetFavoriteRepositories,
    watchGetStashRepositories
} from "./watchers/repositoriesWatchers";

export default function *rootSaga() {
    yield all([
        watchGetAuth(),
        watchGetFavoriteDevelopers(),
        watchGetStashDevelopers(),
        watchGetSubscribes(),
        watchDeleteFavoriteDeveloper(),
        watchAddStashDeveloperToFavorites(),
        watchGetFavoriteRepositories(),
        watchGetStashRepositories(),
        watchDeleteFavoriteRepository(),
        watchAddStashRepositoryToFavorites()
    ]);
}