import authActions from "../../action_creators/auth/authActions";
import IAuthState from "./IAuthState";


const initialState: IAuthState = {
    isAuth: false,
    isFetching: true,
    channelId: '',
    stashDisplayName: '',
    stashSlug: '',
    commentsNotifications: false,
    reviewNotifications: false,
    subscribesNotifications: true,
    isSessionWarningMsgDisplayed: false,
    sessionEndWarningMsg: '',
    exp: 0
};


export default (state: IAuthState = initialState, action: any) => {
    switch (action.type) {
        case authActions.SET_AUTH:
            return {
                ...state,
                ...action.payload
            };
        case authActions.SET_IS_AUTH_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            };
        case authActions.SET_STASH_USER:
            return {
                ...state,
                ...action.payload
            };
        case authActions.SET_SNACKBAR:
            return {
                ...state,
                isSessionWarningMsgDisplayed: action.payload.isSessionWarningMsgDisplayed,
                sessionEndWarningMsg: action.payload.sessionEndWarningMsg
            };
        case authActions.LOGOUT:
            return {
                ...state,
                isAuth: false
            };
        case authActions.SET_EXP:
            return {
                ...state,
                exp: action.payload
            };
        default:
            return state;
    }
}