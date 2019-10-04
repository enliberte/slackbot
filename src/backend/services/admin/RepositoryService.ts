import {IRepository} from "../../db/models/RepositoryModel";
import {IRepositoryStorageService} from "../../db/storageServices/RepositoryStorageService";
import {ISubscribeStorageService} from "../../db/storageServices/SubscribeStorageService";
import {IListQuery} from "./DeveloperService";


export interface IRepositoryService {
    list(query: IListQuery): Promise<IRepository[]>;
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

    async list(query: IListQuery): Promise<IRepository[]> {
        const {channelId, search, limit} = query;
        return this.repositoryStorageService.get({channelId}, search, limit);
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