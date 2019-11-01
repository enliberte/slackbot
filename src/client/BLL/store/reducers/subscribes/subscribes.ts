import {ISubscribe} from "../../../../../backend/db/models/subscribe/SubscribeModel";
import subscribesActions from "../../action_creators/subscribes/subscribesActions";
import {ISubscribeFilters} from "../../action_creators/subscribes/ISubscribeFilters";

export interface ISubscribesState {
    data: ISubscribe[];
    selected: ISubscribe[];
    isEditing: boolean;
    filters: ISubscribeFilters;
    isFetching: boolean;
}

const initialState: ISubscribesState = {
    data: [],
    selected: [],
    isEditing: false,
    filters: {},
    isFetching: false
};


export default (state: ISubscribesState = initialState, action: any) => {
    switch (action.type) {
        case subscribesActions.SET_SUBSCRIBES:
            return {
                ...state,
                data: action.payload
            };
        case subscribesActions.ADD_SELECTED:
            return {
                ...state,
                selected: [...state.selected, action.payload]
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
        case subscribesActions.SET_IS_SUBSCRIBES_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            };
        default:
            return state;
    }
}