import {IBlockMessage} from "../templates/builders/elements";
import {IRepositoryService} from "../../admin/RepositoryService";
import IMessageBuilder from "../templates/builders/IBuilder";
import buildReposList from "../templates/common/buildRepositoriesList";
import {INewFavoriteRepository} from "../../../db/models/repository/favorite/FavoriteRepositoryModel";
import EM from "../../ServiceErrorMessages";


export interface IRepositoryToMessageAdapter {
    getReposListMsg(builder: IMessageBuilder, channelId: string): Promise<IBlockMessage>;
    getAddResultMsg(builder: IMessageBuilder, obj: INewFavoriteRepository): Promise<IBlockMessage>;
}

export default class RepositoryToMsgAdapter implements IRepositoryToMessageAdapter {
    private repositoryService: IRepositoryService;

    constructor(repositoryService: IRepositoryService) {
        this.repositoryService = repositoryService;
    }

    async getReposListMsg(builder: IMessageBuilder, channelId: string): Promise<IBlockMessage> {
        const repos = await this.repositoryService.list({filter: {channelId}});
        if (repos.length === 0) {
            const emptyReposMsg = "You don't have added repositories yet. To add them please use command /add_repository";
            return builder.buildSection(emptyReposMsg).getMessage();
        } else {
            return buildReposList(builder, repos);
        }
    }

    async getAddResultMsg(builder: IMessageBuilder, obj: INewFavoriteRepository): Promise<IBlockMessage> {
        if (obj.reponame) {
            const addOperationSuccess = await this.repositoryService.add(obj);
            if (typeof addOperationSuccess !== 'string') {
                builder.buildSection(`You have added new repository ${obj.reponame}`);
            } else {
                builder.buildSection(addOperationSuccess);
            }
        } else {
            builder.buildSection(EM.REPOSITORY_NOT_GIVEN);
        }
        return builder.getMessage();
    }
}