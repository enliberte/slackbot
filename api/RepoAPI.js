const DBController = require('./../db/controller');
const SubscribeController = require('./../db/models/subscribeModel');
const RepoController = require('./../db/models/repoModel');
const {addReposList} = require('./../templates/subscribe');


class RepoAPI {
    constructor(channelId) {
        this.channelId = channelId;
        this.repoDB = new DBController(RepoController);
        this.subscribeDB = new DBController(SubscribeController);
    }

    async list(buttonText='Select', command='select') {
        try {
            const channelId = this.channelId;
            const emptyReposMsg = "You don't have added repositories yet. To add them please use command /add_repo";
            const repos = await this.repoDB.get({channelId});
            return repos.length === 0 ? {text: emptyReposMsg} : {blocks: addReposList(repos, buttonText, command)};
        } catch (e) {
            console.log(e);
        }
    }

    async add(obj) {
        const {reponame} = obj;
        let msg;
        if (reponame.length !== 0) {
            const channelId = this.channelId;
            await this.repoDB.add({...obj, channelId});
            msg = {text: `You have added new repository ${reponame}`};
        } else {
            msg = {text: `Incorrect reponame ${reponame}`};
        }
        return msg;
    }

    async delete(obj) {
        const {reponame} = obj;
        await this.repoDB.remove(obj);
        await this.subscribeDB.remove({reponame});
    }
}

module.exports = RepoAPI;