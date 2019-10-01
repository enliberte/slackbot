import {takeEvery} from 'redux-saga/effects';
import authActions from "../../action_creators/auth/authActions";
import {getAuth} from "../workers/authWorkers";


export function *watchGetAuth() {
    yield takeEvery(authActions.GET_AUTH_SAGA, getAuth);
}