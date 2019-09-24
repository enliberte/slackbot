import {IUser, UserModel, IUserModel} from '../models/UserModel';
import BaseStorageService, {IStorageService} from './BaseStorageService';

export interface IUserStorageService extends IStorageService<IUser> {}

export default class UserStorageService extends BaseStorageService<IUserModel, IUser> implements IUserStorageService {
    constructor() {
        super(UserModel);
    }

    async get(filter: Partial<IUser>): Promise<IUser[]> {
        const docs = await this.model.find(filter).sort({username: 1}).exec();
        return docs.map(doc => ({username: doc.username, channelId: doc.channelId, addedByName: doc.addedByName}));
    }
}
