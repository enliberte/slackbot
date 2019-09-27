import {IDeveloper} from "../../../../../backend/db/models/DeveloperModel";
import developersActions from "../../action_creators/developers/developersActions";


const initialState: IDeveloper[] = [];


export default (state: IDeveloper[] = initialState, action: any) => {
    switch (action.type) {
        case developersActions.SET_DEVELOPERS:
            return action.payload;
        default:
            return state;
    }
}