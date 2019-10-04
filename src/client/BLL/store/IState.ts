import IAuthState from "./reducers/auth/IAuthState";
import {IDeveloperState} from "./reducers/developers/developers";
import {ISubscribeState} from "./reducers/subscribes/subscribes";
import {IRepositoryState} from "./reducers/repositories/repositories";

export default interface IState {
    auth: IAuthState;
    developers: IDeveloperState;
    repositories: IRepositoryState;
    subscribes: ISubscribeState;
    isFetching: boolean;
}