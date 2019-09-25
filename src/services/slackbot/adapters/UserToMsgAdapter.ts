import {IBlockMessage} from '../templates/builders/elements';
import IMessageBuilder from "../templates/builders/IBuilder";
import {IUserService} from "../../admin/UserService";
import buildUsersList from "../templates/common/buildUsersList";
import {IUser} from "../../../db/models/UserModel";


export interface IUserToMessageAdapter {
    getUsersListMsg(builder: IMessageBuilder, channelId: string, reponame?: string): Promise<IBlockMessage>;
    getAddResultMsg(builder: IMessageBuilder, obj: IUser): Promise<IBlockMessage>;
}


export default class UserToMsgAdapter implements IUserToMessageAdapter {
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    async getUsersListMsg(builder: IMessageBuilder, channelId: string, reponame?: string) {
        const emptyUsersMsg = "You don't have added users yet. To add them please use command /add_user";
        const users = await this.userService.list(channelId, reponame);
        if (users.length === 0) {
            return builder.buildSection(emptyUsersMsg).getMessage();
        } else {
            return buildUsersList(builder, users, reponame);
        }
    }

    async getAddResultMsg(builder: IMessageBuilder, obj: IUser) {
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