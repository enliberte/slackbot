import {put, call} from 'redux-saga/effects';
import {fetchGetAuth} from "../../../API/authAPI";
import {setAuthData} from "../../action_creators/auth/authActionCreators";
import {ISetAuthDataAction} from "../../action_creators/auth/IAuthActions";


export function *getAuth(action: ISetAuthDataAction) {
    try {
        const response = yield call(fetchGetAuth);
        console.log('--------------------------------------------------');
        console.log(JSON.stringify(response));
        console.log('--------------------------------------------------');
        yield put(setAuthData(response.data));
    } catch (err) {
        console.log(err);
    }
}