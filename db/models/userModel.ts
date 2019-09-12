import {Schema, Document, model, Model} from 'mongoose';


interface IUser {
    channelId?: string,
    addedByName?: string,
    username?: string
}

interface IUserRequired {
    channelId: string,
    addedByName: string,
    username: string
}

interface IUserWithFollowSign extends IUserRequired {
    isFollowed?: boolean;
}

interface IUserModel extends Document, IUserRequired {}

const userSchema: Schema = new Schema({
    channelId: String,
    addedByName: String,
    username: String
});

const UserModel: Model<IUserModel> = model('User', userSchema);

export {IUser, IUserRequired, IUserModel, UserModel, IUserWithFollowSign}