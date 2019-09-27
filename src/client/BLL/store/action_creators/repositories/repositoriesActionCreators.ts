import {IRunGetRepositoriesSagaAction, ISetRepositoriesDataAction} from "./IRepositoriesActions";
import {IRepositoriesFilters} from "./IRepositoriesFilters";
import {IRepository} from "../../../../../backend/db/models/RepositoryModel";
import repositoriesActions from "./repositoriesActions";

export const setRepositoriesData = (repositoriesData: IRepository[]): ISetRepositoriesDataAction => ({type: repositoriesActions.SET_REPOSITORIES, payload: repositoriesData});

export const runGetRepositoriesSaga = (filters: IRepositoriesFilters): IRunGetRepositoriesSagaAction => ({type: repositoriesActions.GET_REPOSITORIES_SAGA, payload: filters});