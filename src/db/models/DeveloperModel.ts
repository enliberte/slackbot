import {Schema, Document, model, Model} from 'mongoose';


interface IDeveloper {
    channelId: string;
    addedByName: string;
    username: string;
}

interface IDeveloperWithFollowSign extends IDeveloper {
    isFollowed?: boolean;
}

interface IDeveloperModel extends Document, IDeveloper {}

const developerSchema: Schema = new Schema({
    channelId: String,
    addedByName: String,
    username: String
});

const DeveloperModel: Model<IDeveloperModel> = model('Developer', developerSchema);

export {IDeveloper, IDeveloperModel, DeveloperModel, IDeveloperWithFollowSign}