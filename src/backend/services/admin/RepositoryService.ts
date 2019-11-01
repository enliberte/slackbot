import {IRepositoryStorageService} from "../../db/storageServices/RepositoryStorageService";
import {ISubscribeStorageService} from "../../db/storageServices/SubscribeStorageService";
import {IListQuery} from "./IListQuery";
import {IFavoriteRepository, INewFavoriteRepository} from "../../db/models/repository/favorite/FavoriteRepositoryModel";
import {IStashRepositoryService} from "../stash/StashRepositoryService";
import EM from "../ServiceErrorMessages";


export interface IRepositoryService {
    list(query: IListQuery<IFavoriteRepository>): Promise<IFavoriteRepository[]>;
    add(obj: INewFavoriteRepository): Promise<INewFavoriteRepository | string>;
    delete(obj: IFavoriteRepository): Promise<boolean>;
}

export default class RepositoryService implements IRepositoryService {
    private repositoryStorageService: IRepositoryStorageService;
    private subscribeStorageService: ISubscribeStorageService;
    private repositoryStashService: IStashRepositoryService;

    constructor(repositoryStorageService: IRepositoryStorageService, subscribeStorageService: ISubscribeStorageService, repositoryStashService: IStashRepositoryService) {
        this.repositoryStorageService = repositoryStorageService;
        this.subscribeStorageService = subscribeStorageService;
        this.repositoryStashService = repositoryStashService;
    }

    async list(query: IListQuery<IFavoriteRepository>): Promise<IFavoriteRepository[]> {
        const {filter, search, limit} = query;
        return this.repositoryStorageService.get(filter, search, limit);
    }

    async add(obj: INewFavoriteRepository): Promise<INewFavoriteRepository | string> {
        if (obj.reponame.length !== 0) {
            const validRepository = await this.repositoryStashService.getValidRepository(obj.reponame);
            if (typeof validRepository !== 'string') {
                obj.url = validRepository.links.self[0].href;
                return await this.repositoryStorageService.add(obj) ? obj : EM.DB;
            }
            return validRepository;
        }
        return EM.DEVELOPER_NOT_GIVEN;
    }

    async delete(obj: Partial<IFavoriteRepository>): Promise<boolean> {
        const repositories = await this.repositoryStorageService.get(obj);
        if (repositories.length === 0) {
            return false;
        }
        const {reponame, channelId} = repositories[0];
        const repoRemovingOperationResult = await this.repositoryStorageService.remove({reponame, channelId});
        const subscribeRemovingOperationResult = await this.subscribeStorageService.remove({reponame, channelId});
        return repoRemovingOperationResult && subscribeRemovingOperationResult;
    }
}