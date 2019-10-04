import {Schema, Document, model, Model} from 'mongoose';


interface IRepository {
    channelId: string;
    addedByName: string;
    reponame: string;
}

interface IStashRepository {
    name: string;
    links: {
        self: {href: string}[];
    }
}

interface IStashRepositoryWithFavoriteSign extends IStashRepository {
    isFavorite: boolean;
}

interface IRepositoryModel extends Document, IRepository {}

const repositorySchema: Schema = new Schema({
    channelId: {type: String, index: true},
    addedByName: {type: String, index: true},
    reponame: {type: String, index: true}
});

const RepositoryModel: Model<IRepositoryModel> = model<IRepositoryModel>('Repo', repositorySchema);

export {IRepository, IRepositoryModel, RepositoryModel, IStashRepository, IStashRepositoryWithFavoriteSign}