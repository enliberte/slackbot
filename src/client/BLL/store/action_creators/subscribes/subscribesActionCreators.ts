import {
    IRunCreateSubscribeSagaAction, IRunDeleteSubscribeSagaAction, IRunEditSubscribeSagaAction,
    IRunGetSubscribesSagaAction, IRunSaveSubscribeSagaAction, ISetIsNewAction, ISetIsSuccessAction, ISetSubscribeAction,
    ISetSubscribeFilters,
    ISetSubscribesDataAction, IToggleEditingDeveloperWindow, IToggleEditingRepositoryWindow,
    IToggleEditingWindow
} from "./ISubscribesActions";
import subscribesActions from "./subscribesActions";
import {ISubscribe} from "../../../../../backend/db/models/subscribe/SubscribeModel";
import {ISubscribeFilters} from "./ISubscribeFilters";
import {ISubscribeData} from "../../reducers/subscribes/newSubscribe";

export const setSubscribesData = (subscribesData: ISubscribe[]): ISetSubscribesDataAction => ({type: subscribesActions.SET_SUBSCRIBES, payload: subscribesData});

export const setSubscribe = (subscribe: Partial<ISubscribe>): ISetSubscribeAction => ({type: subscribesActions.SET_SUBSCRIBE, payload: subscribe});

export const setIsSuccess = (isSuccess: boolean): ISetIsSuccessAction => ({type: subscribesActions.SET_IS_SUCCESS, payload: isSuccess});

export const setIsNew = (isNew: boolean): ISetIsNewAction => ({type: subscribesActions.SET_IS_NEW, payload: isNew});

export const setSubscribeFilters = (filters: ISubscribeFilters): ISetSubscribeFilters => ({type: subscribesActions.SET_SUBSCRIBE_FILTERS, payload: filters});

export const toggleEditingWindow = (): IToggleEditingWindow => ({type: subscribesActions.TOGGLE_EDITING_WINDOW});

export const toggleEditingRepositoryWindow = (): IToggleEditingRepositoryWindow => ({type: subscribesActions.TOGGLE_EDITING_REPOSITORY_WINDOW});

export const toggleEditingDeveloperWindow = (): IToggleEditingDeveloperWindow => ({type: subscribesActions.TOGGLE_EDITING_DEVELOPER_WINDOW});

export const runGetSubscribesSaga = (): IRunGetSubscribesSagaAction => ({type: subscribesActions.GET_SUBSCRIBES_SAGA});

export const runSaveSubscribeSaga = (): IRunSaveSubscribeSagaAction => ({type: subscribesActions.SAVE_SUBSCRIBE_SAGA});

export const runEditSubscribeSaga = (): IRunEditSubscribeSagaAction => ({type: subscribesActions.EDIT_SUBSCRIBE_SAGA});

export const runDeleteSubscribeSaga = (subscribe: Partial<ISubscribe>): IRunDeleteSubscribeSagaAction => ({type: subscribesActions.DELETE_SUBSCRIBE_SAGA, payload: subscribe});