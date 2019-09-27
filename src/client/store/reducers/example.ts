import {actions} from "../constants";


export default (state={}, action: any) => {
    switch (action.type) {
        case actions.EXAMPLE:
            return {
                ...state,
            };
        default:
            return state;
    }
}