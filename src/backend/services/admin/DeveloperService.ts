import {IDeveloper} from "../../db/models/DeveloperModel";
import {IDeveloperStorageService} from "../../db/storageServices/DeveloperStorageService";
import {ISubscribeStorageService} from "../../db/storageServices/SubscribeStorageService";


export interface IListQuery {
    search?: string;
    limit?: number;
    channelId: string;
}


export interface IDeveloperService {
    list(query: IListQuery): Promise<IDeveloper[]>;
    add(obj: IDeveloper): Promise<boolean>;
    delete(obj: {channelId: string, username: string}): Promise<boolean>;
}


export default class DeveloperService implements IDeveloperService {
    private developerStorageService: IDeveloperStorageService;
    private subscribeStorageService: ISubscribeStorageService;

    constructor(developerStorageService: IDeveloperStorageService, subscribeStorageService: ISubscribeStorageService) {
        this.developerStorageService = developerStorageService;
        this.subscribeStorageService = subscribeStorageService;
    }

    async list(query: IListQuery): Promise<IDeveloper[]> {
        const {channelId, search, limit} = query;
        return await this.developerStorageService.get({channelId}, search, limit);
    }

    async add(obj: IDeveloper): Promise<boolean> {
        if (obj.username.length !== 0) {
            return this.developerStorageService.add(obj);
        } else {
            return false;
        }
    }

    async delete(obj: {channelId: string, username: string}): Promise<boolean> {
        const {username, channelId} = obj;
        const developerRemovingOperationResult = await this.developerStorageService.remove(obj);
        const subscribeRemovingOperationResult = await this.subscribeStorageService.remove({followed: username, channelId});
        return developerRemovingOperationResult && subscribeRemovingOperationResult;
    }
}