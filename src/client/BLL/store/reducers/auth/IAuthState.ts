export default interface IAuthState {
    isAuth: boolean;
    isFetching: boolean;
    channelId: string;
    stashDisplayName: string;
    stashSlug: string;
    commentsNotifications: boolean;
    reviewNotifications: boolean;
    subscribesNotifications: boolean;
    sessionEndWarningMsg: string;
    isSessionWarningMsgDisplayed: boolean;
    exp: number;
}