import subscribesActions from "./subscribesActions";
import {ISubscribe} from "../../../../../backend/db/models/subscribe/SubscribeModel";
import {ISubscribeFilters} from "./ISubscribeFilters";
import {ISubscribeData} from "../../reducers/subscribes/newSubscribe";


export interface ISetSubscribesDataAction {
    type: typeof subscribesActions.SET_SUBSCRIBES;
    payload: ISubscribe[]
}

export interface ISetSubscribeAction {
    type: typeof subscribesActions.SET_SUBSCRIBE;
    payload: Partial<ISubscribe>
}

export interface ISetIsSuccessAction {
    type: typeof subscribesActions.SET_IS_SUCCESS;
    payload: boolean;
}

export interface ISetIsNewAction {
    type: typeof subscribesActions.SET_IS_NEW;
    payload: boolean;
}

export interface ISetSubscribeFilters {
    type: typeof subscribesActions.SET_SUBSCRIBE_FILTERS;
    payload: ISubscribeFilters;
}

export interface IToggleEditingWindow {
    type: typeof subscribesActions.TOGGLE_EDITING_WINDOW;
}

export interface IToggleEditingRepositoryWindow {
    type: typeof subscribesActions.TOGGLE_EDITING_REPOSITORY_WINDOW;
}

export interface IToggleEditingDeveloperWindow {
    type: typeof subscribesActions.TOGGLE_EDITING_DEVELOPER_WINDOW;
}

export interface IRunGetSubscribesSagaAction {
    type: typeof subscribesActions.GET_SUBSCRIBES_SAGA;
}

export interface IRunSaveSubscribeSagaAction {
    type: typeof subscribesActions.SAVE_SUBSCRIBE_SAGA;
}

export interface IRunEditSubscribeSagaAction {
    type: typeof subscribesActions.EDIT_SUBSCRIBE_SAGA;
}

export interface IRunDeleteSubscribeSagaAction {
    type: typeof subscribesActions.DELETE_SUBSCRIBE_SAGA;
    payload: Partial<ISubscribe>;
}

export interface IRunCreateSubscribeSagaAction {
    type: typeof subscribesActions.CREATE_SUBSCRIBE_SAGA;
}