import {IRunGetDevelopersSagaAction, ISetDevelopersDataAction} from "./IDevelopersActions";
import authActions from "./developersActions"
import {IDeveloper} from "../../../../../backend/db/models/DeveloperModel";
import {IDevelopersFilters} from "./IDevelopersFilters";

export const setDevelopersData = (developersData: IDeveloper[]): ISetDevelopersDataAction => ({type: authActions.SET_DEVELOPERS, payload: developersData});

export const runGetDevelopersSaga = (getDevelopersFilters: IDevelopersFilters): IRunGetDevelopersSagaAction => ({type: authActions.GET_DEVELOPERS_SAGA, payload: getDevelopersFilters});