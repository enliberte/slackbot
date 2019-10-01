import {Schema, Document, model, Model} from 'mongoose';


interface IDeveloper {
    channelId: string;
    addedByName: string;
    username: string;
}

interface IDeveloperWithFollowSign extends IDeveloper {
    isFollowed?: boolean;
}

interface IStashDeveloperLink {
    self: [{href: string}]
}

interface IStashDeveloper {
    name: string;
    emailAddress: string;
    id: number;
    displayName: string;
    active: boolean;
    slug: string;
    type: string;
    links: IStashDeveloperLink
}

interface IDeveloperModel extends Document, IDeveloper {}

const developerSchema: Schema = new Schema({
    channelId: String,
    addedByName: String,
    username: String
});

const DeveloperModel: Model<IDeveloperModel> = model('Developer', developerSchema);

export {IDeveloper, IDeveloperModel, DeveloperModel, IDeveloperWithFollowSign, IStashDeveloper}