import {IUser, IUserWithFollowSign} from "../../db/models/UserModel";
import {IUserStorageService} from "../../db/storageServices/UserStorageService";
import {ISubscribeStorageService} from "../../db/storageServices/SubscribeStorageService";


export interface IUserService {
    list(channelId: string, reponame?: string): Promise<IUserWithFollowSign[]>;
    add(obj: IUser): Promise<boolean>;
    delete(obj: {channelId: string, username: string}): Promise<boolean>;
}


export default class UserService implements IUserService {
    private userStorageService: IUserStorageService;
    private subscribeStorageService: ISubscribeStorageService;

    constructor(userStorageService: IUserStorageService, subscribeStorageService: ISubscribeStorageService) {
        this.userStorageService = userStorageService;
        this.subscribeStorageService = subscribeStorageService;
    }

    private async getUsersWithFollowSign(users: IUser[], channelId: string, reponame: string): Promise<IUserWithFollowSign[]> {
        const followedUsers = await this.subscribeStorageService.get({channelId, reponame});
        const followedUserNames = followedUsers.map(user => user.followed);
        return users.map(user => ({...user, isFollowed: followedUserNames.indexOf(user.username) !== -1}));
    }

    async list(channelId: string, reponame?: string): Promise<IUserWithFollowSign[]> {
        let users = await this.userStorageService.get({channelId});
        if (reponame) {
            users = await this.getUsersWithFollowSign(users, channelId, reponame);
        }
        return users;
    }

    async add(obj: IUser): Promise<boolean> {
        if (obj.username.length !== 0) {
            return this.userStorageService.add(obj);
        } else {
            return false;
        }
    }

    async delete(obj: {channelId: string, username: string}): Promise<boolean> {
        const {username, channelId} = obj;
        const userRemovingOperationResult = await this.userStorageService.remove(obj);
        const subscribeRemovingOperationResult = await this.subscribeStorageService.remove({followed: username, channelId});
        return userRemovingOperationResult && subscribeRemovingOperationResult;
    }
}