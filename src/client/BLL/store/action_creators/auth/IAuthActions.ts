import actions from '../../reducers/actions';
import IAuthState from "../../reducers/auth/IAuthState";


export interface ISetAuthDataAction {
    type: typeof actions.SET_AUTH;
    payload: IAuthState
}

export interface IRunGetAuthSagaAction {
    type: typeof actions.GET_AUTH_SAGA;
}