import {INewUser, IUserModel, IUser, UserModel} from '../models/user/UserModel';
import BaseStorageService, {IStorageService} from './BaseStorageService';


export interface IUserStorageService extends IStorageService<INewUser, IUser> {
    edit(obj: IUser): Promise<boolean>;
}

export default class UserStorageService extends BaseStorageService<IUserModel, INewUser, IUser> implements IUserStorageService {
    constructor() {
        super(UserModel);
    }

    async get(filter: Partial<IUser>, search?: string, limit?: number): Promise<IUser[]> {
        const docs = await this.model.find(filter).exec();
        return docs.map(doc => ({
            channelId: doc.channelId,
            stashDisplayName: doc.stashDisplayName,
            stashSlug: doc.stashSlug,
            id: doc._id, commentsNotifications:
            doc.commentsNotifications,
            reviewNotifications: doc.reviewNotifications,
            subscribesNotifications: doc.subscribesNotifications
        }));
    }

    async add(obj: INewUser): Promise<boolean> {
        return this.model.update({channelId: obj.channelId}, obj, {upsert: true}).exec();
    }

    edit(obj: IUser): Promise<boolean> {
        return this.model.update({_id: obj.id}, obj).exec();
    }
}