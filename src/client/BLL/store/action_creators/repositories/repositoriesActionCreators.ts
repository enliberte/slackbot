import {
    IFilterStashRepositoriesAction,
    IRunAddStashRepositoryToFavoritesSagaAction,
    IRunDeleteFavoriteRepositorySagaAction,
    IRunGetFavoriteRepositoriesSagaAction,
    IRunGetStashRepositoriesSagaAction,
    ISearchFavoriteRepositoriesAction,
    ISetFavoriteRepositoriesDataAction,
    ISetStashRepositoriesDataAction
} from "./IRepositoriesActions";
import {IDeleteRepositoryFilters, IRepositoriesFilters} from "./IRepositoriesFilters";
import {IRepository, IStashRepositoryWithFavoriteSign} from "../../../../../backend/db/models/RepositoryModel";
import repositoriesActions from "./repositoriesActions";


export const setFavoriteRepositoriesData = (repositoriesData: IRepository[]): ISetFavoriteRepositoriesDataAction =>
    ({type: repositoriesActions.SET_FAVORITE_REPOSITORIES, payload: repositoriesData});

export const setStashRepositoriesData = (repositoriesData: IStashRepositoryWithFavoriteSign[]): ISetStashRepositoriesDataAction =>
    ({type: repositoriesActions.SET_STASH_REPOSITORIES, payload: repositoriesData});

export const searchFavoriteRepositories = (search: string): ISearchFavoriteRepositoriesAction =>
    ({type: repositoriesActions.SEARCH_FAVORITE_REPOSITORIES, payload: search});

export const filterStashRepositories = (filter: string): IFilterStashRepositoriesAction =>
    ({type: repositoriesActions.FILTER_STASH_REPOSITORIES, payload: filter});

export const runGetFavoriteRepositoriesSaga = (): IRunGetFavoriteRepositoriesSagaAction =>
    ({type: repositoriesActions.GET_FAVORITE_REPOSITORIES_SAGA});

export const runGetStashRepositoriesSaga = (): IRunGetStashRepositoriesSagaAction =>
    ({type: repositoriesActions.GET_STASH_REPOSITORIES_SAGA});

export const runDeleteFavoriteRepositorySaga = (filters: IDeleteRepositoryFilters): IRunDeleteFavoriteRepositorySagaAction =>
    ({type: repositoriesActions.DELETE_FAVORITE_REPOSITORY_SAGA, payload: filters});

export const runAddStashRepositoryToFavoritesSaga = (repositoryURL: string): IRunAddStashRepositoryToFavoritesSagaAction =>
    ({type: repositoriesActions.ADD_STASH_REPOSITORY_TO_FAVORITES_SAGA, payload: repositoryURL});