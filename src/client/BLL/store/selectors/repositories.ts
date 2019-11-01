import IState from "../IState";

export const selectFavoriteRepositories = (state: IState) => state.repositories.favorites.data;

export const selectStashRepositories = (state: IState) =>
    state.repositories.stash.isFavoriteOnly ?
        state.repositories.stash.data.filter(repository => repository.isFavorite) : state.repositories.stash.data;

export const selectIsFavoriteRepositoriesOnly = (state: IState) => state.repositories.stash.isFavoriteOnly;

export const selectIsRepositoriesFetching = (state: IState) => state.repositories.isFetching;

export const selectStashRepositoriesSuggests = (state: IState) => state.repositories.stash.data.map(repository => repository.name);

