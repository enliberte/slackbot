import {ISubscribeModel, ISubscribe, SubscribeModel, ISubscribeRequired} from '../models/subscribeModel';
import BaseController, {IDBController} from './baseController';

export interface ISubscribeController extends IDBController<ISubscribe, ISubscribeRequired> {}

class SubscribeController extends BaseController<ISubscribeModel, ISubscribe, ISubscribeRequired> implements ISubscribeController {
    constructor() {
        super(SubscribeModel);
    }

    async get(filter: ISubscribe): Promise<ISubscribeRequired[]> {
        const docs = await this.model.find(filter).sort({reponame: 1}).exec();
        return docs.map(doc =>
            ({channelId: doc.channelId, followed: doc.followed, follower: doc.follower, reponame: doc.reponame})
        );
    }
}

export default SubscribeController;