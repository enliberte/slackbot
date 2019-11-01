import {Schema, Document, model, Model, Types} from 'mongoose';


interface INewFavoriteDeveloper {
    channelId: string;
    addedByName: string;
    username: string;
    email?: string;
}

interface IFavoriteDeveloper extends INewFavoriteDeveloper {
    id: string;
    _id?: Types.ObjectId;
}

interface IFavoriteDeveloperModel extends Document, INewFavoriteDeveloper {
    email: string;
}

const favoriteDeveloperSchema: Schema = new Schema({
    channelId: String,
    addedByName: String,
    username: String,
    email: String
});

const FavoriteDeveloperModel: Model<IFavoriteDeveloperModel> = model('Developer', favoriteDeveloperSchema);

export {INewFavoriteDeveloper, IFavoriteDeveloper, IFavoriteDeveloperModel, FavoriteDeveloperModel}