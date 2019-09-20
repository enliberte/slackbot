import {IUser, UserModel, IUserModel, IUserRequired} from '../models/userModel';
import BaseController, {IDBController} from './baseController';

export interface IUserController extends IDBController<IUser, IUserRequired> {}

class UserController extends BaseController<IUserModel, IUser, IUserRequired> implements IUserController {
    constructor() {
        super(UserModel);
    }

    async get(filter: IUser): Promise<IUserRequired[]> {
        const docs = await this.model.find(filter).sort({username: 1}).exec();
        return docs.map(doc => ({username: doc.username, channelId: doc.channelId, addedByName: doc.addedByName}));
    }
}

export default UserController;
