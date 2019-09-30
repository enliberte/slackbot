import {takeEvery} from 'redux-saga/effects';
import developersActions from "../../action_creators/developers/developersActions";
import {getDevelopers} from "../workers/developersWorkers";

export function *watchGetDevelopers() {
    yield takeEvery(developersActions.GET_DEVELOPERS_SAGA, getDevelopers);
}

export function *watchDeleteDeveloper() {
    yield takeEvery(developersActions.DELETE_DEVELOPER, getDevelopers);
}