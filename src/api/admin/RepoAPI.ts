import {IRepoRequired} from "../../db/models/repoModel";
import {IRepoController} from "../../db/controllers/repoController";
import {ISubscribeController} from "../../db/controllers/subscribeController";


export interface IRepoAPI {
    list(channelId: string): Promise<IRepoRequired[]>;
    add(obj: IRepoRequired): Promise<boolean>;
    delete(obj: {channelId: string, reponame: string}): Promise<boolean>;
}

export default class RepoAPI implements IRepoAPI {
    private repoDB: IRepoController;
    private subscribeDB: ISubscribeController;

    constructor(repoDB: IRepoController, subscribeDB: ISubscribeController) {
        this.repoDB = repoDB;
        this.subscribeDB = subscribeDB;
    }

    async list(channelId: string): Promise<IRepoRequired[]> {
        return this.repoDB.get({channelId});
    }

    async add(obj: IRepoRequired): Promise<boolean> {
        if (obj.reponame.length !== 0) {
            return this.repoDB.add(obj);
        } else {
            return false;
        }
    }

    async delete(obj: {channelId: string, reponame: string}) {
        const repoRemovingOperationResult = await this.repoDB.remove(obj);
        const subscribeRemovingOperationResult = await this.subscribeDB.remove(obj);
        return repoRemovingOperationResult && subscribeRemovingOperationResult;
    }
}