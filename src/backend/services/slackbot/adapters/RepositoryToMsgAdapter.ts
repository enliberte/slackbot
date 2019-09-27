import {IBlockMessage} from "../templates/builders/elements";
import {IRepositoryService} from "../../admin/RepositoryService";
import IMessageBuilder, {IButtonProps} from "../templates/builders/IBuilder";
import buildReposList from "../templates/common/buildRepositoriesList";
import {IRepository} from "../../../db/models/RepositoryModel";


export interface IRepositoryToMessageAdapter {
    getReposListMsg(builder: IMessageBuilder, channelId: string, button: IButtonProps): Promise<IBlockMessage>;
    getAddResultMsg(builder: IMessageBuilder, obj: IRepository): Promise<IBlockMessage>;
}

export default class RepositoryToMsgAdapter implements IRepositoryToMessageAdapter {
    private repositoryService: IRepositoryService;

    constructor(repositoryService: IRepositoryService) {
        this.repositoryService = repositoryService;
    }

    async getReposListMsg(builder: IMessageBuilder, channelId: string, button: IButtonProps): Promise<IBlockMessage> {
        const repos = await this.repositoryService.list(channelId);
        if (repos.length === 0) {
            const emptyReposMsg = "You don't have added repositories yet. To add them please use command /add_repository";
            return builder.buildSection(emptyReposMsg).getMessage();
        } else {
            return buildReposList(builder, repos, button);
        }
    }

    async getAddResultMsg(builder: IMessageBuilder, obj: IRepository): Promise<IBlockMessage> {
        if (obj.reponame.length !== 0) {
            const addOperationSuccess = await this.repositoryService.add(obj);
            if (addOperationSuccess) {
                builder.buildSection(`You have added new repository ${obj.reponame}`);
            } else {
                builder.buildSection(`DB Error has been occurred`);
            }
        } else {
            builder.buildSection(`Incorrect reponame ${obj.reponame}`);
        }
        return builder.getMessage();
    }
}