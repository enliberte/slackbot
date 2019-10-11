import StashClient from "./StashClient";
import queryString from 'query-string';
import {IDeveloperStorageService} from "../../db/storageServices/DeveloperStorageService";
import {IStashDeveloper, IStashDeveloperWithFavoriteSign} from "../../db/models/developer/stash/StashDeveloperModel";


export interface IGetStashDevelopersQuery {
    channelId: string;
    limit?: number;
    filter?: string;
}


export interface IStashDeveloperService {
    list(query: IGetStashDevelopersQuery): Promise<IStashDeveloperWithFavoriteSign[] | false>;
}


export default class StashDeveloperService implements IStashDeveloperService {
    private developerStorageService: IDeveloperStorageService;

    constructor(developerStorageService: IDeveloperStorageService) {
        this.developerStorageService = developerStorageService;
    }

    async list(query: IGetStashDevelopersQuery): Promise<IStashDeveloperWithFavoriteSign[] | false> {
        const {channelId, limit, filter} = query;
        const url = `/users?${queryString.stringify({limit, filter})}`;
        try {
            const response = await StashClient.get(url);
            const stashDevelopers: IStashDeveloper[] = response.data.values;
            const stashDevelopersWithFavoriteSign = [];
            for (let stashDeveloper of stashDevelopers) {
                const favoriteDevelopers = await this.developerStorageService.get({channelId, username: stashDeveloper.displayName});
                const isFavorite = favoriteDevelopers.length !== 0;
                const favoriteId = isFavorite ? favoriteDevelopers[0].id : '';
                stashDevelopersWithFavoriteSign.push({...stashDeveloper, isFavorite, favoriteId})
            }
            return stashDevelopersWithFavoriteSign;
        } catch (e) {
            return false;
        }
    }


}