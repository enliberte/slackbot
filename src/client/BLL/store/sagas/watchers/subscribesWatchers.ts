import {takeEvery} from 'redux-saga/effects';
import subscribesActions from "../../action_creators/subscribes/subscribesActions";
import {
    deleteSubscribe,
    editSubscribe,
    getSubscribes,
    saveSubscribe
} from "../workers/subscribesWorkers";

export function *watchGetSubscribes() {
    yield takeEvery([subscribesActions.GET_SUBSCRIBES_SAGA, subscribesActions.SET_SUBSCRIBE_FILTERS], getSubscribes);
}

export function *watchSaveSubscribe() {
    yield takeEvery(subscribesActions.SAVE_SUBSCRIBE_SAGA, saveSubscribe);
}

export function *watchEditSubscribe() {
    yield takeEvery(subscribesActions.EDIT_SUBSCRIBE_SAGA, editSubscribe);
}

export function *watchDeleteSubscribe() {
    yield takeEvery(subscribesActions.DELETE_SUBSCRIBE_SAGA, deleteSubscribe);
}