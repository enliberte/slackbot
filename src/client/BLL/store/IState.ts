import IAuthState from "./reducers/auth/IAuthState";
import {IDeveloper} from "../../../backend/db/models/DeveloperModel";

export default interface IState {
    auth: IAuthState;
    developers: IDeveloper[];
}