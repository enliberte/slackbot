import SubscribeController from '../db/controllers/subscribeController';
import RepoController from '../db/controllers/repoController';
import DirectorMsgBuilder from "../templates/director";
import MsgBuilder from "../templates/builders/MsgBuilder";
import {IBlockMessage} from "../templates/builders/elements";


type ButtonText = 'Select' | 'Delete';
type Command = 'select' | 'deleteRepo';

interface IRepoAPI {
    list(buttonText: ButtonText, command: Command): Promise<IBlockMessage>;
    add(obj: {reponame: string, addedByName: string}): Promise<IBlockMessage>;
    delete(obj: {reponame: string}): Promise<void>;
}

class RepoAPI implements IRepoAPI {
    readonly channelId: string;
    private repoDB: RepoController;
    private subscribeDB: SubscribeController;

    constructor(channelId: string) {
        this.channelId = channelId;
        this.repoDB = new RepoController();
        this.subscribeDB = new SubscribeController();
    }

    async list(btnText: ButtonText ='Select', command: Command ='select') {
        const builder = new MsgBuilder();
        const channelId = this.channelId;
        const repos = await this.repoDB.get({channelId});
        if (repos.length === 0) {
            const emptyReposMsg = "You don't have added repositories yet. To add them please use command /add_repo";
            builder.buildSection(emptyReposMsg);
        } else {
            const director = new DirectorMsgBuilder(builder);
            director.buildReposList(repos, btnText, command);
        }
        return builder.getMsg();
    }

    async add(obj: {reponame: string, addedByName: string}) {
        const {reponame} = obj;
        const builder = new MsgBuilder();
        if (reponame.length !== 0) {
            const channelId = this.channelId;
            await this.repoDB.add({...obj, channelId});
            builder.buildSection(`You have added new repository ${reponame}`);
        } else {
            builder.buildSection(`Incorrect reponame ${reponame}`);
        }
        return builder.getMsg();
    }

    async delete(obj: {reponame: string}) {
        const channelId = this.channelId;
        const {reponame} = obj;
        await this.repoDB.remove({channelId, reponame});
        await this.subscribeDB.remove({channelId, reponame});
    }
}

export default RepoAPI;