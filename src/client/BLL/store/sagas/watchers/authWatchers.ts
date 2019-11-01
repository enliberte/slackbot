import {takeEvery} from 'redux-saga/effects';
import authActions from "../../action_creators/auth/authActions";
import {addStashUser, getAuth, refreshToken} from "../workers/authWorkers";


export function *watchGetAuth() {
    yield takeEvery(authActions.GET_AUTH_SAGA, getAuth);
}

export function *watchRefreshToken() {
    yield takeEvery(authActions.RUN_REFRESH_SAGA, refreshToken);
}

export function *watchAddStashUser() {
    yield takeEvery(authActions.ADD_STASH_USER_SAGA, addStashUser);
}