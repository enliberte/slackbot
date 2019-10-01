import authActions from './authActions';
import IAuthState from "../../reducers/auth/IAuthState";


export interface ISetAuthDataAction {
    type: typeof authActions.SET_AUTH;
    payload: IAuthState
}

export interface IRunGetAuthSagaAction {
    type: typeof authActions.GET_AUTH_SAGA;
}