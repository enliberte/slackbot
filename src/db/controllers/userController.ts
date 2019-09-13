import {IUser, UserModel, IUserModel, IUserRequired} from '../models/userModel';
import BaseController from './baseController';

class UserController extends BaseController<IUserModel, IUser, IUserRequired> {
    constructor() {
        super(UserModel);
    }

    get(filter: IUser) {
        return this.model.find(filter).sort({username: 1}).exec();
    }
}

export default UserController;
