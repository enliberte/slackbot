import BaseStorageService, {IStorageService} from './BaseStorageService';
import {IRepository, IRepositoryModel, RepositoryModel} from "../models/RepositoryModel";

export interface IRepositoryStorageService extends IStorageService<IRepository> {}

export default class RepositoryStorageService extends BaseStorageService<IRepositoryModel, IRepository> implements IRepositoryStorageService {
    constructor() {
        super(RepositoryModel);
    }

    async get(filter: Partial<IRepository>): Promise<IRepository[]> {
        const docs = await this.model.find(filter).sort({reponame: 1}).exec();
        return docs.map(doc => ({reponame: doc.reponame, addedByName: doc.addedByName, channelId: doc.channelId}));
    }
}