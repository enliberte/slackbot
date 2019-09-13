import {IRepoModel, IRepo, RepoModel, IRepoRequired} from '../models/repoModel';
import BaseController from './baseController';

class RepoController extends BaseController<IRepoModel, IRepo, IRepoRequired> {
    constructor() {
        super(RepoModel);
    }

    get(filter: IRepo) {
        return this.model.find(filter).sort({reponame: 1}).exec();
    }
}

export default RepoController;