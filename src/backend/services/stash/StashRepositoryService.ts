import StashClient from "./StashClient";
import queryString from 'query-string';
import {IRepositoryStorageService} from "../../db/storageServices/RepositoryStorageService";
import {
    IStashRepository,
    IStashRepositoryWithFavoriteSign
} from "../../db/models/repository/stash/StashRepositoryModel";
import EM from "../ServiceErrorMessages";


export interface IGetStashRepositoryQuery {
    channelId: string;
    limit?: number;
    name?: string;
}


export interface IStashRepositoryService {
    list(query: IGetStashRepositoryQuery): Promise<IStashRepositoryWithFavoriteSign[] | false>;
    getValidRepository(repositoryName: string): Promise<IStashRepository | string>;
}


export default class StashRepositoryService implements IStashRepositoryService {
    private repositoryStorageService: IRepositoryStorageService;

    constructor(repositoryStorageService: IRepositoryStorageService) {
        this.repositoryStorageService = repositoryStorageService;
    }

    async clearData(channelId: string, stashRepositories: IStashRepository[]): Promise<IStashRepositoryWithFavoriteSign[]> {
        const stashRepositoriesWithFavoriteSign = [];
        for (let stashRepository of stashRepositories) {
            const url = stashRepository.links.self[0].href;
            const name = stashRepository.name;
            const favoriteRepositories = await this.repositoryStorageService.get({channelId, reponame: name});
            const isFavorite = favoriteRepositories.length !== 0;
            const favoriteId = isFavorite ? favoriteRepositories[0].id : '';
            stashRepositoriesWithFavoriteSign.push({isFavorite, favoriteId, url, name})
        }
        return stashRepositoriesWithFavoriteSign;
    }

    async list(query: IGetStashRepositoryQuery): Promise<IStashRepositoryWithFavoriteSign[] | false> {
        const {channelId, name} = query;
        const url = `/repos?${queryString.stringify({limit: 1000, name})}`;
        try {
            const response = await StashClient.get(url);
            const stashRepositories: IStashRepository[] = response.data.values;
            return this.clearData(channelId, stashRepositories);
        } catch (e) {
            return false;
        }
    }

    async getValidRepository(repositoryName: string): Promise<IStashRepository | string> {
        const url = `/repos?${queryString.stringify({name: repositoryName})}`;
        try {
            const response = await StashClient.get(url);
            const stashRepositories: IStashRepository[] = response.data.values;
            return stashRepositories.find(repository => repository.name === repositoryName) || EM.REPOSITORY_NOT_FOUND;
        } catch (e) {
            return EM.STASH;
        }
    }
}