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

    async get(filter: Partial<IFavoriteDeveloper>): Promise<IFavoriteDeveloper[]> {
        const {id, ...resFilter} = filter;
        if (id) {
            resFilter._id = Types.ObjectId(id);
        }
        const query = this.model.find(resFilter).sort({username: 1});
        const docs = await query.exec();
        return docs.map(doc =>
            ({username: doc.username, email: doc.email, channelId: doc.channelId, addedByName: doc.addedByName, id: doc._id})
        );
    }
}