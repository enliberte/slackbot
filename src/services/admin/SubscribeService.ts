import {ISubscribe} from "../../db/models/SubscribeModel";
import {ISubscribeStorageService} from "../../db/storageServices/SubscribeStorageService";
import {IRepositoryStorageService} from "../../db/storageServices/RepositoryStorageService";
import {IUserStorageService} from "../../db/storageServices/UserStorageService";


export interface ISubscribeService {
    subscribe(obj: ISubscribe): Promise<boolean>;
    subscribeCMD(obj: ISubscribe): Promise<boolean>;
    unsubscribe(obj: ISubscribe): Promise<boolean>;
}


export default class SubscribeService implements ISubscribeService {
    private subscribeStorageService: ISubscribeStorageService;
    private repositoryStorageService: IRepositoryStorageService;
    private userStorageService: IUserStorageService;

    constructor(
        subscribeStorageService: ISubscribeStorageService,
        repositoryStorageService: IRepositoryStorageService,
        userStorageService: IUserStorageService
    ) {
        this.subscribeStorageService = subscribeStorageService;
        this.repositoryStorageService = repositoryStorageService;
        this.userStorageService = userStorageService;
    }

    async subscribe(obj: ISubscribe): Promise<boolean> {
        return this.subscribeStorageService.add(obj);
    };

    async subscribeCMD(obj: ISubscribe): Promise<boolean> {
        const user = {channelId: obj.channelId, username: obj.followed, addedByName: obj.follower};
        const repository = {channelId: obj.channelId, reponame: obj.reponame, addedByName: obj.follower};
        const addUserOperationSuccess = await this.userStorageService.add(user);
        const addRepositoryOperationSuccess = await this.repositoryStorageService.add(repository);
        const addSubscribeOperationSuccess = await this.subscribe(obj);
        return addUserOperationSuccess && addRepositoryOperationSuccess && addSubscribeOperationSuccess;
    }

    async unsubscribe(obj: ISubscribe): Promise<boolean> {
        return this.subscribeStorageService.remove(obj);
    };
}