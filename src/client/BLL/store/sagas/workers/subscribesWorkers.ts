import {put, call, select} from 'redux-saga/effects';
import {
    IRunDeleteSubscribeSagaAction, IRunEditSubscribeSagaAction,
    IRunGetSubscribesSagaAction, IRunSaveSubscribeSagaAction
} from "../../action_creators/subscribes/ISubscribesActions";
import {
    runGetSubscribesSaga, setIsSuccess,
    setSubscribesData,
    toggleEditingWindow
} from "../../action_creators/subscribes/subscribesActionCreators";
import {
    fetchDeleteSubscribe,
    fetchEditSubscribe,
    fetchGetSubscribes,
    fetchSaveSubscribe
} from "../../../API/subscribesAPI";
import {selectChannelId, selectUsername} from "../../selectors/auth";
import {selectSubscribe, selectSubscribeFilters} from "../../selectors/subscribes";
import {runGetFavoriteDevelopersSaga} from "../../action_creators/developers/developersActionCreators";
import {
    runGetFavoriteRepositoriesSaga,
} from "../../action_creators/repositories/repositoriesActionCreators";


export function *getSubscribes(action: IRunGetSubscribesSagaAction) {
    try {
        const channelId = yield select(selectChannelId);
        const subscribeFilters = yield select(selectSubscribeFilters);
        const response = yield call(fetchGetSubscribes, {...subscribeFilters, channelId});
        yield put(setSubscribesData(response.data));
    } catch (err) {
        console.log(err);
    }
}

export function *saveSubscribe(action: IRunSaveSubscribeSagaAction) {
    try {
        const channelId = yield select(selectChannelId);
        const follower = yield select(selectUsername);
        const {followed, reponame} = yield select(selectSubscribe);
        const addSubscribeResponse = yield call(fetchSaveSubscribe, {followed, follower, reponame, channelId});
        const isSuccess = addSubscribeResponse.data;
        yield put(setIsSuccess(isSuccess));
        yield put(toggleEditingWindow());
        yield put(runGetSubscribesSaga());
        yield put(runGetFavoriteDevelopersSaga());
        yield put(runGetFavoriteRepositoriesSaga());
    } catch (err) {
        console.log(err);
    }
}

export function *editSubscribe(action: IRunEditSubscribeSagaAction) {
    try {
        const channelId = yield select(selectChannelId);
        const follower = yield select(selectUsername);
        const subscribeData = yield select(selectSubscribe);
        const editSubscribeResponse = yield call(fetchEditSubscribe, {follower, channelId, ...subscribeData});
        const isSuccess = editSubscribeResponse.data;
        yield put(setIsSuccess(isSuccess));
        yield put(toggleEditingWindow());
        yield put(runGetSubscribesSaga());
        yield put(runGetFavoriteDevelopersSaga());
        yield put(runGetFavoriteRepositoriesSaga());
    } catch (err) {
        console.log(err);
    }
}

export function *deleteSubscribe(action: IRunDeleteSubscribeSagaAction) {
    try {
        const deleteSubscribeResponse = yield call(fetchDeleteSubscribe, action.payload);
        const isSuccess = deleteSubscribeResponse.data;
        yield put(runGetSubscribesSaga());
    } catch (err) {
        console.log(err);
    }
}
