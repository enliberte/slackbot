import SubscribeController from '../db/controllers/subscribeController';
import UserController from '../db/controllers/userController';
import {IUserRequired, IUserWithFollowSign} from "../db/models/userModel";
import DirectorMsgBuilder from "../templates/director";
import MsgBuilder from "../templates/builders/MsgBuilder";
import {IBlockMessage} from '../templates/builders/elements';


interface IUserAPI {
    list(reponame?: string): Promise<IBlockMessage>;
    add(obj: {username: string, addedByName: string}): Promise<IBlockMessage>;
    delete(obj: IUserRequired): Promise<void>;
}


class UserAPI implements IUserAPI {
    readonly channelId: string;
    private userDB: UserController;
    private subscribeDB: SubscribeController;

    constructor(channelId: string) {
        this.channelId = channelId;
        this.userDB = new UserController();
        this.subscribeDB = new SubscribeController();
    }

    private async getUsersWithFollowSign(users: IUserRequired[], channelId: string, reponame: string): Promise<IUserWithFollowSign[]> {
        const followedUsers = await this.subscribeDB.get({channelId, reponame});
        const followedUserNames = followedUsers.map(user => user.followed);
        let allUsersWithFollowSign: IUserWithFollowSign[] = [];
        for (let user of users) {
            let userWithFollowSign: IUserWithFollowSign = user;
            userWithFollowSign.isFollowed = followedUserNames.indexOf(user.username) !== -1;
            console.log('--------------------------------------');
            console.log(JSON.stringify(user));
            console.log(JSON.stringify({...user}));
            console.log('--------------------------------------');
            allUsersWithFollowSign.push(userWithFollowSign);
        }
        return allUsersWithFollowSign;
    }

    async list(reponame?: string) {
        const builder = new MsgBuilder();
        const channelId = this.channelId;
        const emptyUsersMsg = "You don't have added users yet. To add them please use command /add_user";
        let users = await this.userDB.get({channelId});
        if (users.length === 0) {
            builder.buildSection(emptyUsersMsg);
        } else {
            const director = new DirectorMsgBuilder(builder);
            if (reponame) {
                const usersWithFollowSign = await this.getUsersWithFollowSign(users, channelId, reponame);
                console.log('------------------------------------------');
                console.log('FOLLOWED USERS');
                console.log(JSON.stringify(usersWithFollowSign));
                console.log('------------------------------------------');
                director.buildUsersList(usersWithFollowSign, reponame);
            } else {
                director.buildUsersList(users);
            }
        }
        return builder.getMsg();
    }

    async add(obj: {username: string, addedByName: string}) {
        const builder = new MsgBuilder();
        const {username} = obj;
        if (username.length !== 0) {
            const channelId = this.channelId;
            await this.userDB.add({...obj, channelId});
            builder.buildSection(`You have added new user ${username}`);
        } else {
            builder.buildSection(`Incorrect username ${username}`);
        }
        return builder.getMsg();
    }

    async delete(obj: {username: string}) {
        const {username} = obj;
        const channelId = this.channelId;
        await this.userDB.remove({username, channelId});
        await this.subscribeDB.remove({followed: username, channelId});
    }
}

export default UserAPI;