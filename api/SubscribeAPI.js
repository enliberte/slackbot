const BaseAPI = require('./BaseAPI');
const DBController = require('./../db/controller');
const SubscribeController = require('./../db/models/subscribeModel');


class SubscribeAPI extends BaseAPI {
    constructor(channelId, respond) {
        super(channelId, null, respond);
        this.subscribeDB = new DBController(SubscribeController);
    }

    async subscribe (obj) {
        const channelId = this.channelId;
        await this.subscribeDB.add({channelId, ...obj});
    };

    async unsubscribe (obj) {
        const channelId = this.channelId;
        await this.subscribeDB.remove({channelId, ...obj});
    };
}

module.exports = SubscribeAPI;