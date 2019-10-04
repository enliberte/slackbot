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
    setFavoriteDevelopersData,
    setStashDevelopersData
} from "../../action_creators/developers/developersActionCreators";
import {selectChannelId, selectUsername} from "../../selectors/auth";
import {
    selectFilterStashDevelopersTerm,
    selectLimitStashDevelopers,
    selectSearchFavoriteDevelopersTerm
} from "../../selectors/developers";
import {setIsFetching} from "../../action_creators/fetching/fetchingActionCreators";


export function *getFavoriteDevelopers(action: IRunGetFavoriteDevelopersSagaAction) {
    try {
        yield put(setIsFetching(true));
        const channelId = yield select(selectChannelId);
        const search = yield select(selectSearchFavoriteDevelopersTerm);
        const response = yield call(fetchGetFavoriteDevelopers, {channelId, search});
        yield put(setFavoriteDevelopersData(response.data));
    } catch (err) {
        console.log(err);
    } finally {
        yield put(setIsFetching(false));
    }
}

export function *getStashDevelopers(action: IRunGetStashDevelopersSagaAction) {
    try {
        yield put(setIsFetching(true));
        const channelId = yield select(selectChannelId);
        const filter = yield select(selectFilterStashDevelopersTerm);
        const limit = yield select(selectLimitStashDevelopers);
        const response = yield call(fetchGetStashDevelopers, {filter, limit, channelId});
        yield put(setStashDevelopersData(response.data));
    } catch (err) {
        console.log(err);
    } finally {
        yield put(setIsFetching(false));
    }
}

export function *deleteFavoriteDeveloper(action: IRunDeleteFavoriteDeveloperSagaAction) {
    try {
        const {username} = action.payload;
        const channelId = yield select(selectChannelId);
        const search = yield select(selectSearchFavoriteDevelopersTerm);
        yield call(fetchDeleteDeveloper, {username, channelId});
        const getDevelopersResponse = yield call(fetchGetFavoriteDevelopers, {channelId, search});
        yield put(setFavoriteDevelopersData(getDevelopersResponse.data));
    } catch (err) {
        console.log(err);
    }
}

export function *addStashDeveloperToFavorites(action: IRunAddStashDeveloperToFavoritesSagaAction) {
    try {
        const channelId = yield select(selectChannelId);
        const addedByName = yield select(selectUsername);
        const username = action.payload;
        yield call(fetchAddStashDeveloperToFavorites, {username, channelId, addedByName});
    } catch (err) {
        console.log(err);
    }
}