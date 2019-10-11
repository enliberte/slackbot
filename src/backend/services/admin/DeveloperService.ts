import {IDeveloperStorageService} from "../../db/storageServices/DeveloperStorageService";
import {ISubscribeStorageService} from "../../db/storageServices/SubscribeStorageService";
import {IFavoriteDeveloper, INewFavoriteDeveloper} from "../../db/models/developer/favorite/FavoriteDeveloperModel";
import {IListQuery} from "./IListQuery";


export interface IDeveloperService {
    list(query: IListQuery<IFavoriteDeveloper>): Promise<IFavoriteDeveloper[]>;
    add(obj: INewFavoriteDeveloper): Promise<boolean>;
    delete(obj: Partial<IFavoriteDeveloper>): Promise<boolean>;
}


export default class DeveloperService implements IDeveloperService {
    private developerStorageService: IDeveloperStorageService;
    private subscribeStorageService: ISubscribeStorageService;

    constructor(developerStorageService: IDeveloperStorageService, subscribeStorageService: ISubscribeStorageService) {
        this.developerStorageService = developerStorageService;
        this.subscribeStorageService = subscribeStorageService;
    }

    async list(query: IListQuery<IFavoriteDeveloper>): Promise<IFavoriteDeveloper[]> {
        const {search, limit, filter} = query;
        return await this.developerStorageService.get(filter, search, limit);
    }

    async add(obj: INewFavoriteDeveloper): Promise<boolean> {
        if (obj.username.length !== 0) {
            return this.developerStorageService.add(obj);
        } else {
            return false;
        }
    }

    async delete(obj: Partial<IFavoriteDeveloper>): Promise<boolean> {
        const developers = await this.developerStorageService.get(obj);
        if (developers.length === 0) {
            return false;
        }
        const {username, channelId} = developers[0];
        const developerRemovingOperationResult = await this.developerStorageService.remove({username, channelId});
        const subscribeRemovingOperationResult = await this.subscribeStorageService.remove({followed: username, channelId});
        return developerRemovingOperationResult && subscribeRemovingOperationResult;
    }
}