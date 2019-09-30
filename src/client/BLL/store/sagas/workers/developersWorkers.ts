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

// export function *deleteDeveloper(action: IRunDeleteDeveloperSagaAction) {
//     try {
//         yield call(fetchDeleteDeveloper, action.payload);
//         const getDevelopersResponse = yield call(fetchGetDevelopers, action.payload);
//         const getSubscribesResponse = yield call(fetchGetSubscribes, )
//         yield put(setDevelopersData(getDevelopersResponse.data));
//     } catch (err) {
//         console.log(err);
//     }
// }