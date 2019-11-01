import StashClient from "./StashClient";
import queryString from 'query-string';
import {IDeveloperStorageService} from "../../db/storageServices/DeveloperStorageService";
import {IStashDeveloper, IStashDeveloperWithFavoriteSign} from "../../db/models/developer/stash/StashDeveloperModel";
import {
    IStashRepository,
    IStashRepositoryWithFavoriteSign
} from "../../db/models/repository/stash/StashRepositoryModel";
import EM from "../ServiceErrorMessages";


export interface IGetStashDevelopersQuery {
    channelId: string;
    limit?: number;
    filter?: string;
}


export interface IStashDeveloperService {
    list(query: IGetStashDevelopersQuery): Promise<IStashDeveloperWithFavoriteSign[] | false>;
    getValidDeveloper(developerName: string): Promise<IStashDeveloper | string>;
}


export default class StashDeveloperService implements IStashDeveloperService {
    private developerStorageService: IDeveloperStorageService;

    constructor(developerStorageService: IDeveloperStorageService) {
        this.developerStorageService = developerStorageService;
    }

    async clearData(channelId: string, stashDevelopers: IStashDeveloper[]): Promise<IStashDeveloperWithFavoriteSign[]> {
        const stashDevelopersWithFavoriteSign = [];
        for (let stashDeveloper of stashDevelopers) {
            const favoriteDevelopers = await this.developerStorageService.get({channelId, username: stashDeveloper.displayName});
            const isFavorite = favoriteDevelopers.length !== 0;
            const favoriteId = isFavorite ? favoriteDevelopers[0].id : '';
            stashDevelopersWithFavoriteSign.push({...stashDeveloper, isFavorite, favoriteId})
        }
        return stashDevelopersWithFavoriteSign;
    }

    async list(query: IGetStashDevelopersQuery): Promise<IStashDeveloperWithFavoriteSign[] | false> {
        const {channelId, filter} = query;
        const url = `/users?${queryString.stringify({limit: 1000, filter})}`;
        try {
            const response = await StashClient.get(url);
            const stashDevelopers: IStashDeveloper[] = response.data.values;
            return this.clearData(channelId, stashDevelopers);
        } catch (e) {
            return false;
        }
    }

    async getValidDeveloper(developerName: string): Promise<IStashDeveloper | string> {
        const url = `/users?${queryString.stringify({filter: developerName})}`;
        try {
            const response = await StashClient.get(url);
            const stashDevelopers: IStashDeveloper[] = response.data.values;
            return stashDevelopers.find(developer => developer.displayName === developerName) || EM.DEVELOPER_NOT_FOUND;
        } catch (e) {
            return EM.STASH;
        }
    }
}