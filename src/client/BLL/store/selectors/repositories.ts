import IState from "../IState";

export const selectFavoriteRepositories = (state: IState) => state.repositories.favorites.data;

export const selectSearchFavoriteRepositoriesTerm = (state: IState) => state.repositories.favorites.search;

export const selectLimitFavoriteRepositories = (state: IState) => state.repositories.favorites.limit;

export const selectStashRepositories = (state: IState) => state.repositories.stash.data;

export const selectFilterStashRepositoriesTerm = (state: IState) => state.repositories.stash.name;

export const selectLimitStashRepositories = (state: IState) => state.repositories.stash.limit;