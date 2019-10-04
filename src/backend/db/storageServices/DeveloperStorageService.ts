import {IDeveloper, DeveloperModel, IDeveloperModel} from '../models/DeveloperModel';
import BaseStorageService, {IStorageService} from './BaseStorageService';

export interface IGetDeveloperFilter {
    channelId?: string;
    addedByName?: string;
    username?: string | RegExp;
}

export interface IDeveloperStorageService extends IStorageService<IDeveloper, IGetDeveloperFilter> {}

export default class DeveloperStorageService extends BaseStorageService<IDeveloperModel, IDeveloper, IGetDeveloperFilter> implements IDeveloperStorageService {
    constructor() {
        super(DeveloperModel);
    }

    async get(filter: IGetDeveloperFilter, search?: string, limit?: number): Promise<IDeveloper[]> {
        if (search) {
            filter.username = new RegExp(`.*${search}.*`);
        }
        let query = this.model.find(filter).sort({username: 1});
        if (limit) {
            query = query.limit(limit);
        }
        const docs = await query.exec();
        return docs.map(doc => ({username: doc.username, channelId: doc.channelId, addedByName: doc.addedByName}));
    }
}
