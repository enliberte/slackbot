const BaseAPI = require('./BaseAPI');
const DBController = require('./../db/controller');
const SubscribeController = require('./../db/models/subscribeModel');
const UserController = require('./../db/models/userModel');
const {addUsersList} = require('./../templates/subscribe');


class UserAPI extends BaseAPI {
    constructor(channelId, res=undefined, respond=undefined) {
        super(channelId, res, respond);
        this.userDB = new DBController(UserController);
        this.subscribeDB = new DBController(SubscribeController);
    }

    async list(reponame) {
        try {
            const channelId = this.channelId;
            const emptyUsersMsg = "You don't have added users yet. To add them please use command /add_user";
            let users = await this.userDB.get({channelId});
            if (reponame) {
                const followedUsers = await this.subscribeDB.get({channelId, reponame});
                const followedUserNames = followedUsers.map(user => user.followed);
                users = users.map(user => ({...user, isFollowed: followedUserNames.indexOf(user.username) !== -1}));
            }
            const msg = users.length === 0 ? {text: emptyUsersMsg} : {blocks: addUsersList(users, reponame)};
            await this.post(msg);
        } catch (e) {
            console.log(e);
        }
    }

    async add(obj) {
        const {username} = obj;
        if (username.length !== 0) {
            const channelId = this.channelId;
            const err = await this.userDB.add({...obj, channelId});
            const msgText = err ? 'insert into db failed' : `You have added new user ${username}`;
            await this.post({text: msgText});
        } else {
            await this.post({text: `Incorrect username ${username}`});
        }
    }

    async delete(obj) {
        const {username} = obj;
        await this.userDB.remove(obj);
        await this.subscribeDB.remove({username});
        await this.list(null);
    }
}

module.exports = UserAPI;