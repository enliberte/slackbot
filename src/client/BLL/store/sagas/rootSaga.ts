import {all} from 'redux-saga/effects';
import {watchGetAuth} from "./watchers/authWatchers";

export default function *rootSaga() {
    yield all([
        watchGetAuth()
    ]);
}