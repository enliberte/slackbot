import {IRunGetSubscribesSagaAction, ISetSubscribesDataAction} from "./ISubscribesActions";
import subscribesActions from "./subscribesActions";
import {ISubscribe} from "../../../../../backend/db/models/SubscribeModel";

export const setSubscribesData = (subscribesData: ISubscribe[]): ISetSubscribesDataAction => ({type: subscribesActions.SET_SUBSCRIBES, payload: subscribesData});

export const runGetSubscribesSaga = (filters: Partial<ISubscribe>): IRunGetSubscribesSagaAction => ({type: subscribesActions.GET_SUBSCRIBES_SAGA, payload: filters});