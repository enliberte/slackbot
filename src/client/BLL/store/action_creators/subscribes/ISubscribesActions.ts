import subscribesActions from "./subscribesActions";
import {ISubscribe} from "../../../../../backend/db/models/SubscribeModel";


export interface ISetSubscribesDataAction {
    type: typeof subscribesActions.SET_SUBSCRIBES;
    payload: ISubscribe[]
}

export interface IRunGetSubscribesSagaAction {
    type: typeof subscribesActions.GET_SUBSCRIBES_SAGA;
    payload: Partial<ISubscribe>;
}