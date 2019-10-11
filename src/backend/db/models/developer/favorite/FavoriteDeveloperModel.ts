import {Schema, Document, model, Model, Types} from 'mongoose';


interface INewFavoriteDeveloper {
    channelId: string;
    addedByName: string;
    username: string;
}

interface IFavoriteDeveloper extends INewFavoriteDeveloper {
    id: string;
    _id?: Types.ObjectId;
}

interface IFavoriteDeveloperModel extends Document, INewFavoriteDeveloper {}

const favoriteDeveloperSchema: Schema = new Schema({
    channelId: {type: String, index: true},
    addedByName: {type: String, index: true},
    username: {type: String, index: true}
});

const FavoriteDeveloperModel: Model<IFavoriteDeveloperModel> = model('Developer', favoriteDeveloperSchema);

export {INewFavoriteDeveloper, IFavoriteDeveloper, IFavoriteDeveloperModel, FavoriteDeveloperModel}