import StashClient from "./StashClient";
import queryString from 'query-string';
import {IStashRepository, IStashRepositoryWithFavoriteSign} from "../../db/models/RepositoryModel";
import {IRepositoryStorageService} from "../../db/storageServices/RepositoryStorageService";


export interface IGetStashRepositoryQuery {
    channelId: string;
    limit?: number;
    name?: string;
}


export interface IStashRepositoryService {
    list(query: IGetStashRepositoryQuery): Promise<IStashRepositoryWithFavoriteSign[] | false>;
}


export default class StashRepositoryService implements IStashRepositoryService {
    private repositoryStorageService: IRepositoryStorageService;

    constructor(repositoryStorageService: IRepositoryStorageService) {
        this.repositoryStorageService = repositoryStorageService;
    }

    async list(query: IGetStashRepositoryQuery): Promise<IStashRepositoryWithFavoriteSign[] | false> {
        const {channelId, limit, name} = query;
        const url = `/repos?${queryString.stringify({limit, name})}`;
        try {
            const response = await StashClient.get(url);
            const stashRepositories: IStashRepository[] = response.data.values;
            const stashRepositoriesWithFavoriteSign = [];
            for (let stashRepository of stashRepositories) {
                const favoriteRepositories = await this.repositoryStorageService.get({channelId, reponame: stashRepository.links.self[0].href});
                stashRepositoriesWithFavoriteSign.push({...stashRepository, isFavorite: favoriteRepositories.length !== 0})
            }
            return stashRepositoriesWithFavoriteSign;
        } catch (e) {
            return false;
        }
    }


}