import repositoriesActions from "../../action_creators/repositories/repositoriesActions";
import {IFavoriteRepository} from "../../../../../backend/db/models/repository/favorite/FavoriteRepositoryModel";
import {IStashRepositoryWithFavoriteSign} from "../../../../../backend/db/models/repository/stash/StashRepositoryModel";


export interface IRepositoryState {
    favorites: {
        data: IFavoriteRepository[];
    }
    stash: {
        data: IStashRepositoryWithFavoriteSign[];
        isFavoriteOnly: boolean;
    }
    isFetching: boolean;
}

const initialState: IRepositoryState = {
    favorites: {
        data: [],
    },
    stash: {
        data: [],
        isFavoriteOnly: false
    },
    isFetching: false
};


export default (state: IRepositoryState = initialState, action: any) => {
    switch (action.type) {
        case repositoriesActions.SET_FAVORITE_REPOSITORIES:
            return {
                ...state,
                favorites: {
                    ...state.favorites,
                    data: action.payload
                }
            };
        case repositoriesActions.SET_STASH_REPOSITORIES:
            return {
                ...state,
                stash: {
                    ...state.stash,
                    data: action.payload
                }
            };
        case repositoriesActions.SEARCH_FAVORITE_REPOSITORIES:
            return {
                ...state,
                favorites: {
                    ...state.favorites,
                    search: action.payload
                }
            };
        case repositoriesActions.FILTER_STASH_REPOSITORIES:
            return {
                ...state,
                stash: {
                    ...state.stash,
                    name: action.payload
                }
            };
        case repositoriesActions.SET_IS_REPOSITORIES_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            };
        case repositoriesActions.SET_IS_FAVORITE_ONLY:
            return {
                ...state,
                stash: {...state.stash, isFavoriteOnly: action.payload}
            };
        default:
            return state;
    }
}