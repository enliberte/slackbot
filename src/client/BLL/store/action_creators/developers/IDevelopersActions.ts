import developersActions from './developersActions';
import {IDeveloper, IStashDeveloper} from "../../../../../backend/db/models/DeveloperModel";


export interface ISetFavoriteDevelopersDataAction {
    type: typeof developersActions.SET_FAVORITE_DEVELOPERS;
    payload: IDeveloper[];
}

export interface ISetStashDevelopersDataAction {
    type: typeof developersActions.SET_STASH_DEVELOPERS;
    payload: IStashDeveloper[];
}

export interface ISearchFavoriteDevelopersAction {
    type: typeof developersActions.SEARCH_FAVORITE_DEVELOPERS;
    payload: string;
}

export interface IFilterStashDevelopersAction {
    type: typeof developersActions.FILTER_STASH_DEVELOPERS;
    payload: string;
}

export interface IRunGetFavoriteDevelopersSagaAction {
    type: typeof developersActions.GET_FAVORITE_DEVELOPERS_SAGA;
}

export interface IRunGetStashDevelopersSagaAction {
    type: typeof developersActions.GET_STASH_DEVELOPERS_SAGA;
}

export interface IRunDeleteFavoriteDeveloperSagaAction {
    type: typeof developersActions.DELETE_FAVORITE_DEVELOPER_SAGA;
    payload: {username: string};
}

export interface IRunAddStashDeveloperToFavoritesSagaAction {
    type: typeof developersActions.ADD_STASH_DEVELOPER_TO_FAVORITES_SAGA;
    payload: string;
}