const {BaseAPI} = require('./base');
const {DBController, RepoController, SubscribeController} = require('./../db');
const {addReposList} = require('./../templates/subscribe');


class RepoAPI extends BaseAPI {
    constructor(channelId, res, respond) {
        super(channelId, res, respond);
        this.repoDB = new DBController(RepoController);
        this.subscribeDB = new DBController(SubscribeController);
    }

    async list(buttonText='Select', command='select') {
        try {
            const emptyReposMsg = "You don't have added repositories yet. To add them please use command /add_repo";
            const repos = await this.repoDB.get(this.channelId);
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
            const err = await this.repoDB.add({...obj, channelId});
            const msgText = err ? 'insert into db failed' : `You have added new repository ${reponame}`;
            await this.post({text: msgText});
        } else {
            await this.post({text: `Incorrect reponame ${reponame}`});
        }
    }

    async delete(obj) {
        const {reponame} = obj;
        await this.repoDB.remove(obj);
        await this.subscribeDB.remove({reponame});
        await this.list('Delete', 'deleteRepo');
    }
}

module.exports = RepoAPI;