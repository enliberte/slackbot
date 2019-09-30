import {put, call} from 'redux-saga/effects';
import {IRunGetSubscribesSagaAction} from "../../action_creators/subscribes/ISubscribesActions";
import {setSubscribesData} from "../../action_creators/subscribes/subscribesActionCreators";
import {fetchGetSubscribes} from "../../../API/subscribesAPI";


export function *getSubscribes(action: IRunGetSubscribesSagaAction) {
    try {
        const response = yield call(fetchGetSubscribes, action.payload);
        yield put(setSubscribesData(response.data));
    } catch (err) {
        console.log(err);
    }
}