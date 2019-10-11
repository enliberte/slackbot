import IAuthState from "./reducers/auth/IAuthState";
import {IDeveloperState} from "./reducers/developers/developers";
import {ISubscribesState} from "./reducers/subscribes/subscribes";
import {ISubscribeState} from "./reducers/subscribes/newSubscribe";
import {IRepositoryState} from "./reducers/repositories/repositories";

export default interface IState {
    auth: IAuthState;
    developers: IDeveloperState;
    repositories: IRepositoryState;
    subscribes: ISubscribesState;
    isFetching: boolean;
    subscribe: ISubscribeState;
}