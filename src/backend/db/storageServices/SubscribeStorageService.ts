import {ISubscribeModel, ISubscribe, SubscribeModel} from '../models/SubscribeModel';
import BaseStorageService, {IStorageService} from './BaseStorageService';


export interface IGetSubscribeFilter {
    channelId?: string;
    followed?: string;
    follower?: string;
    reponame?: string;
}

export interface ISubscribeStorageService extends IStorageService<ISubscribe, IGetSubscribeFilter> {}

export default class SubscribeStorageService extends BaseStorageService<ISubscribeModel, ISubscribe, IGetSubscribeFilter> implements ISubscribeStorageService {
    constructor() {
        super(SubscribeModel);
    }

    async get(filter: IGetSubscribeFilter, search?: string, limit?: number): Promise<ISubscribe[]> {
        const docs = await this.model.find(filter).sort({reponame: 1}).exec();
        return docs.map(doc =>
            ({channelId: doc.channelId, followed: doc.followed, follower: doc.follower, reponame: doc.reponame})
        );
    }
}