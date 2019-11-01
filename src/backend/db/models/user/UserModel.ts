import {Schema, Document, model, Model, Types} from 'mongoose';


interface INewUser {
    channelId?: string;
    stashDisplayName: string;
    stashSlug?: string;
    commentsNotifications?: boolean;
    reviewNotifications?: boolean;
    subscribesNotifications?: boolean;
}

interface IUser extends INewUser {
    id: string;
    _id?: Types.ObjectId;
}

interface IUserModel extends Document, INewUser {}

const userSchema: Schema = new Schema({
    channelId: String,
    stashDisplayName: String,
    stashSlug: String,
    commentsNotifications: Boolean,
    reviewNotifications: Boolean,
    subscribesNotifications: Boolean
});

const UserModel: Model<IUserModel> = model('User', userSchema);

export {INewUser, IUser, IUserModel, UserModel}