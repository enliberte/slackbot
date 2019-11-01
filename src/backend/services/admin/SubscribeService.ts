import {ISubscribe, INewSubscribe} from "../../db/models/subscribe/SubscribeModel";
import {ISubscribeStorageService} from "../../db/storageServices/SubscribeStorageService";
import {IListQuery} from "./IListQuery";
import {IRepositoryService} from "./RepositoryService";
import {IDeveloperService} from "./DeveloperService";
import {INewFavoriteDeveloper} from "../../db/models/developer/favorite/FavoriteDeveloperModel";
import {INewFavoriteRepository} from "../../db/models/repository/favorite/FavoriteRepositoryModel";
import EM from "../ServiceErrorMessages";
import {IStashDeveloperService} from "../stash/StashDeveloperService";
import {IStashRepositoryService} from "../stash/StashRepositoryService";
import {IRepositoryStorageService} from "../../db/storageServices/RepositoryStorageService";
import {IDeveloperStorageService} from "../../db/storageServices/DeveloperStorageService";


export interface IAddSubscribeStatus {
    developer: INewFavoriteDeveloper  | string;
    repository: INewFavoriteRepository | string;
    subscribe: INewSubscribe | string;
}

export interface ISubscribeService {
    list(query: IListQuery<ISubscribe>): Promise<ISubscribe[]>;
    editSubscribe(obj: ISubscribe): Promise<IAddSubscribeStatus>;
    subscribe(obj: INewSubscribe): Promise<IAddSubscribeStatus>;
    validateSubscribe(obj: INewSubscribe): Promise<IAddSubscribeStatus>;
    unsubscribe(obj: Partial<ISubscribe>): Promise<boolean>;
}


export default class SubscribeService implements ISubscribeService {
    private subscribeStorageService: ISubscribeStorageService;
    private repositoryStorageService: IRepositoryStorageService;
    private developerStorageService: IDeveloperStorageService;
    private repositoryService: IRepositoryService;
    private developerService: IDeveloperService;
    private stashDeveloperService: IStashDeveloperService;
    private stashRepositoryService: IStashRepositoryService;

    constructor(
        subscribeStorageService: ISubscribeStorageService,
        repositoryStorageService: IRepositoryStorageService,
        developerStorageService: IDeveloperStorageService,
        repositoryService: IRepositoryService,
        developerService: IDeveloperService,
        stashDeveloperService: IStashDeveloperService,
        stashRepositoryService: IStashRepositoryService
    ) {
        this.subscribeStorageService = subscribeStorageService;
        this.repositoryStorageService = repositoryStorageService;
        this.developerStorageService = developerStorageService;
        this.repositoryService = repositoryService;
        this.developerService = developerService;
        this.stashDeveloperService = stashDeveloperService;
        this.stashRepositoryService = stashRepositoryService;
    }

    async list(query: IListQuery<ISubscribe>): Promise<ISubscribe[]> {
        const {filter, search, limit} = query;
        return this.subscribeStorageService.get(filter, search, limit);
    }

    async validateSubscribe(obj: INewSubscribe): Promise<IAddSubscribeStatus> {
        const {channelId, followed: username, follower: addedByName, reponame} = obj;
        const stashDeveloper = await this.stashDeveloperService.getValidDeveloper(username);
        const stashRepository = await this.stashRepositoryService.getValidRepository(reponame);
        const developer: INewFavoriteDeveloper | string = typeof stashDeveloper !== 'string' ?
            {channelId, username, addedByName, email: stashDeveloper.emailAddress} : stashDeveloper;
        const repository: INewFavoriteRepository | string = typeof stashRepository !== 'string' ?
            {channelId, reponame, addedByName, url: stashRepository.links.self[0].href} : stashRepository;
        const subscribe: INewSubscribe | string = typeof developer !== 'string' && typeof repository !== 'string'
            ? {...obj, followedEmail: developer.email, repoUrl: repository.url} : EM.INVALID_SUBSCRIBE;
        return {developer, repository, subscribe};
    }

    async subscribe(obj: INewSubscribe): Promise<IAddSubscribeStatus> {
        const validationResult = await this.validateSubscribe(obj);
        let {developer, repository, subscribe} = validationResult;
        if (typeof subscribe !== 'string' && typeof developer !== 'string' && typeof repository !== 'string') {
            developer = await this.developerStorageService.add(developer) ? developer : EM.DB;
            repository = await this.repositoryStorageService.add(repository) ? repository : EM.DB;
            subscribe = await this.subscribeStorageService.add(subscribe) ? subscribe : EM.DB;
        }
        return {developer, repository, subscribe};
    }

    async unsubscribe(obj: Partial<ISubscribe>): Promise<boolean> {
        return this.subscribeStorageService.remove(obj);
    };

    async editSubscribe(obj: ISubscribe): Promise<IAddSubscribeStatus> {
        const validationResult = await this.validateSubscribe(obj);
        let {developer, repository, subscribe} = validationResult;
        if (typeof subscribe !== 'string' && typeof developer !== 'string' && typeof repository !== 'string') {
            developer = await this.developerStorageService.add(developer) ? developer : EM.DB;
            repository = await this.repositoryStorageService.add(repository) ? repository : EM.DB;
            const editedSubscribe: ISubscribe = {...subscribe, id: obj.id};
            subscribe = await this.subscribeStorageService.edit(editedSubscribe) ? subscribe : EM.DB;
        }
        return {developer, repository, subscribe}
    }
}