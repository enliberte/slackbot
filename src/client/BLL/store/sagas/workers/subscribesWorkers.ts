import {put, call, select} from 'redux-saga/effects';
import {
    IRunDeleteSubscribeSagaAction,
    IRunGetSubscribesSagaAction
} from "../../action_creators/subscribes/ISubscribesActions";
import {setSubscribesData} from "../../action_creators/subscribes/subscribesActionCreators";
import {fetchGetSubscribes} from "../../../API/subscribesAPI";
import {IRunDeleteFavoriteDeveloperSagaAction} from "../../action_creators/developers/IDevelopersActions";
import {selectChannelId} from "../../selectors/auth";
import {fetchDeleteDeveloper, fetchGetFavoriteDevelopers} from "../../../API/developersAPI";
import {setFavoriteDevelopersData} from "../../action_creators/developers/developersActionCreators";
import {selectSubscribeFilters} from "../../selectors/subscribes";


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