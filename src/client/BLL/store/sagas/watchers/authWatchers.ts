import {takeEvery} from 'redux-saga/effects';
import actions from "../../reducers/actions";
import {getAuth} from "../workers/authWorkers";


export function *watchGetAuth() {
    yield takeEvery(actions.GET_AUTH_SAGA, getAuth);
}