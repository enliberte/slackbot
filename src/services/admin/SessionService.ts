import {ISession} from "../../db/models/SessionModel";
import {ISessionStorageService} from "../../db/storageServices/SessionStorageService";
import {ISIDGenerator} from "./SIDGenerator";


export interface ISessionService {
    createSID(username: string): string;
    list(filter: Partial<ISession>): Promise<ISession[]>;
    add(obj: ISession): Promise<boolean>;
    delete(obj: Partial<ISession>): Promise<boolean>;
}

export default class SessionService implements ISessionService {
    private sessionStorageService: ISessionStorageService;
    private sidGenerator: ISIDGenerator;

    constructor(sessionStorageService: ISessionStorageService, sidGenerator: ISIDGenerator) {
        this.sessionStorageService = sessionStorageService;
        this.sidGenerator = sidGenerator;
    }

    async list(filter: ISession): Promise<ISession[]> {
        return this.sessionStorageService.get(filter);
    }

    async add(obj: ISession): Promise<boolean> {
        return this.sessionStorageService.add(obj);
    }

    async delete(obj: ISession) {
        return this.sessionStorageService.remove(obj);
    }

    createSID(username: string): string {
        return this.sidGenerator.generate(username);
    }
}