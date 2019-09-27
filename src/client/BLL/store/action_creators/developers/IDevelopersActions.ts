import developersActions from './developersActions';
import {IDevelopersFilters} from "./IDevelopersFilters";
import {IDeveloper} from "../../../../../backend/db/models/DeveloperModel";


export interface ISetDevelopersDataAction {
    type: typeof developersActions.SET_DEVELOPERS;
    payload: IDeveloper[]
}

export interface IRunGetDevelopersSagaAction {
    type: typeof developersActions.GET_DEVELOPERS_SAGA;
    payload: IDevelopersFilters;
}