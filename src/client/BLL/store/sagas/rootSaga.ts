import {all} from 'redux-saga/effects';
import {watchAddStashUser, watchGetAuth, watchRefreshToken} from "./watchers/authWatchers";
import {
    watchAddStashDeveloperToFavorites,
    watchDeleteFavoriteDeveloper,
    watchGetFavoriteDevelopers,
    watchGetStashDevelopers
} from "./watchers/developersWatchers";
import {
    watchDeleteSubscribe, watchEditSubscribe,
    watchGetSubscribes,
    watchSaveSubscribe
} from "./watchers/subscribesWatchers";
import {
    watchAddStashRepositoryToFavorites,
    watchDeleteFavoriteRepository,
    watchGetFavoriteRepositories,
    watchGetStashRepositories
} from "./watchers/repositoriesWatchers";

export default function *rootSaga() {
    yield all([
        watchGetAuth(),
        watchAddStashUser(),
        watchGetFavoriteDevelopers(),
        watchGetStashDevelopers(),
        watchGetSubscribes(),
        watchDeleteFavoriteDeveloper(),
        watchAddStashDeveloperToFavorites(),
        watchGetFavoriteRepositories(),
        watchGetStashRepositories(),
        watchDeleteFavoriteRepository(),
        watchAddStashRepositoryToFavorites(),
        watchSaveSubscribe(),
        watchEditSubscribe(),
        watchDeleteSubscribe(),
        watchRefreshToken()
    ]);
}