const mongoose = require('mongoose');
const BaseController = require('./baseController');


const subscribeSchema = new mongoose.Schema({
    channelId: String,
    followed: String,
    follower: String,
    reponame: String
});

const Subscribe = mongoose.model('Subscribe', subscribeSchema);

class SubscribeController extends BaseController {
    constructor() {
        super(Subscribe);
    }

    async get(filter) {
        const query = await this.model.find(filter).sort({reponame: 1});
        return query.exec();
    }
}


module.exports = SubscribeController;