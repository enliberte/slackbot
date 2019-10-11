import {Schema, Document, model, Model, Types} from 'mongoose';


interface INewSubscribe {
    channelId: string;
    followed: string;
    follower: string;
    reponame: string;
}

interface ISubscribe extends INewSubscribe {
    id: string;
    _id?: Types.ObjectId;
}

interface ISubscribeModel extends Document, INewSubscribe {}

const subscribeSchema: Schema = new Schema({
    channelId: {type: String, index: true},
    followed: {type: String, index: true},
    follower: {type: String, index: true},
    reponame: {type: String, index: true}
});

const SubscribeModel: Model<ISubscribeModel> = model('Subscribe', subscribeSchema);

export {INewSubscribe, ISubscribe, ISubscribeModel, SubscribeModel}