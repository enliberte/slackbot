import IState from "../IState";

export const selectSubscribes = (state: IState) => state.subscribes.data;

export const selectSubscribeFilters = (state: IState) => state.subscribes.filters;

export const selectIsSubscribeEditing = (state: IState) => state.subscribes.isEditing;

export const selectIsRepositoryEditing = (state: IState) => state.subscribe.isRepositoryPanelDisplayed;

export const selectIsDeveloperEditing = (state: IState) => state.subscribe.isDeveloperPanelDisplayed;

export const selectIsDeveloperValid = (state: IState) => state.subscribe.error.developer === '';

export const selectIsRepositoryValid = (state: IState) => state.subscribe.error.repository === '';

export const selectDeveloperErrorText = (state: IState) => state.subscribe.error.developer;

export const selectRepositoryErrorText = (state: IState) => state.subscribe.error.repository;

export const selectIsSubscribesFetching = (state: IState) => state.subscribes.isFetching;