import {IDeveloper, IDeveloperWithFollowSign} from "../../db/models/DeveloperModel";
import {IDeveloperStorageService} from "../../db/storageServices/DeveloperStorageService";
import {ISubscribeStorageService} from "../../db/storageServices/SubscribeStorageService";


export interface IDeveloperService {
    list(channelId: string, reponame?: string): Promise<IDeveloperWithFollowSign[]>;
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

    private async getDevelopersWithFollowSign(developers: IDeveloper[], channelId: string, reponame: string): Promise<IDeveloperWithFollowSign[]> {
        const followedDevelopers = await this.subscribeStorageService.get({channelId, reponame});
        const followedDeveloperNames = followedDevelopers.map(developer => developer.followed);
        return developers.map(developer => ({...developer, isFollowed: followedDeveloperNames.indexOf(developer.username) !== -1}));
    }

    async list(channelId: string, reponame?: string): Promise<IDeveloperWithFollowSign[]> {
        let developers = await this.developerStorageService.get({channelId});
        if (reponame) {
            developers = await this.getDevelopersWithFollowSign(developers, channelId, reponame);
        }
        return developers;
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