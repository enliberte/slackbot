import {put, call} from 'redux-saga/effects';
import {IRunGetDevelopersSagaAction} from "../../action_creators/developers/IDevelopersActions";
import {fetchGetDevelopers} from "../../../API/developersAPI";
import {setDevelopersData} from "../../action_creators/developers/developersActionCreators";


export function *getDevelopers(action: IRunGetDevelopersSagaAction) {
    try {
        const response = yield call(fetchGetDevelopers, action.payload);
        yield put(setDevelopersData(response.data));
    } catch (err) {
        console.log(err);
    }
}