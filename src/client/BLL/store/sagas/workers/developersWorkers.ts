import {put, call, select} from 'redux-saga/effects';
import {
    IRunAddStashDeveloperToFavoritesSagaAction,
    IRunDeleteFavoriteDeveloperSagaAction,
    IRunGetFavoriteDevelopersSagaAction, IRunGetStashDevelopersSagaAction
} from "../../action_creators/developers/IDevelopersActions";
import {
    fetchAddStashDeveloperToFavorites,
    fetchDeleteDeveloper,
    fetchGetFavoriteDevelopers,
    fetchGetStashDevelopers
} from "../../../API/developersAPI";
import {
    setFavoriteDevelopersData, setIsDevelopersFetching,
    setStashDevelopersData
} from "../../action_creators/developers/developersActionCreators";
import {selectChannelId, selectStashDisplayName} from "../../selectors/auth";


export function *getFavoriteDevelopers(action: IRunGetFavoriteDevelopersSagaAction) {
    try {
        // yield put(setIsFetching(true));
        const channelId = yield select(selectChannelId);
        // const search = yield select(selectSearchFavoriteDevelopersTerm);
        const search = '';
        const response = yield call(fetchGetFavoriteDevelopers, {channelId, search});
        yield put(setFavoriteDevelopersData(response.data));
    } catch (err) {
        console.log(err);
    } finally {
        // yield put(setIsFetching(false));
    }
}

export function *getStashDevelopers(action: IRunGetStashDevelopersSagaAction) {
    try {
        yield put(setIsDevelopersFetching(true));
        const channelId = yield select(selectChannelId);
        // const filter = yield select(selectFilterStashDevelopersTerm);
        // const limit = yield select(selectLimitStashDevelopers);
        const response = yield call(fetchGetStashDevelopers, {channelId});
        yield put(setStashDevelopersData(response.data));
    } catch (err) {
        console.log(err);
    } finally {
        yield put(setIsDevelopersFetching(false));
    }
}

export function *deleteFavoriteDeveloper(action: IRunDeleteFavoriteDeveloperSagaAction) {
    try {
        const channelId = yield select(selectChannelId);
        yield put(setIsDevelopersFetching(true));
        yield call(fetchDeleteDeveloper, {...action.payload, channelId});
        const getStashDevelopersResponse = yield call(fetchGetStashDevelopers, {channelId});
        yield put(setStashDevelopersData(getStashDevelopersResponse.data));
    } catch (err) {
        console.log(err);
    } finally {
        yield put(setIsDevelopersFetching(false));
    }
}

export function *addStashDeveloperToFavorites(action: IRunAddStashDeveloperToFavoritesSagaAction) {
    try {
        const channelId = yield select(selectChannelId);
        const addedByName = yield select(selectStashDisplayName);
        const {username} = action.payload;
        yield put(setIsDevelopersFetching(true));
        yield call(fetchAddStashDeveloperToFavorites, {username, channelId, addedByName});
        const getStashDevelopersResponse = yield call(fetchGetStashDevelopers, {channelId});
        yield put(setStashDevelopersData(getStashDevelopersResponse.data));
    } catch (err) {
        console.log(err);
    } finally {
        yield put(setIsDevelopersFetching(false));
    }
}