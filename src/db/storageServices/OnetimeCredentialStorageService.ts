import {IOnetimeCredential, OnetimeCredentialModel, IOnetimeCredentialModel} from '../models/OnetimeCredentialModel';
import BaseStorageService, {IStorageService} from './BaseStorageService';

export interface IOnetimeCredentialStorageService extends IStorageService<IOnetimeCredential> {}

export default class OnetimeCredentialStorageService extends BaseStorageService<IOnetimeCredentialModel, IOnetimeCredential> implements IOnetimeCredentialStorageService {
    constructor() {
        super(OnetimeCredentialModel);
    }

    async get(filter: Partial<IOnetimeCredential>): Promise<IOnetimeCredential[]> {
        const docs = await this.model.find(filter).exec();
        return docs.map(doc => ({channelId: doc.channelId, password: doc.password}));
    }
}
