import {IRepositoryStorageService} from "../../db/storageServices/RepositoryStorageService";
import {ISubscribeStorageService} from "../../db/storageServices/SubscribeStorageService";
import {IListQuery} from "./IListQuery";
import {IFavoriteRepository, INewFavoriteRepository} from "../../db/models/repository/favorite/FavoriteRepositoryModel";


export interface IRepositoryService {
    list(query: IListQuery<IFavoriteRepository>): Promise<IFavoriteRepository[]>;
    add(obj: INewFavoriteRepository): Promise<boolean>;
    delete(obj: IFavoriteRepository): Promise<boolean>;
}

export default class RepositoryService implements IRepositoryService {
    private repositoryStorageService: IRepositoryStorageService;
    private subscribeStorageService: ISubscribeStorageService;

    constructor(repositoryStorageService: IRepositoryStorageService, subscribeStorageService: ISubscribeStorageService) {
        this.repositoryStorageService = repositoryStorageService;
        this.subscribeStorageService = subscribeStorageService;
    }

    async list(query: IListQuery<IFavoriteRepository>): Promise<IFavoriteRepository[]> {
        const {filter, search, limit} = query;
        return this.repositoryStorageService.get(filter, search, limit);
    }

    async add(obj: INewFavoriteRepository): Promise<boolean> {
        if (obj.reponame.length !== 0) {
            return this.repositoryStorageService.add(obj);
        } else {
            return false;
        }
    }

    async delete(obj: Partial<IFavoriteRepository>): Promise<boolean> {
        const repositories = await this.repositoryStorageService.get(obj);
        console.log(obj, repositories);
        if (repositories.length === 0) {
            return false;
        }
        const {reponame, channelId} = repositories[0];
        const repoRemovingOperationResult = await this.repositoryStorageService.remove({reponame, channelId});
        const subscribeRemovingOperationResult = await this.subscribeStorageService.remove({reponame, channelId});
        return repoRemovingOperationResult && subscribeRemovingOperationResult;
    }
}