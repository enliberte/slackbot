import {put, call, select} from 'redux-saga/effects';
import {
    IRunAddStashRepositoryToFavoritesSagaAction,
    IRunDeleteFavoriteRepositorySagaAction,
    IRunGetFavoriteRepositoriesSagaAction,
    IRunGetStashRepositoriesSagaAction
} from "../../action_creators/repositories/IRepositoriesActions";
import {
    setFavoriteRepositoriesData,
    setStashRepositoriesData,
    setIsRepositoriesFetching
} from "../../action_creators/repositories/repositoriesActionCreators";
import {
    fetchAddStashRepositoryToFavorites, fetchDeleteRepository,
    fetchGetFavoriteRepositories,
    fetchGetStashRepositories
} from "../../../API/repositoriesAPI";
import {selectChannelId, selectStashDisplayName} from "../../selectors/auth";


export function *getFavoriteRepositories(action: IRunGetFavoriteRepositoriesSagaAction) {
    try {
        // yield put(setIsFetching(true));
        const channelId = yield select(selectChannelId);
        // const search = yield select(selectSearchFavoriteRepositoriesTerm);
        const search = '';
        const response = yield call(fetchGetFavoriteRepositories, {channelId, search});
        yield put(setFavoriteRepositoriesData(response.data));
    } catch (err) {
        console.log(err);
    } finally {
        // yield put(setIsFetching(false));
    }
}

export function *getStashRepositories(action: IRunGetStashRepositoriesSagaAction) {
    try {
        const channelId = yield select(selectChannelId);
        yield put(setIsRepositoriesFetching(true));
        const response = yield call(fetchGetStashRepositories, {channelId});
        yield put(setStashRepositoriesData(response.data));
    } catch (err) {
        console.log(err);
    } finally {
        yield put(setIsRepositoriesFetching(false));
    }
}

export function *deleteFavoriteRepository(action: IRunDeleteFavoriteRepositorySagaAction) {
    try {
        const channelId = yield select(selectChannelId);
        yield put(setIsRepositoriesFetching(true));
        yield call(fetchDeleteRepository, {...action.payload, channelId});
        const getStashRepositoriesResponse = yield call(fetchGetStashRepositories, {channelId});
        yield put(setStashRepositoriesData(getStashRepositoriesResponse.data));
    } catch (err) {
        console.log(err);
    } finally {
        yield put(setIsRepositoriesFetching(false));
    }
}

export function *addStashRepositoryToFavorites(action: IRunAddStashRepositoryToFavoritesSagaAction) {
    try {
        const channelId = yield select(selectChannelId);
        const addedByName = yield select(selectStashDisplayName);
        const {reponame} = action.payload;
        yield put(setIsRepositoriesFetching(true));
        yield call(fetchAddStashRepositoryToFavorites, {reponame, channelId, addedByName});
        const getStashRepositoriesResponse = yield call(fetchGetStashRepositories, {channelId});
        yield put(setStashRepositoriesData(getStashRepositoriesResponse.data));
    } catch (err) {
        console.log(err);
    } finally {
        yield put(setIsRepositoriesFetching(false));
    }
}