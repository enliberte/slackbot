import {IStashDeveloper} from "../../db/models/DeveloperModel";
import StashClient from "./StashClient";
import queryString from 'query-string';
import axios from "axios";


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
        // const url = `/users?${queryString.stringify(query)}`;
        const url = "https://www.google.com";
        console.log('-----------------------------------------');
        console.log(url);
        console.log('-----------------------------------------');
        try {
            const response1 = await StashClient.get(url);
            const response2 = await axios.get(url);
            console.log('-------------------------------------');
            console.log(response1.statusText);
            console.log(response2.statusText);
            console.log('-------------------------------------');
            // return response.data;
            return false;
        } catch (e) {
            return false;
        }
    }


}