import {all} from 'redux-saga/effects';
import {watchGetAuth} from "./watchers/authWatchers";
import {watchGetDevelopers} from "./watchers/developersWatchers";
import {watchGetRepositories} from "./watchers/repositoriesWatchers";

export default function *rootSaga() {
    yield all([
        watchGetAuth(),
        watchGetDevelopers(),
        watchGetRepositories()
    ]);
}