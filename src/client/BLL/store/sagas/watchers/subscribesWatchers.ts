import {takeEvery} from 'redux-saga/effects';
import subscribesActions from "../../action_creators/subscribes/subscribesActions";
import {getSubscribes} from "../workers/subscribesWorkers";

export function *watchGetSubscribes() {
    yield takeEvery([subscribesActions.GET_SUBSCRIBES_SAGA, subscribesActions.SET_SUBSCRIBE_FILTERS], getSubscribes);
}