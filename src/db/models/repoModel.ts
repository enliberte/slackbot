import {Schema, Document, model, Model} from 'mongoose';

interface IRepo {
    channelId?: string;
    addedByName?: string;
    reponame?: string;
}

interface IRepoRequired extends IRepo {
    channelId: string;
    addedByName: string;
    reponame: string;
}

interface IRepoModel extends Document, IRepoRequired {}

const repoSchema: Schema = new Schema({
    channelId: String,
    addedByName: String,
    reponame: String
});

const RepoModel: Model<IRepoModel> = model<IRepoModel>('Repo', repoSchema);

export {IRepo, IRepoRequired, IRepoModel, RepoModel}