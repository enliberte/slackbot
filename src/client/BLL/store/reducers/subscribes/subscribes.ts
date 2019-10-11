import {ISubscribe} from "../../../../../backend/db/models/subscribe/SubscribeModel";
import subscribesActions from "../../action_creators/subscribes/subscribesActions";
import {ISubscribeFilters} from "../../action_creators/subscribes/ISubscribeFilters";

export interface ISubscribesState {
    data: ISubscribe[];
    isEditing: boolean;
    filters: ISubscribeFilters;
}

const initialState: ISubscribesState = {
    data: [],
    isEditing: false,
    filters: {}
};


export default (state: ISubscribesState = initialState, action: any) => {
    switch (action.type) {
        case subscribesActions.SET_SUBSCRIBES:
            return {
                ...state,
                data: action.payload
            };
        case subscribesActions.SET_SUBSCRIBE_FILTERS:
            return {
                ...state,
                filters: {...action.payload}
            };
        case subscribesActions.TOGGLE_EDITING_WINDOW:
            return {
                ...state,
                isEditing: !state.isEditing
            };
        default:
            return state;
    }
}