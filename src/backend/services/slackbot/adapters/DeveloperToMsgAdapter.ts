import {IBlockMessage} from '../templates/builders/elements';
import IMessageBuilder from "../templates/builders/IBuilder";
import {IDeveloperService} from "../../admin/DeveloperService";
import buildDevelopersList from "../templates/common/buildDevelopersList";
import {INewFavoriteDeveloper} from "../../../db/models/developer/favorite/FavoriteDeveloperModel";


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
        if (obj.username.length !== 0) {
            const addOperationSuccess = await this.developerService.add(obj);
            if (addOperationSuccess) {
                builder.buildSection(`You have added new developer ${obj.username}`);
            } else {
                builder.buildSection(`DB Error has been occurred`);
            }
        } else {
            builder.buildSection(`Incorrect developer name ${obj.username}`);
        }
        return builder.getMessage();
    }
}