import IAuthState from "../../reducers/auth/IAuthState";
import {IRunGetAuthSagaAction, ISetAuthDataAction} from "./IAuthActions";
import authActions from "./authActions"

export const setAuthData = (authData: IAuthState): ISetAuthDataAction => ({type: authActions.SET_AUTH, payload: authData});

export const runGetAuthSaga = (): IRunGetAuthSagaAction => ({type: authActions.GET_AUTH_SAGA});