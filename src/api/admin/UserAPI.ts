import {IUserRequired, IUserWithFollowSign} from "../../db/models/userModel";
import {IUserController} from "../../db/controllers/userController";
import {ISubscribeController} from "../../db/controllers/subscribeController";


export interface IUserAPI {
    list(channelId: string, reponame?: string): Promise<IUserWithFollowSign[]>;
    add(obj: IUserRequired): Promise<boolean>;
    delete(obj: {channelId: string, username: string}): Promise<boolean>;
}


export default class UserAPI implements IUserAPI {
    private userDB: IUserController;
    private subscribeDB: ISubscribeController;

    constructor(userDB: IUserController, subscribeDB: ISubscribeController) {
        this.userDB = userDB;
        this.subscribeDB = subscribeDB;
    }

    private async getUsersWithFollowSign(users: IUserRequired[], channelId: string, reponame: string): Promise<IUserWithFollowSign[]> {
        const followedUsers = await this.subscribeDB.get({channelId, reponame});
        const followedUserNames = followedUsers.map(user => user.followed);
        return users.map(user => ({...user, isFollowed: followedUserNames.indexOf(user.username) !== -1}));
    }

    async list(channelId: string, reponame?: string): Promise<IUserWithFollowSign[]> {
        let users = await this.userDB.get({channelId});
        if (reponame) {
            users = await this.getUsersWithFollowSign(users, channelId, reponame);
        }
        return users;
    }

    async add(obj: IUserRequired): Promise<boolean> {
        if (obj.username.length !== 0) {
            return this.userDB.add(obj);
        } else {
            return false;
        }
    }

    async delete(obj: {channelId: string, username: string}): Promise<boolean> {
        const {username, channelId} = obj;
        const userRemovingOperationResult = await this.userDB.remove(obj);
        const subscribeRemovingOperationResult = await this.subscribeDB.remove({followed: username, channelId});
        return userRemovingOperationResult && subscribeRemovingOperationResult;
    }
}