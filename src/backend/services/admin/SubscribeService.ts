import {ISubscribe, INewSubscribe} from "../../db/models/subscribe/SubscribeModel";
import {ISubscribeStorageService} from "../../db/storageServices/SubscribeStorageService";
import {IRepositoryStorageService} from "../../db/storageServices/RepositoryStorageService";
import {IDeveloperStorageService} from "../../db/storageServices/DeveloperStorageService";
import {IListQuery} from "./IListQuery";


export interface ISubscribeService {
    list(query: IListQuery<ISubscribe>): Promise<ISubscribe[]>;
    editSubscribe(obj: ISubscribe): Promise<boolean>;
    subscribe(obj: INewSubscribe): Promise<boolean>;
    unsubscribe(obj: Partial<ISubscribe>): Promise<boolean>;
}


export default class SubscribeService implements ISubscribeService {
    private subscribeStorageService: ISubscribeStorageService;
    private repositoryStorageService: IRepositoryStorageService;
    private developerStorageService: IDeveloperStorageService;

    constructor(
        subscribeStorageService: ISubscribeStorageService,
        repositoryStorageService: IRepositoryStorageService,
        developerStorageService: IDeveloperStorageService
    ) {
        this.subscribeStorageService = subscribeStorageService;
        this.repositoryStorageService = repositoryStorageService;
        this.developerStorageService = developerStorageService;
    }

    async list(query: IListQuery<ISubscribe>): Promise<ISubscribe[]> {
        const {filter, search, limit} = query;
        return this.subscribeStorageService.get(filter, search, limit);
    }

    async subscribe(obj: INewSubscribe): Promise<boolean> {
        const developer = {channelId: obj.channelId, username: obj.followed, addedByName: obj.follower};
        const repository = {channelId: obj.channelId, reponame: obj.reponame, addedByName: obj.follower};
        const addDeveloperOperationSuccess = await this.developerStorageService.add(developer);
        const addRepositoryOperationSuccess = await this.repositoryStorageService.add(repository);
        const addSubscribeOperationSuccess = await this.subscribeStorageService.add(obj);
        return addDeveloperOperationSuccess && addRepositoryOperationSuccess && addSubscribeOperationSuccess;
    }

    async unsubscribe(obj: Partial<ISubscribe>): Promise<boolean> {
        return this.subscribeStorageService.remove(obj);
    };

    async editSubscribe(obj: ISubscribe): Promise<boolean> {
        return this.subscribeStorageService.edit(obj);
    }
}