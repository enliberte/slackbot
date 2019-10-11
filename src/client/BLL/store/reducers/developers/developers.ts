import developersActions from "../../action_creators/developers/developersActions";
import {IStashDeveloperWithFavoriteSign} from "../../../../../backend/db/models/developer/stash/StashDeveloperModel";
import {IFavoriteDeveloper} from "../../../../../backend/db/models/developer/favorite/FavoriteDeveloperModel";


export interface IDeveloperState {
    favorites: {
        data: IFavoriteDeveloper[];
        search: string;
        limit: number;
    }
    stash: {
        data: IStashDeveloperWithFavoriteSign[];
        filter: string;
        limit: number;
    }
}


const initialState: IDeveloperState = {
    favorites: {
        data: [],
        search: '',
        limit: 20
    },
    stash: {
        data: [],
        filter: '',
        limit: 20
    }
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
        default:
            return state;
    }
}