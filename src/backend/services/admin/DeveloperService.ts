import {IDeveloperStorageService} from "../../db/storageServices/DeveloperStorageService";
import {ISubscribeStorageService} from "../../db/storageServices/SubscribeStorageService";
import {IFavoriteDeveloper, INewFavoriteDeveloper} from "../../db/models/developer/favorite/FavoriteDeveloperModel";
import {IListQuery} from "./IListQuery";
import {IStashDeveloperService} from "../stash/StashDeveloperService";
import EM from "../ServiceErrorMessages";


export interface IDeveloperService {
    list(query: IListQuery<IFavoriteDeveloper>): Promise<IFavoriteDeveloper[]>;
    add(obj: INewFavoriteDeveloper): Promise<INewFavoriteDeveloper | string>;
    delete(obj: Partial<IFavoriteDeveloper>): Promise<boolean>;
}


export default class DeveloperService implements IDeveloperService {
    private developerStorageService: IDeveloperStorageService;
    private subscribeStorageService: ISubscribeStorageService;
    private developerStashService: IStashDeveloperService;

    constructor(developerStorageService: IDeveloperStorageService, subscribeStorageService: ISubscribeStorageService, developerStashService: IStashDeveloperService) {
        this.developerStorageService = developerStorageService;
        this.subscribeStorageService = subscribeStorageService;
        this.developerStashService = developerStashService;
    }

    async list(query: IListQuery<IFavoriteDeveloper>): Promise<IFavoriteDeveloper[]> {
        const {search, limit, filter} = query;
        return await this.developerStorageService.get(filter, search, limit);
    }

    async add(obj: INewFavoriteDeveloper): Promise<INewFavoriteDeveloper | string> {
        if (obj.username.length !== 0) {
            const validDeveloper = await this.developerStashService.getValidDeveloper(obj.username);
            if (typeof validDeveloper !== 'string') {
                obj.email = validDeveloper.emailAddress;
                return await this.developerStorageService.add(obj) ? obj : EM.DB;
            }
            return validDeveloper;
        }
        return EM.DEVELOPER_NOT_GIVEN;
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