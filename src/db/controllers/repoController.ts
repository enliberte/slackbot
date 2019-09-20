import {IRepoModel, IRepo, RepoModel, IRepoRequired} from '../models/repoModel';
import BaseController, {IDBController} from './baseController';

export interface IRepoController extends IDBController<IRepo, IRepoRequired> {}

class RepoController extends BaseController<IRepoModel, IRepo, IRepoRequired> implements IRepoController {
    constructor() {
        super(RepoModel);
    }

    async get(filter: IRepo): Promise<IRepoRequired[]> {
        const docs = await this.model.find(filter).sort({reponame: 1}).exec();
        return docs.map(doc => ({reponame: doc.reponame, addedByName: doc.addedByName, channelId: doc.channelId}));
    }
}

export default RepoController;