import {takeEvery} from 'redux-saga/effects';
import {getRepositories} from "../workers/repositoriesWorkers";
import repositoriesActions from "../../action_creators/repositories/repositoriesActions";

export function *watchGetRepositories() {
    yield takeEvery(repositoriesActions.GET_REPOSITORIES_SAGA, getRepositories);
}