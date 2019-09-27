import IState from "../IState";

export const getUsername = (state: IState) => state.auth.username;

export const getChannelId = (state: IState) => state.auth.channelId;