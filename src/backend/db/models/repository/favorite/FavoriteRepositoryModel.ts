import {Schema, Document, model, Model, Types} from 'mongoose';


interface INewFavoriteRepository {
    channelId: string;
    addedByName: string;
    reponame: string;
}

interface IFavoriteRepository extends INewFavoriteRepository {
    id: string;
    _id?: Types.ObjectId;
}

interface IFavoriteRepositoryModel extends Document, INewFavoriteRepository {}

const favoriteRepositorySchema: Schema = new Schema({
    channelId: {type: String, index: true},
    addedByName: {type: String, index: true},
    reponame: {type: String, index: true}
});

const FavoriteRepositoryModel: Model<IFavoriteRepositoryModel> = model<IFavoriteRepositoryModel>('Repo', favoriteRepositorySchema);

export {INewFavoriteRepository, IFavoriteRepository, IFavoriteRepositoryModel, FavoriteRepositoryModel}