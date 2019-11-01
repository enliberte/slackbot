import {IListQuery} from "./IListQuery";
import EM from "../ServiceErrorMessages";
import {ISession} from "../../db/models/session/SessionModel";
import {ISessionStorageService} from "../../db/storageServices/SessionStorageService";


export interface ISessionService {
    list(query: IListQuery<ISession>): Promise<ISession[]>;
    add(obj: ISession): Promise<ISession | string>;
    delete(obj: Partial<ISession>): Promise<boolean>;
}


export default class SessionService implements ISessionService {
    private sessionStorageService: ISessionStorageService;

    constructor(sessionStorageService: ISessionStorageService) {
        this.sessionStorageService = sessionStorageService;
    }

    async list(query: IListQuery<ISession>): Promise<ISession[]> {
        const {search, limit, filter} = query;
        return await this.sessionStorageService.get(filter, search, limit);
    }

    async add(obj: ISession): Promise<ISession | string> {
        return await this.sessionStorageService.add(obj) ? obj : EM.DB;
    }

    async delete(obj: Partial<ISession>): Promise<boolean> {
        return await this.sessionStorageService.remove(obj);
    }
}