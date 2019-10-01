import {all} from 'redux-saga/effects';
import {watchGetAuth} from "./watchers/authWatchers";
import {watchDeleteDeveloper, watchGetDevelopers} from "./watchers/developersWatchers";
import {watchGetRepositories} from "./watchers/repositoriesWatchers";
import {watchGetSubscribes} from "./watchers/subscribesWatchers";

export default function *rootSaga() {
    yield all([
        watchGetAuth(),
        watchGetDevelopers(),
        watchGetRepositories(),
        watchGetSubscribes(),
        watchDeleteDeveloper()
    ]);
}