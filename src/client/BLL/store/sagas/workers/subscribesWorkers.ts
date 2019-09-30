import {put, call, select} from 'redux-saga/effects';
import {
    IRunDeleteSubscribeSagaAction,
    IRunGetSubscribesSagaAction
} from "../../action_creators/subscribes/ISubscribesActions";
import {setSubscribesData} from "../../action_creators/subscribes/subscribesActionCreators";
import {fetchGetSubscribes} from "../../../API/subscribesAPI";
import {IRunDeleteDeveloperSagaAction} from "../../action_creators/developers/IDevelopersActions";
import {selectChannelId} from "../../selectors/auth";
import {fetchDeleteDeveloper, fetchGetDevelopers} from "../../../API/developersAPI";
import {setDevelopersData} from "../../action_creators/developers/developersActionCreators";


export function *getSubscribes(action: IRunGetSubscribesSagaAction) {
    try {
        const response = yield call(fetchGetSubscribes, action.payload);
        yield put(setSubscribesData(response.data));
    } catch (err) {
        console.log(err);
    }
}

export function *deleteSubscribe(action: IRunDeleteSubscribeSagaAction) {
    try {
        const {reponame} = action.payload;
        // const channelId = yield select(selectChannelId);
        // yield call(fetchDeleteDeveloper, {username, channelId});
        // const getDevelopersResponse = yield call(fetchGetDevelopers, {channelId});
        // yield put(setDevelopersData(getDevelopersResponse.data));
    } catch (err) {
        console.log(err);
    }
}