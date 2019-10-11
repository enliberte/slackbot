import IState from "../IState";

export const selectSubscribes = (state: IState) => state.subscribes.data;

export const selectSubscribe = (state: IState) => state.subscribe.data;

export const selectSubscribeFilters = (state: IState) => state.subscribes.filters;

export const selectIsSubscribeEditing = (state: IState) => state.subscribes.isEditing;

export const selectIsNewSubscribe = (state: IState) => state.subscribe.isNew;

export const selectIsRepositoryEditing = (state: IState) => state.subscribe.isRepositoryPanelDisplayed;

export const selectIsDeveloperEditing = (state: IState) => state.subscribe.isDeveloperPanelDisplayed;