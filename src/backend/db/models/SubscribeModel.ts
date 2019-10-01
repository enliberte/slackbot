import {Schema, Document, model, Model} from 'mongoose';


interface ISubscribe {
    channelId: string;
    followed: string;
    follower: string;
    reponame: string;
}

interface ISubscribeModel extends Document, ISubscribe {}

const subscribeSchema: Schema = new Schema({
    channelId: String,
    followed: String,
    follower: String,
    reponame: String
});

const SubscribeModel: Model<ISubscribeModel> = model('Subscribe', subscribeSchema);

export {ISubscribe, ISubscribeModel, SubscribeModel}