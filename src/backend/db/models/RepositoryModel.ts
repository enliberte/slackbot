import {Schema, Document, model, Model} from 'mongoose';


interface IRepository {
    channelId: string;
    addedByName: string;
    reponame: string;
}

interface IRepositoryModel extends Document, IRepository {}

const repositorySchema: Schema = new Schema({
    channelId: String,
    addedByName: String,
    reponame: String
});

const RepositoryModel: Model<IRepositoryModel> = model<IRepositoryModel>('Repo', repositorySchema);

export {IRepository, IRepositoryModel, RepositoryModel}