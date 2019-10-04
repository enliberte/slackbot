import {Schema, Document, model, Model} from 'mongoose';


interface ISubscribe {
    channelId: string;
    followed: string;
    follower: string;
    reponame: string;
}

interface ISubscribeModel extends Document, ISubscribe {}

const subscribeSchema: Schema = new Schema({
    channelId: {type: String, index: true},
    followed: {type: String, index: true},
    follower: {type: String, index: true},
    reponame: {type: String, index: true}
});

const SubscribeModel: Model<ISubscribeModel> = model('Subscribe', subscribeSchema);

export {ISubscribe, ISubscribeModel, SubscribeModel}