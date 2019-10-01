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
        const url = `/users?${queryString.stringify(query)}`;
        console.log('-----------------------------------------');
        console.log(url);
        console.log('-----------------------------------------');
        try {
            const response = await StashClient.get(url);
            return response.data;
        } catch (e) {
            return false;
        }
    }


}