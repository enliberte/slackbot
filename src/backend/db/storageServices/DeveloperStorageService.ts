import {IDeveloper, DeveloperModel, IDeveloperModel} from '../models/DeveloperModel';
import BaseStorageService, {IStorageService} from './BaseStorageService';

export interface IDeveloperStorageService extends IStorageService<IDeveloper> {}

export default class DeveloperStorageService extends BaseStorageService<IDeveloperModel, IDeveloper> implements IDeveloperStorageService {
    constructor() {
        super(DeveloperModel);
    }

    async get(filter: Partial<IDeveloper>): Promise<IDeveloper[]> {
        const docs = await this.model.find(filter).sort({username: 1}).exec();
        return docs.map(doc => ({username: doc.username, channelId: doc.channelId, addedByName: doc.addedByName}));
    }
}
