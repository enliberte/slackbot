import {IBlockMessage} from "../../../templates/builders/elements";
import {IRepoAPI} from "../../admin/RepoAPI";
import IMsgBuilder, {IButtonProps} from "../../../templates/builders/IBuilder";
import buildReposList from "../../../templates/common/buildReposList";
import {IRepoRequired} from "../../../db/models/repoModel";


export interface IRepoAPIToMsgAdapter {
    getReposListMsg(builder: IMsgBuilder, channelId: string, button: IButtonProps): Promise<IBlockMessage>;
    getAddResultMsg(builder: IMsgBuilder, obj: IRepoRequired): Promise<IBlockMessage>;
}

export default class RepoAPIToMsgAdapter implements IRepoAPIToMsgAdapter {
    private api: IRepoAPI;

    constructor(api: IRepoAPI) {
        this.api = api;
    }

    async getReposListMsg(builder: IMsgBuilder, channelId: string, button: IButtonProps): Promise<IBlockMessage> {
        const repos = await this.api.list(channelId);
        if (repos.length === 0) {
            const emptyReposMsg = "You don't have added repositories yet. To add them please use command /add_repo";
            return builder.buildSection(emptyReposMsg).getMsg();
        } else {
            return buildReposList(builder, repos, button);
        }
    }

    async getAddResultMsg(builder: IMsgBuilder, obj: IRepoRequired): Promise<IBlockMessage> {
        if (obj.reponame.length !== 0) {
            const addOperationSuccess = await this.api.add(obj);
            if (addOperationSuccess) {
                builder.buildSection(`You have added new repository ${obj.reponame}`);
            } else {
                builder.buildSection(`DB Error has been occurred`);
            }
        } else {
            builder.buildSection(`Incorrect reponame ${obj.reponame}`);
        }
        return builder.getMsg();
    }
}