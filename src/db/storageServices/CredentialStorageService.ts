import {ICredential, CredentialModel, ICredentialModel} from '../models/OnetimeCredentialModel';
import BaseStorageService, {IStorageService} from './BaseStorageService';

export interface ICredentialStorageService extends IStorageService<ICredential> {}

export default class CredentialStorageService extends BaseStorageService<ICredentialModel, ICredential> implements ICredentialStorageService {
    constructor() {
        super(CredentialModel);
    }

    async get(filter: Partial<ICredential>): Promise<ICredential[]> {
        const docs = await this.model.find(filter).exec();
        return docs.map(doc => ({channelId: doc.channelId, password: doc.password}));
    }
}
