import SubscribeController from '../db/controllers/subscribeController';
import {WebClient} from "@slack/web-api";
const {BOT_TOKEN} = require('../../config');


interface IStashPullRequestAttachment {
    fallback: string;
    author_name: string;
}


interface IStashPullRequestBody {
    attachments: IStashPullRequestAttachment[];
}


class NotifyAPI {
    protected web: WebClient;
    protected subscribeDB: SubscribeController;

    constructor() {
        this.web = new WebClient(BOT_TOKEN);
        this.subscribeDB = new SubscribeController();
    }

    async notify(subscribersChannelId: string[], data: any) {
        subscribersChannelId.map(async channel => {
            await this.web.chat.postMessage({text: 'New pull request', ...data, channel})
        });
    }

    async notifyAboutPR (data: IStashPullRequestBody) {
        const {fallback, author_name: followed} = data.attachments[0];
        if (fallback && followed) {
            const result = fallback.match(/<(.*)\/pull-requests/);
            if (result) {
                const reponame: string = result[1];
                const subscribes = await this.subscribeDB.get({followed, reponame});
                const subscribersChannelId = subscribes.map(subscribe => subscribe.channelId);
                await this.notify(subscribersChannelId, data);
            }
        }
    };
}

export default NotifyAPI;