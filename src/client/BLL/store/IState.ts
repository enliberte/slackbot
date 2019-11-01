import IAuthState from "./reducers/auth/IAuthState";
import {IDeveloperState} from "./reducers/developers/developers";
import {ISubscribesState} from "./reducers/subscribes/subscribes";
import {ISubscribeState} from "./reducers/subscribes/newSubscribe";
import {IRepositoryState} from "./reducers/repositories/repositories";
import ISettingsState from "./reducers/settings/ISettingsState";

export default interface IState {
    auth: IAuthState;
    settings: ISettingsState;
    developers: IDeveloperState;
    repositories: IRepositoryState;
    subscribes: ISubscribesState;
    subscribe: ISubscribeState;
}