import {
    ISearchFavoriteDevelopersAction,
    IRunDeleteFavoriteDeveloperSagaAction,
    IRunGetFavoriteDevelopersSagaAction,
    ISetFavoriteDevelopersDataAction,
    IFilterStashDevelopersAction,
    ISetStashDevelopersDataAction,
    IRunGetStashDevelopersSagaAction, IRunAddStashDeveloperToFavoritesSagaAction
} from "./IDevelopersActions";
import developersActions from "./developersActions"
import {IFavoriteDeveloper} from "../../../../../backend/db/models/developer/favorite/FavoriteDeveloperModel";
import {IStashDeveloper} from "../../../../../backend/db/models/developer/stash/StashDeveloperModel";

export const setFavoriteDevelopersData = (developersData: IFavoriteDeveloper[]): ISetFavoriteDevelopersDataAction =>
    ({type: developersActions.SET_FAVORITE_DEVELOPERS, payload: developersData});

export const setStashDevelopersData = (developersData: IStashDeveloper[]): ISetStashDevelopersDataAction =>
    ({type: developersActions.SET_STASH_DEVELOPERS, payload: developersData});

export const searchFavoriteDevelopers = (search: string): ISearchFavoriteDevelopersAction =>
    ({type: developersActions.SEARCH_FAVORITE_DEVELOPERS, payload: search});

export const filterStashDevelopers = (filter: string): IFilterStashDevelopersAction =>
    ({type: developersActions.FILTER_STASH_DEVELOPERS, payload: filter});

export const runGetFavoriteDevelopersSaga = (): IRunGetFavoriteDevelopersSagaAction =>
    ({type: developersActions.GET_FAVORITE_DEVELOPERS_SAGA});

export const runGetStashDevelopersSaga = (): IRunGetStashDevelopersSagaAction =>
    ({type: developersActions.GET_STASH_DEVELOPERS_SAGA});

export const runDeleteFavoriteDeveloperSaga = (developer: Partial<IFavoriteDeveloper>): IRunDeleteFavoriteDeveloperSagaAction =>
    ({type: developersActions.DELETE_FAVORITE_DEVELOPER_SAGA, payload: developer});

export const runAddStashDeveloperToFavoritesSaga = (developerDisplayName: string): IRunAddStashDeveloperToFavoritesSagaAction =>
    ({type: developersActions.ADD_STASH_DEVELOPER_TO_FAVORITES_SAGA, payload: developerDisplayName});