import authActions from './authActions';
import IAuthState from "../../reducers/auth/IAuthState";
import {INewUser} from "../../../../../backend/db/models/user/UserModel";


export interface ISetAuthDataAction {
    type: typeof authActions.SET_AUTH;
    payload: IAuthState
}

export interface ISetLogoutAction {
    type: typeof authActions.LOGOUT;
    payload: boolean;
}

export interface ISetExpAction {
    type: typeof authActions.SET_EXP;
    payload: number;
}

export interface IRunRefreshSagaAction {
    type: typeof authActions.RUN_REFRESH_SAGA;
}

export interface ISetStashUserDataAction {
    type: typeof authActions.SET_STASH_USER;
    payload: INewUser
}

export interface IRunAddStashUserSagaAction {
    type: typeof authActions.ADD_STASH_USER_SAGA;
    payload: INewUser;
}

export interface IRunGetAuthSagaAction {
    type: typeof authActions.GET_AUTH_SAGA;
}

export interface ISetIsAuthFetchingAction {
    type: typeof authActions.SET_IS_AUTH_FETCHING;
    payload: boolean;
}

export interface ISetSessionEndWarningAction {
    type: typeof authActions.SET_SNACKBAR;
    payload: {
        sessionEndWarningMsg: string;
        isSessionWarningMsgDisplayed: boolean;
    }
}