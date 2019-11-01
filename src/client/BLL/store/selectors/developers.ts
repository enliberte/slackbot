import IState from "../IState";

export const selectFavoriteDevelopers = (state: IState) => state.developers.favorites.data;

export const selectStashDevelopers = (state: IState) =>
    state.developers.stash.isFavoriteOnly ?
        state.developers.stash.data.filter(developer => developer.isFavorite) : state.developers.stash.data;

export const selectIsFavoriteDevelopersOnly = (state: IState) => state.developers.stash.isFavoriteOnly;

export const selectIsDevelopersFetching = (state: IState) => state.developers.isFetching;

export const selectStashDevelopersSuggests = (state: IState) =>
    state.developers.stash.data.map(developer => developer.displayName);