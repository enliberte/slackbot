import {IUser, IUserRequired, IUserWithFollowSign} from "../../db/models/userModel";
import {IDBController} from "../../db/controllers/baseController";
import {ISubscribe, ISubscribeRequired} from "../../db/models/subscribeModel";


export interface IUserAPI {
    list(reponame?: string): Promise<IUserWithFollowSign[]>;
    add(obj: {username: string, addedByName: string}): Promise<boolean>;
    delete(obj: IUserRequired): Promise<boolean>;
}


export default class UserAPI implements IUserAPI {
    readonly channelId: string;
    private userDB: IDBController<IUser, IUserRequired>;
    private subscribeDB: IDBController<ISubscribe, ISubscribeRequired>;

    constructor(
        channelId: string,
        userDB: IDBController<IUser, IUserRequired>,
        subscribeDB: IDBController<ISubscribe, ISubscribeRequired>
    ) {
        this.channelId = channelId;
        this.userDB = userDB;
        this.subscribeDB = subscribeDB;
    }

    private async getUsersWithFollowSign(users: IUserRequired[], channelId: string, reponame: string): Promise<IUserWithFollowSign[]> {
        const followedUsers = await this.subscribeDB.get({channelId, reponame});
        const followedUserNames = followedUsers.map(user => user.followed);
        return users.map(user => ({...user, isFollowed: followedUserNames.indexOf(user.username) !== -1}));
    }

    async list(reponame?: string): Promise<IUserWithFollowSign[]> {
        const channelId = this.channelId;
        let users = await this.userDB.get({channelId});
        if (reponame) {
            users = await this.getUsersWithFollowSign(users, channelId, reponame);
        }
        return users;
    }

    async add(obj: {username: string, addedByName: string}): Promise<boolean> {
        const {username} = obj;
        if (username.length !== 0) {
            const channelId = this.channelId;
            return this.userDB.add({...obj, channelId});
        } else {
            return false;
        }
    }

    async delete(obj: {username: string}): Promise<boolean> {
        const {username} = obj;
        const channelId = this.channelId;
        const userRemovingOperationResult = await this.userDB.remove({username, channelId});
        const subscribeRemovingOperationResult = await this.subscribeDB.remove({followed: username, channelId});
        return userRemovingOperationResult && subscribeRemovingOperationResult;
    }
}