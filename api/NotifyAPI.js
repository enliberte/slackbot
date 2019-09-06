const DBController = require('./../db/controller');
const SubscribeController = require('./../db/models/subscribeModel');
const {WebClient} = require('@slack/web-api');
const {BOT_TOKEN} = require('./../config');

class NotifyAPI {
    constructor() {
        this.web = new WebClient(BOT_TOKEN);
        this.subscribeDB = new DBController(SubscribeController);
    }

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

module.exports = NotifyAPI;