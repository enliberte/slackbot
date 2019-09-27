import IAuthState from "../../reducers/auth/IAuthState";
import {IRunGetAuthSagaAction, ISetAuthDataAction} from "./IAuthActions";
import actions from "../../reducers/actions"

export const setAuthData = (authData: IAuthState): ISetAuthDataAction => ({type: actions.SET_AUTH, payload: authData});

export const runGetAuthSaga = (): IRunGetAuthSagaAction => ({type: actions.GET_AUTH_SAGA});