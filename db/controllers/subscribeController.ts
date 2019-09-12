import {ISubscribeModel, ISubscribe, SubscribeModel, ISubscribeRequired} from '../models/subscribeModel';
import BaseController, {logger} from './baseController';

class SubscribeController extends BaseController<ISubscribeModel, ISubscribe, ISubscribeRequired> {
    constructor() {
        super(SubscribeModel);
    }

    @logger()
    get(filter: ISubscribe) {
        return this.model.find(filter).sort({reponame: 1}).exec();
    }
}

export default SubscribeController;