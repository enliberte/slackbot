import {Schema, Document, model, Model} from 'mongoose';


interface IDeveloper {
    channelId: string;
    addedByName: string;
    username: string;
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

interface IStashDeveloperWithFollowSign extends IStashDeveloper {
    isFollow: boolean;
}

interface IDeveloperModel extends Document, IDeveloper {}

const developerSchema: Schema = new Schema({
    channelId: {type: String, index: true},
    addedByName: {type: String, index: true},
    username: {type: String, index: true}
});

const DeveloperModel: Model<IDeveloperModel> = model('Developer', developerSchema);

export {IDeveloper, IDeveloperModel, DeveloperModel, IStashDeveloper, IStashDeveloperWithFollowSign}