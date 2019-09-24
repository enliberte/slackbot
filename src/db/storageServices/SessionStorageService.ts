import {ISession, ISessionModel, SessionModel} from '../models/SessionModel';
import BaseStorageService, {IStorageService} from './BaseStorageService';

export interface ISessionStorageService extends IStorageService<ISession> {}

export default class SessionStorageService extends BaseStorageService<ISessionModel, ISession> implements ISessionStorageService {
    constructor() {
        super(SessionModel);
    }

    async get(filter: Partial<ISession>): Promise<ISession[]> {
        const docs = await this.model.find(filter).exec();
        return docs.map(doc => ({session: doc.session, username: doc.username}));
    }
}