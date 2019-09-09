const DBController = require('./../db/controller');
const SubscribeController = require('./../db/models/subscribeModel');
const UserController = require('./../db/models/userModel');
const {addUsersList} = require('./../templates/subscribe');


class UserAPI {
    constructor(channelId) {
        this.channelId = channelId;
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
                for (let user of users) {
                    user.isFollowed = followedUserNames.indexOf(user.username) !== -1
                }
            }
            return users.length === 0 ? {text: emptyUsersMsg} : {blocks: addUsersList(users, reponame)};
        } catch (e) {
            console.log(e);
        }
    }

    async add(obj) {
        let msg;
        const {username} = obj;
        if (username.length !== 0) {
            const channelId = this.channelId;
            await this.userDB.add({...obj, channelId});
            msg = {text: `You have added new user ${username}`};
        } else {
            msg = {text: `Incorrect username ${username}`};
        }
        return msg;
    }

    async delete(obj) {
        const {username} = obj;
        await this.userDB.remove(obj);
        await this.subscribeDB.remove({username});
    }
}

module.exports = UserAPI;