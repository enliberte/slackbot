import IState from "../IState";

export const selectUsername = (state: IState) => state.auth.username;

export const selectChannelId = (state: IState) => state.auth.channelId;

export const selectIsAuth = (state: IState) => state.auth.isAuth;