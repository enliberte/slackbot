import {Schema, Document, model, Model, Types} from 'mongoose';


interface INewFavoriteRepository {
    channelId: string;
    addedByName: string;
    reponame: string;
    url?: string;
}

interface IFavoriteRepository extends INewFavoriteRepository {
    id: string;
    _id?: Types.ObjectId;
}

interface IFavoriteRepositoryModel extends Document, INewFavoriteRepository {
    url: string;
}

const favoriteRepositorySchema: Schema = new Schema({
    channelId: String,
    addedByName: String,
    reponame: String,
    url: String
});

const FavoriteRepositoryModel: Model<IFavoriteRepositoryModel> = model<IFavoriteRepositoryModel>('Repo', favoriteRepositorySchema);

export {INewFavoriteRepository, IFavoriteRepository, IFavoriteRepositoryModel, FavoriteRepositoryModel}