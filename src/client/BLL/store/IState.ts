import IAuthState from "./reducers/auth/IAuthState";
import {IDeveloper} from "../../../backend/db/models/DeveloperModel";
import {IRepository} from "../../../backend/db/models/RepositoryModel";

export default interface IState {
    auth: IAuthState;
    developers: IDeveloper[];
    repositories: IRepository[];
}