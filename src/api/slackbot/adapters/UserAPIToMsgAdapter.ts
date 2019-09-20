import {IBlockMessage} from '../../../templates/builders/elements';
import IMsgBuilder from "../../../templates/builders/IBuilder";
import {IUserAPI} from "../../admin/UserAPI";
import buildUsersList from "../../../templates/common/buildUsersList";
import {IUserRequired} from "../../../db/models/userModel";


export interface IUserAPIToMsgAdapter {
    getUsersListMsg(builder: IMsgBuilder, channelId: string, reponame?: string): Promise<IBlockMessage>;
    getAddResultMsg(builder: IMsgBuilder, obj: IUserRequired): Promise<IBlockMessage>;
}


export default class UserAPIToMsgAdapter implements IUserAPIToMsgAdapter {
    private api: IUserAPI;

    constructor(api: IUserAPI) {
        this.api = api;
    }

    async getUsersListMsg(builder: IMsgBuilder, channelId: string, reponame?: string) {
        const emptyUsersMsg = "You don't have added users yet. To add them please use command /add_user";
        const users = await this.api.list(channelId, reponame);
        if (users.length === 0) {
            return builder.buildSection(emptyUsersMsg).getMsg();
        } else {
            return buildUsersList(builder, users, reponame);
        }
    }

    async getAddResultMsg(builder: IMsgBuilder, obj: IUserRequired) {
        if (obj.username.length !== 0) {
            const addOperationSuccess = await this.api.add(obj);
            if (addOperationSuccess) {
                builder.buildSection(`You have added new user ${obj.username}`);
            } else {
                builder.buildSection(`DB Error has been occurred`);
            }
        } else {
            builder.buildSection(`Incorrect username ${obj.username}`);
        }
        return builder.getMsg();
    }
}