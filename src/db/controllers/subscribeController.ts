import {ISubscribeModel, ISubscribe, SubscribeModel, ISubscribeRequired} from '../models/subscribeModel';
import BaseController from './baseController';

class SubscribeController extends BaseController<ISubscribeModel, ISubscribe, ISubscribeRequired> {
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