import {ISubscribe} from "../../db/models/SubscribeModel";
import {ISubscribeStorageService} from "../../db/storageServices/SubscribeStorageService";
import {IRepositoryStorageService} from "../../db/storageServices/RepositoryStorageService";
import {IDeveloperStorageService} from "../../db/storageServices/DeveloperStorageService";


export interface ISubscribeService {
    list(filter: Partial<ISubscribe>): Promise<ISubscribe[]>
    subscribe(obj: ISubscribe): Promise<boolean>;
    subscribeCMD(obj: ISubscribe): Promise<boolean>;
    unsubscribe(obj: ISubscribe): Promise<boolean>;
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

    async list(filter: Partial<ISubscribe>): Promise<ISubscribe[]> {
        return this.subscribeStorageService.get(filter);
    }

    async subscribe(obj: ISubscribe): Promise<boolean> {
        return this.subscribeStorageService.add(obj);
    };

    async subscribeCMD(obj: ISubscribe): Promise<boolean> {
        const developer = {channelId: obj.channelId, username: obj.followed, addedByName: obj.follower};
        const repository = {channelId: obj.channelId, reponame: obj.reponame, addedByName: obj.follower};
        const addDeveloperOperationSuccess = await this.developerStorageService.add(developer);
        const addRepositoryOperationSuccess = await this.repositoryStorageService.add(repository);
        const addSubscribeOperationSuccess = await this.subscribe(obj);
        return addDeveloperOperationSuccess && addRepositoryOperationSuccess && addSubscribeOperationSuccess;
    }

    async unsubscribe(obj: ISubscribe): Promise<boolean> {
        return this.subscribeStorageService.remove(obj);
    };
}