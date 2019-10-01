import authActions from "../../action_creators/auth/authActions";
import IAuthState from "./IAuthState";


const initialState: IAuthState = {isAuth: false, username: '', channelId: ''};


export default (state: IAuthState = initialState, action: any) => {
    switch (action.type) {
        case authActions.SET_AUTH:
            return action.payload;
        default:
            return state;
    }
}