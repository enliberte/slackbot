import {Schema, Document, model, Model} from 'mongoose';


interface IUser {
    channelId: string;
    addedByName: string;
    username: string;
}

interface IUserWithFollowSign extends IUser {
    isFollowed?: boolean;
}

interface IUserModel extends Document, IUser {}

const userSchema: Schema = new Schema({
    channelId: String,
    addedByName: String,
    username: String
});

const UserModel: Model<IUserModel> = model('User', userSchema);

export {IUser, IUserModel, UserModel, IUserWithFollowSign}