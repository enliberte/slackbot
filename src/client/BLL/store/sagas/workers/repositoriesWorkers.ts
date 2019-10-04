import {put, call, select} from 'redux-saga/effects';
import {setIsFetching} from "../../action_creators/fetching/fetchingActionCreators";
import {
    IRunAddStashRepositoryToFavoritesSagaAction,
    IRunDeleteFavoriteRepositorySagaAction,
    IRunGetFavoriteRepositoriesSagaAction,
    IRunGetStashRepositoriesSagaAction
} from "../../action_creators/repositories/IRepositoriesActions";
import {
    setFavoriteRepositoriesData,
    setStashRepositoriesData
} from "../../action_creators/repositories/repositoriesActionCreators";
import {
    fetchAddStashRepositoryToFavorites, fetchDeleteRepository,
    fetchGetFavoriteRepositories,
    fetchGetStashRepositories
} from "../../../API/repositoriesAPI";
import {selectChannelId, selectUsername} from "../../selectors/auth";
import {
    selectFilterStashRepositoriesTerm,
    selectLimitStashRepositories,
    selectSearchFavoriteRepositoriesTerm
} from "../../selectors/repositories";


export function *getFavoriteRepositories(action: IRunGetFavoriteRepositoriesSagaAction) {
    try {
        yield put(setIsFetching(true));
        const channelId = yield select(selectChannelId);
        const search = yield select(selectSearchFavoriteRepositoriesTerm);
        const response = yield call(fetchGetFavoriteRepositories, {channelId, search});
        yield put(setFavoriteRepositoriesData(response.data));
    } catch (err) {
        console.log(err);
    } finally {
        yield put(setIsFetching(false));
    }
}

export function *getStashRepositories(action: IRunGetStashRepositoriesSagaAction) {
    try {
        yield put(setIsFetching(true));
        const channelId = yield select(selectChannelId);
        const name = yield select(selectFilterStashRepositoriesTerm);
        const limit = yield select(selectLimitStashRepositories);
        const response = yield call(fetchGetStashRepositories, {name, limit, channelId});
        yield put(setStashRepositoriesData(response.data));
    } catch (err) {
        console.log(err);
    } finally {
        yield put(setIsFetching(false));
    }
}

export function *deleteFavoriteRepository(action: IRunDeleteFavoriteRepositorySagaAction) {
    try {
        const {reponame} = action.payload;
        const channelId = yield select(selectChannelId);
        const search = yield select(selectSearchFavoriteRepositoriesTerm);
        yield call(fetchDeleteRepository, {reponame, channelId});
        const getRepositoriesResponse = yield call(fetchGetFavoriteRepositories, {channelId, search});
        yield put(setFavoriteRepositoriesData(getRepositoriesResponse.data));
    } catch (err) {
        console.log(err);
    }
}

export function *addStashRepositoryToFavorites(action: IRunAddStashRepositoryToFavoritesSagaAction) {
    try {
        const channelId = yield select(selectChannelId);
        const addedByName = yield select(selectUsername);
        const reponame = action.payload;
        yield call(fetchAddStashRepositoryToFavorites, {reponame, channelId, addedByName});
    } catch (err) {
        console.log(err);
    }
}