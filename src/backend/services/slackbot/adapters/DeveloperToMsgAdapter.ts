import {IBlockMessage} from '../templates/builders/elements';
import IMessageBuilder from "../templates/builders/IBuilder";
import {IDeveloperService} from "../../admin/DeveloperService";
import buildDevelopersList from "../templates/common/buildDevelopersList";
import {INewFavoriteDeveloper} from "../../../db/models/developer/favorite/FavoriteDeveloperModel";
import EM from "../../ServiceErrorMessages";


export interface IDeveloperToMessageAdapter {
    getDevelopersListMsg(builder: IMessageBuilder, channelId: string): Promise<IBlockMessage>;
    getAddResultMsg(builder: IMessageBuilder, obj: INewFavoriteDeveloper): Promise<IBlockMessage>;
}


export default class DeveloperToMsgAdapter implements IDeveloperToMessageAdapter {
    private developerService: IDeveloperService;

    constructor(developerService: IDeveloperService) {
        this.developerService = developerService;
    }

    async getDevelopersListMsg(builder: IMessageBuilder, channelId: string) {
        const emptyDevelopersMsg = "You don't have added developers yet. To add them please use command /add_developer";
        const users = await this.developerService.list({filter: {channelId}});
        if (users.length === 0) {
            return builder.buildSection(emptyDevelopersMsg).getMessage();
        } else {
            return buildDevelopersList(builder, users);
        }
    }

    async getAddResultMsg(builder: IMessageBuilder, obj: INewFavoriteDeveloper) {
        if (obj.username) {
            const addOperationSuccess = await this.developerService.add(obj);
            if (typeof addOperationSuccess !== 'string') {
                builder.buildSection(`You have added new developer ${obj.username}`);
            } else {
                builder.buildSection(addOperationSuccess);
            }
        } else {
            builder.buildSection(EM.DEVELOPER_NOT_GIVEN);
        }
        return builder.getMessage();
    }
}