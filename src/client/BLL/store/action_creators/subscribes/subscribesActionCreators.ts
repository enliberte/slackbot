import {
    IRunGetSubscribesSagaAction,
    ISetSubscribeFilters,
    ISetSubscribesDataAction,
    IToggleEditingWindow
} from "./ISubscribesActions";
import subscribesActions from "./subscribesActions";
import {ISubscribe} from "../../../../../backend/db/models/SubscribeModel";
import {IRunDeleteFavoriteDeveloperSagaAction} from "../developers/IDevelopersActions";
import {ISubscribeFilters} from "./ISubscribeFilters";

export const setSubscribesData = (subscribesData: ISubscribe[]): ISetSubscribesDataAction => ({type: subscribesActions.SET_SUBSCRIBES, payload: subscribesData});

export const setSubscribeFilters = (filters: ISubscribeFilters): ISetSubscribeFilters => ({type: subscribesActions.SET_SUBSCRIBE_FILTERS, payload: filters});

export const toggleEditingWindow = (): IToggleEditingWindow => ({type: subscribesActions.TOGGLE_EDITING_WINDOW});

export const runGetSubscribesSaga = (): IRunGetSubscribesSagaAction => ({type: subscribesActions.GET_SUBSCRIBES_SAGA});

// export const runDeleteSubscribeSaga = (filters: Partial<ISubscribe>): IRunDeleteDeveloperSagaAction => ({type: subscribesActions.DELETE_SUBSCRIBE_SAGA, payload: filters})