import {IRepo, IRepoRequired} from "../../db/models/repoModel";
import {IDBController} from "../../db/controllers/baseController";
import {ISubscribe, ISubscribeRequired} from "../../db/models/subscribeModel";


export interface IRepoAPI {
    list(): Promise<IRepoRequired[]>;
    add(obj: {reponame: string, addedByName: string}): Promise<boolean>;
    delete(obj: {reponame: string}): Promise<boolean>;
}

export default class RepoAPI implements IRepoAPI {
    readonly channelId: string;
    private repoDB: IDBController<IRepo, IRepoRequired>;
    private subscribeDB: IDBController<ISubscribe, ISubscribeRequired>;

    constructor(
        channelId: string,
        repoDB: IDBController<IRepo, IRepoRequired>,
        subscribeDB: IDBController<ISubscribe, ISubscribeRequired>
    ) {
        this.channelId = channelId;
        this.repoDB = repoDB;
        this.subscribeDB = subscribeDB;
    }

    async list(): Promise<IRepoRequired[]> {
        const channelId = this.channelId;
        return this.repoDB.get({channelId});
    }

    async add(obj: {reponame: string, addedByName: string}): Promise<boolean> {
        const {reponame} = obj;
        if (reponame.length !== 0) {
            const channelId = this.channelId;
            return this.repoDB.add({...obj, channelId});
        } else {
            return false;
        }
    }

    async delete(obj: {reponame: string}) {
        const channelId = this.channelId;
        const {reponame} = obj;
        const repoRemovingOperationResult = await this.repoDB.remove({channelId, reponame});
        const subscribeRemovingOperationResult = await this.subscribeDB.remove({channelId, reponame});
        return repoRemovingOperationResult && subscribeRemovingOperationResult;
    }
}