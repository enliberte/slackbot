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

    async get(filter: Partial<IFavoriteRepository>): Promise<IFavoriteRepository[]> {
        const {id, ...resFilter} = filter;
        if (id) {
            resFilter._id = Types.ObjectId(id);
        }
        const query = this.model.find(resFilter).sort({reponame: 1});
        const docs = await query.exec();
        return docs.map(doc =>
            ({reponame: doc.reponame, url: doc.url, channelId: doc.channelId, addedByName: doc.addedByName, id: doc._id})
        );
    }
}