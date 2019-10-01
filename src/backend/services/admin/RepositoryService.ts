import {IRepository} from "../../db/models/RepositoryModel";
import {IRepositoryStorageService} from "../../db/storageServices/RepositoryStorageService";
import {ISubscribeStorageService} from "../../db/storageServices/SubscribeStorageService";


export interface IRepositoryService {
    list(channelId: string): Promise<IRepository[]>;
    add(obj: IRepository): Promise<boolean>;
    delete(obj: {channelId: string, reponame: string}): Promise<boolean>;
}

export default class RepositoryService implements IRepositoryService {
    private repositoryStorageService: IRepositoryStorageService;
    private subscribeStorageService: ISubscribeStorageService;

    constructor(repositoryStorageService: IRepositoryStorageService, subscribeStorageService: ISubscribeStorageService) {
        this.repositoryStorageService = repositoryStorageService;
        this.subscribeStorageService = subscribeStorageService;
    }

    async list(channelId: string): Promise<IRepository[]> {
        return this.repositoryStorageService.get({channelId});
    }

    async add(obj: IRepository): Promise<boolean> {
        if (obj.reponame.length !== 0) {
            return this.repositoryStorageService.add(obj);
        } else {
            return false;
        }
    }

    async delete(obj: {channelId: string, reponame: string}): Promise<boolean> {
        const repoRemovingOperationResult = await this.repositoryStorageService.remove(obj);
        const subscribeRemovingOperationResult = await this.subscribeStorageService.remove(obj);
        return repoRemovingOperationResult && subscribeRemovingOperationResult;
    }
}