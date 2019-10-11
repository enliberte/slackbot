import BaseStorageService, {IStorageService} from './BaseStorageService';
import {
    FavoriteRepositoryModel,
    IFavoriteRepository,
    IFavoriteRepositoryModel,
    INewFavoriteRepository
} from "../models/repository/favorite/FavoriteRepositoryModel";
import {Types} from 'mongoose';

export interface IRepositoryStorageService extends IStorageService<INewFavoriteRepository, IFavoriteRepository> {}

export default class RepositoryStorageService extends BaseStorageService<IFavoriteRepositoryModel, INewFavoriteRepository, IFavoriteRepository> implements IRepositoryStorageService {
    constructor() {
        super(FavoriteRepositoryModel);
    }

    async get(filter: Partial<IFavoriteRepository>, search?: string, limit?: number): Promise<IFavoriteRepository[]> {
        const {id, ...filterData} = filter;
        let resFilter;
        if (search) {
            resFilter = {...filterData, reponame: new RegExp(`.*${search}.*`)};
        } else {
            resFilter = {...filterData};
        }
        if (id) {
            resFilter._id = Types.ObjectId(id);
        }
        let query = this.model.find(resFilter).sort({reponame: 1});
        if (limit) {
            query = query.limit(limit);
        }
        const docs = await query.exec();
        return docs.map(doc => ({reponame: doc.reponame, channelId: doc.channelId, addedByName: doc.addedByName, id: doc._id}));
    }
}