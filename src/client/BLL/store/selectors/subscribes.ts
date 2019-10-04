import IState from "../IState";

export const selectSubscribes = (state: IState) => state.subscribes.data;

export const selectSubscribeFilters = (state: IState) => state.subscribes.filters;

export const selectFollowed = (state: IState) => state.subscribes.filters.followed;

export const selectIsSubscribeEditing = (state: IState) => state.subscribes.isEditing;