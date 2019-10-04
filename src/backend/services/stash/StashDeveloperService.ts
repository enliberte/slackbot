import {IStashDeveloper, IStashDeveloperWithFollowSign} from "../../db/models/DeveloperModel";
import StashClient from "./StashClient";
import queryString from 'query-string';
import {IDeveloperStorageService} from "../../db/storageServices/DeveloperStorageService";


export interface IGetStashDevelopersQuery {
    channelId: string;
    limit?: number;
    filter?: string;
}


export interface IStashDeveloperService {
    list(query: IGetStashDevelopersQuery): Promise<IStashDeveloperWithFollowSign[] | false>;
}


export default class StashDeveloperService implements IStashDeveloperService {
    private developerStorageService: IDeveloperStorageService;

    constructor(developerStorageService: IDeveloperStorageService) {
        this.developerStorageService = developerStorageService;
    }

    async list(query: IGetStashDevelopersQuery): Promise<IStashDeveloperWithFollowSign[] | false> {
        const {channelId, limit, filter} = query;
        const url = `/users?${queryString.stringify({limit, filter})}`;
        try {
            const response = await StashClient.get(url);
            const stashDevelopers: IStashDeveloper[] = response.data.values;
            const stashDevelopersWithFollowSign = [];
            for (let stashDeveloper of stashDevelopers) {
                const favoriteDevelopers = await this.developerStorageService.get({channelId, username: stashDeveloper.displayName});
                stashDevelopersWithFollowSign.push({...stashDeveloper, isFollow: favoriteDevelopers.length !== 0})
            }
            return stashDevelopersWithFollowSign;
        } catch (e) {
            return false;
        }
    }


}