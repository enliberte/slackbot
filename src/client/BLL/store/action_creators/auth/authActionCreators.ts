import IAuthState from "../../reducers/auth/IAuthState";
import {
    IRunGetAuthSagaAction,
    ISetAuthDataAction,
    ISetIsAuthFetchingAction,
    IRunAddStashUserSagaAction,
    ISetStashUserDataAction,
    ISetSessionEndWarningAction,
    ISetLogoutAction,
    IRunRefreshSagaAction, ISetExpAction
} from "./IAuthActions";
import authActions from "./authActions"
import {INewUser} from "../../../../../backend/db/models/user/UserModel";

export const setAuthData = (authData: IAuthState): ISetAuthDataAction =>
    ({type: authActions.SET_AUTH, payload: authData});

export const setLogout = (): ISetLogoutAction =>
    ({type: authActions.LOGOUT, payload: false});

export const setExp = (exp: number): ISetExpAction =>
    ({type: authActions.SET_EXP, payload: exp});

export const setSessionEndWarning = (warming: {sessionEndWarningMsg: string; isSessionWarningMsgDisplayed: boolean}): ISetSessionEndWarningAction =>
    ({type: authActions.SET_SNACKBAR, payload: warming});

export const runAddStashUserSaga = (user: INewUser): IRunAddStashUserSagaAction =>
    ({type: authActions.ADD_STASH_USER_SAGA, payload: user});

export const setStashUserData = (user: INewUser): ISetStashUserDataAction =>
    ({type: authActions.SET_STASH_USER, payload: user});

export const setIsAuthFetching = (isFetching: boolean): ISetIsAuthFetchingAction =>
    ({type: authActions.SET_IS_AUTH_FETCHING, payload: isFetching});

export const runGetAuthSaga = (): IRunGetAuthSagaAction => ({type: authActions.GET_AUTH_SAGA});

export const runRefreshSaga = (): IRunRefreshSagaAction => ({type: authActions.RUN_REFRESH_SAGA});