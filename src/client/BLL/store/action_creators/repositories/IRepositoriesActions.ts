import {IRepositoriesFilters} from "./IRepositoriesFilters";
import repositoriesActions from "./repositoriesActions";
import {IRepository} from "../../../../../backend/db/models/RepositoryModel";


export interface ISetRepositoriesDataAction {
    type: typeof repositoriesActions.SET_REPOSITORIES;
    payload: IRepository[]
}

export interface IRunGetRepositoriesSagaAction {
    type: typeof repositoriesActions.GET_REPOSITORIES_SAGA;
    payload: IRepositoriesFilters;
}