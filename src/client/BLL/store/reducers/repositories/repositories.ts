import {IRepository, IStashRepositoryWithFavoriteSign} from "../../../../../backend/db/models/RepositoryModel";
import repositoriesActions from "../../action_creators/repositories/repositoriesActions";

export interface IRepositoryState {
    favorites: {
        data: IRepository[];
        search: string;
        limit: number;
    }
    stash: {
        data: IStashRepositoryWithFavoriteSign[];
        name: string;
        limit: number;
    }
}

const initialState: IRepositoryState = {
    favorites: {
        data: [],
        search: '',
        limit: 20
    },
    stash: {
        data: [],
        name: '',
        limit: 20
    }
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
                    filter: action.payload
                }
            };
        default:
            return state;
    }
}