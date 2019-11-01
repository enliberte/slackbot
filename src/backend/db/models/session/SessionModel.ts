import {Schema, Document, model, Model} from 'mongoose';


interface ISession {
    channelId: string;
    sid: string;
}

interface ISessionModel extends Document, ISession {}

const sessionSchema: Schema = new Schema({
    channelId: String,
    sid: String
});

const SessionModel: Model<ISessionModel> = model('Session', sessionSchema);

export {ISession, ISessionModel, SessionModel};