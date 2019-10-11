import BaseStorageService, {IStorageService} from './BaseStorageService';
import {
    FavoriteDeveloperModel,
    IFavoriteDeveloper,
    IFavoriteDeveloperModel,
    INewFavoriteDeveloper
} from "../models/developer/favorite/FavoriteDeveloperModel";
import {Types} from 'mongoose';

export interface IDeveloperStorageService extends IStorageService<INewFavoriteDeveloper, IFavoriteDeveloper> {}

export default class DeveloperStorageService extends BaseStorageService<IFavoriteDeveloperModel, INewFavoriteDeveloper, IFavoriteDeveloper> implements IDeveloperStorageService {
    constructor() {
        super(FavoriteDeveloperModel);
    }

    async get(filter: Partial<IFavoriteDeveloper>, search?: string, limit?: number): Promise<IFavoriteDeveloper[]> {
        const {id, ...filterData} = filter;
        let resFilter;
        if (search) {
            resFilter = {...filterData, username: new RegExp(`.*${search}.*`)};
        } else {
            resFilter = {...filterData};
        }
        if (id) {
            resFilter._id = Types.ObjectId(id);
        }
        let query = this.model.find(resFilter).sort({username: 1});
        if (limit) {
            query = query.limit(limit);
        }
        const docs = await query.exec();
        return docs.map(doc => ({username: doc.username, channelId: doc.channelId, addedByName: doc.addedByName, id: doc._id}));
    }
}