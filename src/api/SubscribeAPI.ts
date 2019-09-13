import SubscribeController from '../db/controllers/subscribeController';
import {ISubscribeRequired} from "../db/models/subscribeModel";


interface ISubscribeAPI {
    subscribe(obj: ISubscribeRequired): Promise<void>;
    unsubscribe(obj: ISubscribeRequired): Promise<void>;
}


class SubscribeAPI implements ISubscribeAPI {
    private subscribeDB: SubscribeController;

    constructor() {
        this.subscribeDB = new SubscribeController();
    }

    async subscribe (obj: ISubscribeRequired) {
        await this.subscribeDB.add(obj);
    };

    async unsubscribe (obj: ISubscribeRequired) {
        await this.subscribeDB.remove(obj);
    };
}

export default SubscribeAPI;