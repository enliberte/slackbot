import developersActions from "../../action_creators/developers/developersActions";
import {IStashDeveloperWithFavoriteSign} from "../../../../../backend/db/models/developer/stash/StashDeveloperModel";
import {IFavoriteDeveloper} from "../../../../../backend/db/models/developer/favorite/FavoriteDeveloperModel";


export interface IDeveloperState {
    favorites: {
        data: IFavoriteDeveloper[];
    }
    stash: {
        data: IStashDeveloperWithFavoriteSign[];
        isFavoriteOnly: boolean;
    }
    isFetching: boolean;
}


const initialState: IDeveloperState = {
    favorites: {
        data: [],
    },
    stash: {
        data: [],
        isFavoriteOnly: false
    },
    isFetching: false
};


export default (state: IDeveloperState = initialState, action: any) => {
    switch (action.type) {
        case developersActions.SET_FAVORITE_DEVELOPERS:
            return {
                ...state,
                favorites: {
                    ...state.favorites,
                    data: action.payload
                }
            };
        case developersActions.SET_STASH_DEVELOPERS:
            return {
                ...state,
                stash: {
                    ...state.stash,
                    data: action.payload
                }
            };
        case developersActions.SEARCH_FAVORITE_DEVELOPERS:
            return {
                ...state,
                favorites: {
                    ...state.favorites,
                    search: action.payload
                }
            };
        case developersActions.FILTER_STASH_DEVELOPERS:
            return {
                ...state,
                stash: {
                    ...state.stash,
                    filter: action.payload
                }
            };
        case developersActions.SET_IS_DEVELOPERS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            };
        case developersActions.SET_IS_FAVORITE_ONLY:
            return {
                ...state,
                stash: {...state.stash, isFavoriteOnly: action.payload}
            };
        default:
            return state;
    }
}