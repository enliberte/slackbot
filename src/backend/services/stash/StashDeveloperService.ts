import {IStashDeveloper} from "../../db/models/DeveloperModel";
import StashClient from "./StashClient";
import queryString from 'query-string';


export interface IGetStashDevelopersQuery {
    start?: number;
    limit?: number;
    filter?: string;
}


export interface IStashDeveloperService {
    list(query: IGetStashDevelopersQuery): Promise<IStashDeveloper[] | false>;
}


export default class StashDeveloperService implements IStashDeveloperService {

    async list(query: IGetStashDevelopersQuery): Promise<IStashDeveloper[] | false> {
        const url = `https://stash.firmglobal.com/rest/api/1.0/users?${queryString.stringify(query)}`;
        try {
            const response = await StashClient.get(url);
            return response.data;
        } catch (e) {
            console.log(JSON.stringify(e));
            return false;
        }
    }


}