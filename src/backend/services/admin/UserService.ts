import {IDeveloperStorageService} from "../../db/storageServices/DeveloperStorageService";
import {ISubscribeStorageService} from "../../db/storageServices/SubscribeStorageService";
import {IFavoriteDeveloper, INewFavoriteDeveloper} from "../../db/models/developer/favorite/FavoriteDeveloperModel";
import {IListQuery} from "./IListQuery";
import {IStashDeveloperService} from "../stash/StashDeveloperService";
import EM from "../ServiceErrorMessages";
import {INewUser, IUser} from "../../db/models/user/UserModel";
import {IUserStorageService} from "../../db/storageServices/UserStorageService";


export interface IUserService {
    list(query: IListQuery<IUser>): Promise<IUser[]>;
    add(obj: INewUser): Promise<INewUser | string>;
    delete(obj: Partial<IUser>): Promise<boolean>;
}


export default class UserService implements IUserService {
    private userStorageService: IUserStorageService;
    private developerStashService: IStashDeveloperService;

    constructor(userStorageService: IUserStorageService, developerStashService: IStashDeveloperService) {
        this.userStorageService = userStorageService;
        this.developerStashService = developerStashService;
    }

    async list(query: IListQuery<IUser>): Promise<IUser[]> {
        const {search, limit, filter} = query;
        return await this.userStorageService.get(filter, search, limit);
    }

    async add(obj: INewUser): Promise<INewUser | string> {
        if (obj.stashDisplayName.length !== 0) {
            const validDeveloper = await this.developerStashService.getValidDeveloper(obj.stashDisplayName);
            if (typeof validDeveloper !== 'string') {
                obj.stashSlug = validDeveloper.slug;
                return await this.userStorageService.add(obj) ? obj : EM.DB;
            }
            return validDeveloper;
        }
        return EM.STASH_NAME_NOT_GIVEN;
    }

    async delete(obj: Partial<IUser>): Promise<boolean> {
        return await this.userStorageService.remove(obj);
    }
}