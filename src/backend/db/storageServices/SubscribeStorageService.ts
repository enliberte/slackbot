import {ISubscribeModel, ISubscribe, SubscribeModel} from '../models/SubscribeModel';
import BaseStorageService, {IStorageService} from './BaseStorageService';

export interface ISubscribeStorageService extends IStorageService<ISubscribe> {}

export default class SubscribeStorageService extends BaseStorageService<ISubscribeModel, ISubscribe> implements ISubscribeStorageService {
    constructor() {
        super(SubscribeModel);
    }

    async get(filter: Partial<ISubscribe>): Promise<ISubscribe[]> {
        const docs = await this.model.find(filter).sort({reponame: 1}).exec();
        return docs.map(doc =>
            ({channelId: doc.channelId, followed: doc.followed, follower: doc.follower, reponame: doc.reponame})
        );
    }
}