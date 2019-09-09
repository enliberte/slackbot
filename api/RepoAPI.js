const BaseAPI = require('./BaseAPI');
const DBController = require('./../db/controller');
const SubscribeController = require('./../db/models/subscribeModel');
const RepoController = require('./../db/models/repoModel');
const {addReposList} = require('./../templates/subscribe');


class RepoAPI extends BaseAPI {
    constructor(channelId, res=undefined, respond=undefined) {
        super(channelId, res, respond);
        this.repoDB = new DBController(RepoController);
        this.subscribeDB = new DBController(SubscribeController);
    }

    async list(buttonText='Select', command='select') {
        try {
            const channelId = this.channelId;
            const emptyReposMsg = "You don't have added repositories yet. To add them please use command /add_repo";
            const repos = await this.repoDB.get({channelId});
            const msg = repos.length === 0 ? {text: emptyReposMsg} : {blocks: addReposList(repos, buttonText, command)};
            await this.post(msg);
        } catch (e) {
            console.log(e);
        }
    }

    async add(obj) {
        const {reponame} = obj;
        if (reponame.length !== 0) {
            const channelId = this.channelId;
            await this.repoDB.add({...obj, channelId});
            await this.post({text: `You have added new repository ${reponame}`});
        } else {
            await this.post({text: `Incorrect reponame ${reponame}`});
        }
    }

    async delete(obj) {
        const {reponame} = obj;
        await this.repoDB.remove(obj);
        await this.subscribeDB.remove({reponame});
    }
}

module.exports = RepoAPI;