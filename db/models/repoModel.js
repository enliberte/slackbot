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

    get(filter) {
        return this.model.find(filter).sort({reponame: 1}).exec();
    }
}

module.exports = RepoController;
