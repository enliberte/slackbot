import {ISubscribeRequired} from "../../db/models/subscribeModel";
import {ISubscribeController} from "../../db/controllers/subscribeController";


export interface ISubscribeAPI {
    subscribe(obj: ISubscribeRequired): Promise<boolean>;
    unsubscribe(obj: ISubscribeRequired): Promise<boolean>;
}


export default class SubscribeAPI implements ISubscribeAPI {
    private subscribeDB: ISubscribeController;

    constructor(subscribeDB: ISubscribeController) {
        this.subscribeDB = subscribeDB;
    }

    async subscribe (obj: ISubscribeRequired): Promise<boolean> {
        return this.subscribeDB.add(obj);
    };

    async unsubscribe (obj: ISubscribeRequired): Promise<boolean> {
        return this.subscribeDB.remove(obj);
    };
}