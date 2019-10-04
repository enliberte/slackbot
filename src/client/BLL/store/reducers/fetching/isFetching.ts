import fetchingActions from "../../action_creators/fetching/fetchingActions";


const initialState: boolean = false;


export default (state: boolean = initialState, action: any) => {
    switch (action.type) {
        case fetchingActions.SET_IS_FETCHING:
            return action.payload;
        default:
            return state;
    }
}