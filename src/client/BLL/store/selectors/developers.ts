import IState from "../IState";

export const selectFavoriteDevelopers = (state: IState) => state.developers.favorites.data;

export const selectSearchFavoriteDevelopersTerm = (state: IState) => state.developers.favorites.search;

export const selectLimitFavoriteDevelopers = (state: IState) => state.developers.favorites.limit;

export const selectStashDevelopers = (state: IState) => state.developers.stash.data;

export const selectFilterStashDevelopersTerm = (state: IState) => state.developers.stash.filter;

export const selectLimitStashDevelopers = (state: IState) => state.developers.stash.limit;