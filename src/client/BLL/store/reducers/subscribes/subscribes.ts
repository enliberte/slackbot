import {ISubscribe} from "../../../../../backend/db/models/SubscribeModel";
import subscribesActions from "../../action_creators/subscribes/subscribesActions";
import {ISubscribeFilters} from "../../action_creators/subscribes/ISubscribeFilters";

export interface ISubscribeState {
    data: ISubscribe[];
    isEditing: boolean;
    filters: ISubscribeFilters;
}

const initialState: ISubscribeState = {
    data: [],
    isEditing: false,
    filters: {followed: null}
};


export default (state: ISubscribeState = initialState, action: any) => {
    switch (action.type) {
        case subscribesActions.SET_SUBSCRIBES:
            return {
                ...state,
                data: action.payload
            };
        case subscribesActions.SET_SUBSCRIBE_FILTERS:
            return {
                ...state,
                filters: {...state.filters, ...action.payload}
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