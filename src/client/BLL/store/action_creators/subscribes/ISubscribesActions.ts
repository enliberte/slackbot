import subscribesActions from "./subscribesActions";
import {ISubscribe} from "../../../../../backend/db/models/SubscribeModel";
import {ISubscribeFilters} from "./ISubscribeFilters";


export interface ISetSubscribesDataAction {
    type: typeof subscribesActions.SET_SUBSCRIBES;
    payload: ISubscribe[]
}

export interface ISetSubscribeFilters {
    type: typeof subscribesActions.SET_SUBSCRIBE_FILTERS;
    payload: ISubscribeFilters;
}

export interface IToggleEditingWindow {
    type: typeof subscribesActions.TOGGLE_EDITING_WINDOW;
}

export interface IRunGetSubscribesSagaAction {
    type: typeof subscribesActions.GET_SUBSCRIBES_SAGA;
}

export interface IRunDeleteSubscribeSagaAction {
    type: typeof subscribesActions.DELETE_SUBSCRIBE_SAGA;
    payload: Partial<ISubscribe>;
}