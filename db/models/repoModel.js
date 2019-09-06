const mongoose = require('mongoose');
const BaseController = require('./baseController');

const repoSchema = new mongoose.Schema({
    channelId: String,
    addedByName: String,
    reponame: String
});

const Repo = mongoose.model('Repo', repoSchema);

class RepoController extends BaseController {
    constructor() {
        super(Repo);
    }

    async get(filter) {
        return await this.model.find(filter).sort({reponame: 1});
    }
}

module.exports = RepoController;
