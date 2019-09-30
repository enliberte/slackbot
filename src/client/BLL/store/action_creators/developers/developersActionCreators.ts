import {
    IRunDeleteDeveloperSagaAction,
    IRunGetDevelopersSagaAction,
    ISetDevelopersDataAction
} from "./IDevelopersActions";
import authActions from "./developersActions"
import {IDeveloper} from "../../../../../backend/db/models/DeveloperModel";
import {IDeleteDeveloperFilters} from "./IDevelopersFilters";

export const setDevelopersData = (developersData: IDeveloper[]): ISetDevelopersDataAction => ({type: authActions.SET_DEVELOPERS, payload: developersData});

export const runGetDevelopersSaga = (): IRunGetDevelopersSagaAction => ({type: authActions.GET_DEVELOPERS_SAGA});

export const runDeleteDeveloperSaga = (filters: IDeleteDeveloperFilters): IRunDeleteDeveloperSagaAction => ({type: authActions.DELETE_DEVELOPER_SAGA, payload: filters});