import {IRepository} from "../../../../../backend/db/models/RepositoryModel";
import repositoriesActions from "../../action_creators/repositories/repositoriesActions";

const initialState: IRepository[] = [];


export default (state: IRepository[] = initialState, action: any) => {
    switch (action.type) {
        case repositoriesActions.SET_REPOSITORIES:
            return action.payload;
        default:
            return state;
    }
}