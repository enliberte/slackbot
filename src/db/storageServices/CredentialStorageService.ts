import {ICredential, CredentialModel, ICredentialModel} from '../models/CredentialModel';
import BaseStorageService, {IStorageService} from './BaseStorageService';

export interface ICredentialStorageService extends IStorageService<ICredential> {}

export default class CredentialStorageService extends BaseStorageService<ICredentialModel, ICredential> implements ICredentialStorageService {
    constructor() {
        super(CredentialModel);
    }

    add(obj: ICredential): Promise<boolean> {
        return this.model.update({channelId: obj.channelId}, obj, {upsert: true}).exec();
    }

    async get(filter: Partial<ICredential>): Promise<ICredential[]> {
        const docs = await this.model.find(filter).exec();
        return docs.map(doc => ({channelId: doc.channelId, password: doc.password}));
    }
}
