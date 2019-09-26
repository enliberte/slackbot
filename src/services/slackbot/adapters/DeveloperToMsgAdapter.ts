import {IBlockMessage} from '../templates/builders/elements';
import IMessageBuilder from "../templates/builders/IBuilder";
import {IDeveloperService} from "../../admin/DeveloperService";
import buildDevelopersList from "../templates/common/buildDevelopersList";
import {IDeveloper} from "../../../db/models/DeveloperModel";


export interface IDeveloperToMessageAdapter {
    getDevelopersListMsg(builder: IMessageBuilder, channelId: string, reponame?: string): Promise<IBlockMessage>;
    getAddResultMsg(builder: IMessageBuilder, obj: IDeveloper): Promise<IBlockMessage>;
}


export default class DeveloperToMsgAdapter implements IDeveloperToMessageAdapter {
    private developerService: IDeveloperService;

    constructor(developerService: IDeveloperService) {
        this.developerService = developerService;
    }

    async getDevelopersListMsg(builder: IMessageBuilder, channelId: string, reponame?: string) {
        const emptyDevelopersMsg = "You don't have added developers yet. To add them please use command /add_developer";
        const users = await this.userService.list(channelId, reponame);
        if (users.length === 0) {
            return builder.buildSection(emptyDevelopersMsg).getMessage();
        } else {
            return buildDevelopersList(builder, users, reponame);
        }
    }

    async getAddResultMsg(builder: IMessageBuilder, obj: IDeveloper) {
        if (obj.username.length !== 0) {
            const addOperationSuccess = await this.userService.add(obj);
            if (addOperationSuccess) {
                builder.buildSection(`You have added new user ${obj.username}`);
            } else {
                builder.buildSection(`DB Error has been occurred`);
            }
        } else {
            builder.buildSection(`Incorrect username ${obj.username}`);
        }
        return builder.getMessage();
    }
}