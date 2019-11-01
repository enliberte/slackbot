import {put, call, select} from 'redux-saga/effects';
import {
    IRunDeleteSubscribeSagaAction, IRunEditSubscribeSagaAction,
    IRunGetSubscribesSagaAction, IRunSaveSubscribeSagaAction
} from "../../action_creators/subscribes/ISubscribesActions";
import {
    runGetSubscribesSaga, setIsSuccess, setSubscribeError,
    setSubscribesData,
    toggleEditingWindow
} from "../../action_creators/subscribes/subscribesActionCreators";
import {
    fetchDeleteSubscribe,
    fetchEditSubscribe,
    fetchGetSubscribes,
    fetchSaveSubscribe
} from "../../../API/subscribesAPI";
import {selectChannelId, selectStashDisplayName} from "../../selectors/auth";
import {selectSubscribeFilters} from "../../selectors/subscribes";
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
        const follower = yield select(selectStashDisplayName);
        const addSubscribeResponse = yield call(fetchSaveSubscribe, {follower, channelId, ...action.payload});
        const {developer, repository, subscribe} = addSubscribeResponse.data;
        const developerError = typeof developer === 'string' ? developer : '';
        const repositoryError = typeof repository === 'string' ? repository : '';
        const subscribeError = typeof subscribe === 'string' ? subscribe : '';
        const isSuccess = developerError === '' && repositoryError === '' && subscribeError === '';
        yield put(setIsSuccess(isSuccess));
        if (isSuccess) {
            yield action.resolve();
            yield put(toggleEditingWindow());
            yield put(runGetSubscribesSaga());
            yield put(runGetFavoriteDevelopersSaga());
            yield put(runGetFavoriteRepositoriesSaga());
        } else {
            yield put(setSubscribeError({developer: developerError, repository: repositoryError, subscribe: subscribeError}));
            yield action.reject();
        }
    } catch (err) {
        console.log(err);
    }
}

export function *editSubscribe(action: IRunEditSubscribeSagaAction) {
    try {
        const channelId = yield select(selectChannelId);
        const follower = yield select(selectStashDisplayName);
        const editSubscribeResponse = yield call(fetchEditSubscribe, {follower, channelId, ...action.payload});
        const {developer, repository, subscribe} = editSubscribeResponse.data;
        const developerError = typeof developer === 'string' ? developer : '';
        const repositoryError = typeof repository === 'string' ? repository : '';
        const subscribeError = typeof subscribe === 'string' ? subscribe : '';
        const isSuccess = developerError === '' && repositoryError === '' && subscribeError === '';
        yield put(setIsSuccess(isSuccess));
        if (isSuccess) {
            yield action.resolve();
            yield put(toggleEditingWindow());
            yield put(runGetSubscribesSaga());
            yield put(runGetFavoriteDevelopersSaga());
            yield put(runGetFavoriteRepositoriesSaga());
        } else {
            yield put(setSubscribeError({developer: developerError, repository: repositoryError, subscribe: subscribeError}));
            yield action.reject();
        }
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
