import {Schema, Document, model, Model} from 'mongoose';

interface ISubscribe {
    channelId?: string;
    followed?: string;
    follower?: string;
    reponame?: string;
}

interface ISubscribeRequired extends ISubscribe {
    channelId: string;
    followed: string;
    follower: string;
    reponame: string;
}

interface ISubscribeModel extends Document, ISubscribeRequired {}

const subscribeSchema: Schema = new Schema({
    channelId: String,
    followed: String,
    follower: String,
    reponame: String
});

const SubscribeModel: Model<ISubscribeModel> = model('Subscribe', subscribeSchema);

export {ISubscribe, ISubscribeRequired, ISubscribeModel, SubscribeModel}