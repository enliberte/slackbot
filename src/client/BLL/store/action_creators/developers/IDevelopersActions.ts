import developersActions from './developersActions';
import {IDeveloper} from "../../../../../backend/db/models/DeveloperModel";
import {IDevelopersFilters} from "./IDevelopersFilters";


export interface ISetDevelopersDataAction {
    type: typeof developersActions.SET_DEVELOPERS;
    payload: IDeveloper[]
}

export interface IRunGetDevelopersSagaAction {
    type: typeof developersActions.GET_DEVELOPERS_SAGA;
}

export interface IRunDeleteDeveloperSagaAction {
    type: typeof developersActions.DELETE_DEVELOPER_SAGA;
    payload: {username: string};
}