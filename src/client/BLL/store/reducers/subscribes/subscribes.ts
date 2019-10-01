import {ISubscribe} from "../../../../../backend/db/models/SubscribeModel";
import subscribesActions from "../../action_creators/subscribes/subscribesActions";

const initialState: ISubscribe[] = [];


export default (state: ISubscribe[] = initialState, action: any) => {
    switch (action.type) {
        case subscribesActions.SET_SUBSCRIBES:
            return action.payload;
        default:
            return state;
    }
}