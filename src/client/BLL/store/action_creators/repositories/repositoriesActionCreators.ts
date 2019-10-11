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
import repositoriesActions from "./repositoriesActions";
import {IFavoriteRepository} from "../../../../../backend/db/models/repository/favorite/FavoriteRepositoryModel";
import {IStashRepositoryWithFavoriteSign} from "../../../../../backend/db/models/repository/stash/StashRepositoryModel";


export const setFavoriteRepositoriesData = (repositoriesData: IFavoriteRepository[]): ISetFavoriteRepositoriesDataAction =>
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

export const runDeleteFavoriteRepositorySaga = (repository: Partial<IFavoriteRepository>): IRunDeleteFavoriteRepositorySagaAction =>
    ({type: repositoriesActions.DELETE_FAVORITE_REPOSITORY_SAGA, payload: repository});

export const runAddStashRepositoryToFavoritesSaga = (repositoryURL: string): IRunAddStashRepositoryToFavoritesSagaAction =>
    ({type: repositoriesActions.ADD_STASH_REPOSITORY_TO_FAVORITES_SAGA, payload: repositoryURL});