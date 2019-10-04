import BaseStorageService, {IStorageService} from './BaseStorageService';
import {IRepository, IRepositoryModel, RepositoryModel} from "../models/RepositoryModel";

export interface IGetRepositoryFilter {
    channelId?: string;
    addedByName?: string;
    reponame?: string | RegExp;
}

export interface IRepositoryStorageService extends IStorageService<IRepository, IGetRepositoryFilter> {}

export default class RepositoryStorageService extends BaseStorageService<IRepositoryModel, IRepository, IGetRepositoryFilter> implements IRepositoryStorageService {
    constructor() {
        super(RepositoryModel);
    }

    async get(filter: IGetRepositoryFilter, search?: string, limit?: number): Promise<IRepository[]> {
        if (search) {
            filter.reponame = new RegExp(`.*${search}.*`);
        }
        let query = this.model.find(filter).sort({reponame: 1});
        if (limit) {
            query = query.limit(limit);
        }
        const docs = await query.exec();
        return docs.map(doc => ({reponame: doc.reponame, channelId: doc.channelId, addedByName: doc.addedByName}));
    }
}