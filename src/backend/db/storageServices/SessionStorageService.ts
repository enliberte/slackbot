import {ISession, ISessionModel, SessionModel} from '../models/session/SessionModel';
import BaseStorageService, {IStorageService} from './BaseStorageService';


export interface ISessionStorageService extends IStorageService<ISession, ISession> {}

export default class SessionStorageService extends BaseStorageService<ISessionModel, ISession, ISession> implements ISessionStorageService {
    constructor() {
        super(SessionModel);
    }

    async get(filter: Partial<ISession>, search?: string, limit?: number): Promise<ISession[]> {
        const docs = await this.model.find(filter).exec();
        return docs.map(doc => ({channelId: doc.channelId, sid: doc.sid}));
    }

    async add(obj: ISession): Promise<boolean> {
        return this.model.update({channelId: obj.channelId}, obj, {upsert: true}).exec();
    }
}