import {Schema, Document, model, Model, Types} from 'mongoose';


interface INewSubscribe {
    channelId: string;
    followed: string;
    follower: string;
    reponame: string;
    repoUrl?: string;
    followedEmail?: string;
}

interface ISubscribe extends INewSubscribe {
    id: string;
    _id?: Types.ObjectId;
}

interface ISubscribeModel extends Document, INewSubscribe {
    repoUrl: string;
    followedEmail: string;
}

const subscribeSchema: Schema = new Schema({
    channelId: String,
    followed: String,
    followedEmail: String,
    follower: String,
    reponame: String,
    repoUrl: String
});

const SubscribeModel: Model<ISubscribeModel> = model('Subscribe', subscribeSchema);

export {INewSubscribe, ISubscribe, ISubscribeModel, SubscribeModel}