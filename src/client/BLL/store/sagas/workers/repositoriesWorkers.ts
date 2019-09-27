import {put, call} from 'redux-saga/effects';
import {IRunGetRepositoriesSagaAction} from "../../action_creators/repositories/IRepositoriesActions";
import {fetchGetRepositories} from "../../../API/repositoriesAPI";
import {setRepositoriesData} from "../../action_creators/repositories/repositoriesActionCreators";


export function *getRepositories(action: IRunGetRepositoriesSagaAction) {
    try {
        const response = yield call(fetchGetRepositories, action.payload);
        yield put(setRepositoriesData(response.data));
    } catch (err) {
        console.log(err);
    }
}