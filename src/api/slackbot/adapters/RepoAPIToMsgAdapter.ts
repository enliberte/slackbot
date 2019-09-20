import {IBlockMessage} from "../../../templates/builders/elements";
import {IRepoAPI} from "../../admin/RepoAPI";
import IMsgBuilder, {IButtonProps} from "../../../templates/builders/IBuilder";
import buildReposList from "../../../templates/common/buildReposList";
import {IRepoRequired} from "../../../db/models/repoModel";


export interface IRepoAPIToMsgAdapter {
    getReposListMsg(channelId: string, button: IButtonProps): Promise<IBlockMessage>;
    getAddResultMsg(obj: IRepoRequired): Promise<IBlockMessage>;
}

export default class RepoAPIToMsgAdapter implements IRepoAPIToMsgAdapter {
    private api: IRepoAPI;
    private builder: IMsgBuilder;

    constructor(api: IRepoAPI, builder: IMsgBuilder) {
        this.api = api;
        this.builder = builder;
    }

    async getReposListMsg(channelId: string, button: IButtonProps): Promise<IBlockMessage> {
        const repos = await this.api.list(channelId);
        if (repos.length === 0) {
            const emptyReposMsg = "You don't have added repositories yet. To add them please use command /add_repo";
            return this.builder.buildSection(emptyReposMsg).getMsg();
        } else {
            return buildReposList(this.builder, repos, button);
        }
    }

    async getAddResultMsg(obj: IRepoRequired): Promise<IBlockMessage> {
        if (obj.reponame.length !== 0) {
            const addOperationSuccess = await this.api.add(obj);
            if (addOperationSuccess) {
                this.builder.buildSection(`You have added new repository ${obj.reponame}`);
            } else {
                this.builder.buildSection(`DB Error has been occurred`);
            }
        } else {
            this.builder.buildSection(`Incorrect reponame ${obj.reponame}`);
        }
        return this.builder.getMsg();
    }
}