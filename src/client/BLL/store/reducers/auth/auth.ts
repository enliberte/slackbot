import actions from "../actions";
import IAuthState from "./IAuthState";


const initialState: IAuthState = {username: '', channelId: ''};


export default (state: IAuthState = initialState, action: any) => {
    switch (action.type) {
        case actions.SET_AUTH:
            return action.payload;
        default:
            return state;
    }
}