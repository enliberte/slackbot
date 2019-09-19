import {ISubscribe, ISubscribeRequired} from "../../db/models/subscribeModel";
import {IDBController} from "../../db/controllers/baseController";


interface ISubscribeAPI {
    subscribe(obj: ISubscribeRequired): Promise<boolean>;
    unsubscribe(obj: ISubscribeRequired): Promise<boolean>;
}


export default class SubscribeAPI implements ISubscribeAPI {
    private subscribeDB: IDBController<ISubscribe, ISubscribeRequired>;

    constructor(subscribeDB: IDBController<ISubscribe, ISubscribeRequired>) {
        this.subscribeDB = subscribeDB;
    }

    async subscribe (obj: ISubscribeRequired): Promise<boolean> {
        return this.subscribeDB.add(obj);
    };

    async unsubscribe (obj: ISubscribeRequired): Promise<boolean> {
        return this.subscribeDB.remove(obj);
    };
}