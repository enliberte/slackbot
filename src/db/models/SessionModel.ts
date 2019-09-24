import {Schema, Document, model, Model} from 'mongoose';


interface ISession {
    session: string;
    username: string;
}

interface ISessionModel extends Document, ISession {}

const sessionSchema: Schema = new Schema({
    session: String,
    username: String
});

const SessionModel: Model<ISessionModel> = model('Session', sessionSchema);

export {ISession, ISessionModel, SessionModel}