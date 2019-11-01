import {
    IRunDeleteSubscribeSagaAction,
    IRunEditSubscribeSagaAction,
    IRunGetSubscribesSagaAction,
    IRunSaveSubscribeSagaAction,
    ISetIsNewAction,
    ISetIsSubscribesFetchingAction,
    ISetIsSuccessAction,
    ISetSubscribeAction, ISetSubscribeErrorAction,
    ISetSubscribeFilters,
    ISetSubscribesDataAction,
    IToggleEditingDeveloperWindow,
    IToggleEditingRepositoryWindow,
    IToggleEditingWindow
} from "./ISubscribesActions";
import subscribesActions from "./subscribesActions";
import {INewSubscribe, ISubscribe} from "../../../../../backend/db/models/subscribe/SubscribeModel";
import {ISubscribeFilters} from "./ISubscribeFilters";
import {ISubscribeData, ISubscribeError} from "../../reducers/subscribes/newSubscribe";


export const setSubscribesData = (subscribesData: ISubscribe[]): ISetSubscribesDataAction =>
    ({type: subscribesActions.SET_SUBSCRIBES, payload: subscribesData});

export const setSubscribe = (subscribe: Partial<ISubscribe>): ISetSubscribeAction =>
    ({type: subscribesActions.SET_SUBSCRIBE, payload: subscribe});

export const setIsSuccess = (isSuccess: boolean): ISetIsSuccessAction =>
    ({type: subscribesActions.SET_IS_SUCCESS, payload: isSuccess});

export const setSubscribeError = (subscribeError: ISubscribeError): ISetSubscribeErrorAction =>
    ({type: subscribesActions.SET_SUBSCRIBE_ERROR, payload: subscribeError});

export const setIsNew = (isNew: boolean): ISetIsNewAction =>
    ({type: subscribesActions.SET_IS_NEW, payload: isNew});

export const setSubscribeFilters = (filters: ISubscribeFilters): ISetSubscribeFilters =>
    ({type: subscribesActions.SET_SUBSCRIBE_FILTERS, payload: filters});

export const toggleEditingWindow = (): IToggleEditingWindow =>
    ({type: subscribesActions.TOGGLE_EDITING_WINDOW});

export const toggleEditingRepositoryWindow = (): IToggleEditingRepositoryWindow =>
    ({type: subscribesActions.TOGGLE_EDITING_REPOSITORY_WINDOW});

export const toggleEditingDeveloperWindow = (): IToggleEditingDeveloperWindow =>
    ({type: subscribesActions.TOGGLE_EDITING_DEVELOPER_WINDOW});

export const runGetSubscribesSaga = (): IRunGetSubscribesSagaAction =>
    ({type: subscribesActions.GET_SUBSCRIBES_SAGA});

export const runSaveSubscribeSaga = (newSubscribeData: INewSubscribe, resolve: () => Promise<any>, reject: () => Promise<any>): IRunSaveSubscribeSagaAction =>
    ({type: subscribesActions.SAVE_SUBSCRIBE_SAGA, payload: newSubscribeData, resolve, reject});

export const runEditSubscribeSaga = (subscribeData: ISubscribeData, resolve: () => Promise<any>, reject: () => Promise<any>): IRunEditSubscribeSagaAction =>
    ({type: subscribesActions.EDIT_SUBSCRIBE_SAGA, payload: subscribeData, resolve, reject});

export const runDeleteSubscribeSaga = (subscribe: Partial<ISubscribe>): IRunDeleteSubscribeSagaAction =>
    ({type: subscribesActions.DELETE_SUBSCRIBE_SAGA, payload: subscribe});

export const setIsSubscribesFetching = (isFetching: boolean): ISetIsSubscribesFetchingAction =>
    ({type: subscribesActions.SET_IS_SUBSCRIBES_FETCHING, payload: isFetching});