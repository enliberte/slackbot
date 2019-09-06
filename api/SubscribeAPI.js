const BaseAPI = require('./BaseAPI');
const DBController = require('./../db/controller');
const SubscribeController = require('./../db/models/subscribeModel');
const UserAPI = require('./UserAPI');


class SubscribeAPI extends BaseAPI {
    constructor(channelId, respond) {
        super(channelId, null, respond);
        this.subscribeDB = new DBController(SubscribeController);
    }

    async subscribe (obj) {
        const channelId = this.channelId;
        await this.subscribeDB.add({channelId, ...obj});
        await new UserAPI(channelId, null, this.respond).list(obj.reponame);
    };

    async unsubscribe (obj) {
        const channelId = this.channelId;
        await this.subscribeDB.remove({channelId, ...obj});
        await new UserAPI(channelId, null, this.respond).list(obj.reponame);
    };

    async notifyAboutPR (data) {
        const {fallback, author_name: followed} = data.attachments[0];
        if (fallback && followed) {
            const result = fallback.match(/<(.*)\/pull-requests/);
            if (result) {
                const reponame = result[1];
                const subscribes = await this.subscribeDB.get({followed, reponame});
                subscribes.map(async subscribe => {
                    await this.web.chat.postMessage({text: 'Added new Pull request', ...data, channel: subscribe.channelId})
                });
            }
        }
    };
}

module.exports = SubscribeAPI;