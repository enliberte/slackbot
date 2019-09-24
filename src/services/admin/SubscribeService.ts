import {ISubscribe} from "../../db/models/SubscribeModel";
import {ISubscribeStorageService} from "../../db/storageServices/SubscribeStorageService";


export interface ISubscribeService {
    subscribe(obj: ISubscribe): Promise<boolean>;
    unsubscribe(obj: ISubscribe): Promise<boolean>;
}


export default class SubscribeService implements ISubscribeService {
    private subscribeStorageService: ISubscribeStorageService;

    constructor(subscribeStorageService: ISubscribeStorageService) {
        this.subscribeStorageService = subscribeStorageService;
    }

    async subscribe (obj: ISubscribe): Promise<boolean> {
        return this.subscribeStorageService.add(obj);
    };

    async unsubscribe (obj: ISubscribe): Promise<boolean> {
        return this.subscribeStorageService.remove(obj);
    };
}