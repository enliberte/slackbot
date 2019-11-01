import repositoriesActions from "./repositoriesActions";
import {IFavoriteRepository} from "../../../../../backend/db/models/repository/favorite/FavoriteRepositoryModel";
import {IStashRepositoryWithFavoriteSign} from "../../../../../backend/db/models/repository/stash/StashRepositoryModel";


export interface ISetFavoriteRepositoriesDataAction {
    type: typeof repositoriesActions.SET_FAVORITE_REPOSITORIES;
    payload: IFavoriteRepository[];
}

export interface ISetStashRepositoriesDataAction {
    type: typeof repositoriesActions.SET_STASH_REPOSITORIES;
    payload: IStashRepositoryWithFavoriteSign[];
}

export interface ISearchFavoriteRepositoriesAction {
    type: typeof repositoriesActions.SEARCH_FAVORITE_REPOSITORIES;
    payload: string;
}

export interface IFilterStashRepositoriesAction {
    type: typeof repositoriesActions.FILTER_STASH_REPOSITORIES;
    payload: string;
}

export interface IRunGetFavoriteRepositoriesSagaAction {
    type: typeof repositoriesActions.GET_FAVORITE_REPOSITORIES_SAGA;
}

export interface IRunGetStashRepositoriesSagaAction {
    type: typeof repositoriesActions.GET_STASH_REPOSITORIES_SAGA;
}

export interface IRunDeleteFavoriteRepositorySagaAction {
    type: typeof repositoriesActions.DELETE_FAVORITE_REPOSITORY_SAGA;
    payload: Partial<IFavoriteRepository>;
}

export interface IRunAddStashRepositoryToFavoritesSagaAction {
    type: typeof repositoriesActions.ADD_STASH_REPOSITORY_TO_FAVORITES_SAGA;
    payload: {reponame: string, url: string};
}

export interface ISetIsRepositoriesFetchingAction {
    type: typeof repositoriesActions.SET_IS_REPOSITORIES_FETCHING;
    payload: boolean;
}

export interface ISetIsFavoriteRepositoriesOnlyAction {
    type: typeof repositoriesActions.SET_IS_FAVORITE_ONLY;
    payload: boolean;
}
