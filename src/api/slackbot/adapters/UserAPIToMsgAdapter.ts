import {IBlockMessage} from '../../../templates/builders/elements';
import IMsgBuilder from "../../../templates/builders/IBuilder";
import {IUserAPI} from "../../admin/UserAPI";
import buildUsersList from "../../../templates/common/buildUsersList";


interface IUserAPIToMsgAdapter {
    getUsersListMsg(reponame?: string): Promise<IBlockMessage>;
    getAddResultMsg(obj: {username: string, addedByName: string}): Promise<IBlockMessage>;
}


export default class UserAPIToMsgAdapter implements IUserAPIToMsgAdapter {
    private api: IUserAPI;
    private builder: IMsgBuilder;

    constructor(api: IUserAPI, builder: IMsgBuilder) {
        this.api = api;
        this.builder = builder;
    }

    async getUsersListMsg(reponame?: string) {
        const emptyUsersMsg = "You don't have added users yet. To add them please use command /add_user";
        const users = await this.api.list(reponame);
        if (users.length === 0) {
            return this.builder.buildSection(emptyUsersMsg).getMsg();
        } else {
            return buildUsersList(this.builder, users, reponame);
        }
    }

    async getAddResultMsg(obj: {username: string, addedByName: string}) {
        const {username} = obj;
        if (username.length !== 0) {
            const addOperationSuccess = await this.api.add(obj);
            if (addOperationSuccess) {
                this.builder.buildSection(`You have added new user ${username}`);
            } else {
                this.builder.buildSection(`DB Error has been occurred`);
            }
        } else {
            this.builder.buildSection(`Incorrect username ${username}`);
        }
        return this.builder.getMsg();
    }
}