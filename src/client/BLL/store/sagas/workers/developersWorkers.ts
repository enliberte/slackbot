import {put, call, select} from 'redux-saga/effects';
import {
    IRunDeleteDeveloperSagaAction,
    IRunGetDevelopersSagaAction
} from "../../action_creators/developers/IDevelopersActions";
import {fetchDeleteDeveloper, fetchGetDevelopers} from "../../../API/developersAPI";
import {setDevelopersData} from "../../action_creators/developers/developersActionCreators";
import {selectChannelId} from "../../selectors/auth";


export function *getDevelopers(action: IRunGetDevelopersSagaAction) {
    try {
        const channelId = yield select(selectChannelId);
        const response = yield call(fetchGetDevelopers, {channelId});
        yield put(setDevelopersData(response.data));
    } catch (err) {
        console.log(err);
    }
}

export function *deleteDeveloper(action: IRunDeleteDeveloperSagaAction) {
    try {
        const {username} = action.payload;
        const channelId = yield select(selectChannelId);
        yield call(fetchDeleteDeveloper, {username, channelId});
        const getDevelopersResponse = yield call(fetchGetDevelopers, {channelId});
        yield put(setDevelopersData(getDevelopersResponse.data));
    } catch (err) {
        console.log(err);
    }
}