import IState from "../IState";

export const selectChannelId = (state: IState) => state.auth.channelId;

export const selectExp = (state: IState) => state.auth.exp;

export const selectIsAuth = (state: IState) => state.auth.isAuth;

export const selectSessionEndWarningMsg = (state: IState) => state.auth.sessionEndWarningMsg;

export const selectIsSessionWarningMsgDisplayed = (state: IState) => state.auth.isSessionWarningMsgDisplayed;

export const selectIsStashDeveloper = (state: IState) => state.auth.stashDisplayName !== '';

export const selectStashDisplayName = (state: IState) => state.auth.stashDisplayName;

export const selectIsCommentsNotifications = (state: IState) => state.auth.commentsNotifications;

export const selectIsSubscribesNotifications = (state: IState) => state.auth.subscribesNotifications;

export const selectIsReviewNotifications = (state: IState) => state.auth.reviewNotifications;

export const selectIsAuthFetching = (state: IState) => state.auth.isFetching;