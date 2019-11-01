import {INewSubscribe, ISubscribeModel, ISubscribe, SubscribeModel} from '../models/subscribe/SubscribeModel';
import BaseStorageService, {IStorageService} from './BaseStorageService';


export interface ISubscribeStorageService extends IStorageService<INewSubscribe, ISubscribe> {
    edit(obj: ISubscribe): Promise<boolean>;
}

export default class SubscribeStorageService extends BaseStorageService<ISubscribeModel, INewSubscribe, ISubscribe> implements ISubscribeStorageService {
    constructor() {
        super(SubscribeModel);
    }

    async get(filter: Partial<ISubscribe>, search?: string, limit?: number): Promise<ISubscribe[]> {
        const docs = await this.model.find(filter).sort({reponame: 1}).exec();
        return docs.map(doc =>
            ({channelId: doc.channelId, followed: doc.followed, follower: doc.follower, reponame: doc.reponame, id: doc._id, followedEmail: doc.followedEmail, repoUrl: doc.repoUrl})
        );
    }

    edit(obj: ISubscribe): Promise<boolean> {
        return this.model.update({_id: obj.id}, obj).exec();
    }
}