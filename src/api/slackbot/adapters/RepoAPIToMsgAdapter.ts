import {IBlockMessage} from "../../../templates/builders/elements";
import {IRepoAPI} from "../../admin/RepoAPI";
import IMsgBuilder from "../../../templates/builders/IBuilder";
import buildReposList from "../../../templates/common/buildReposList";


type ButtonText = 'Select' | 'Delete';
type Command = 'select' | 'deleteRepo';

interface IRepoAPIToMsgAdapter {
    getReposListMsg(buttonText: ButtonText, command: Command): Promise<IBlockMessage>;
    getAddResultMsg(obj: {reponame: string, addedByName: string}): Promise<IBlockMessage>;
}

export default class RepoAPIToMsgAdapter implements IRepoAPIToMsgAdapter {
    private api: IRepoAPI;
    private builder: IMsgBuilder;

    constructor(api: IRepoAPI, builder: IMsgBuilder) {
        this.api = api;
        this.builder = builder;
    }

    async getReposListMsg(btnText: ButtonText ='Select', command: Command ='select'): Promise<IBlockMessage> {
        const repos = await this.api.list();
        if (repos.length === 0) {
            const emptyReposMsg = "You don't have added repositories yet. To add them please use command /add_repo";
            return this.builder.buildSection(emptyReposMsg).getMsg();
        } else {
            return buildReposList(this.builder, repos, btnText, command);
        }
    }

    async getAddResultMsg(obj: {reponame: string, addedByName: string}): Promise<IBlockMessage> {
        const {reponame} = obj;
        if (reponame.length !== 0) {
            const addOperationSuccess = await this.api.add(obj);
            if (addOperationSuccess) {
                this.builder.buildSection(`You have added new repository ${reponame}`);
            } else {
                this.builder.buildSection(`DB Error has been occurred`);
            }
        } else {
            this.builder.buildSection(`Incorrect reponame ${reponame}`);
        }
        return this.builder.getMsg();
    }
}