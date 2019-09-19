import {WebClient} from "@slack/web-api";
import {IDBController} from "../../db/controllers/baseController";
import {ISubscribe, ISubscribeRequired} from "../../db/models/subscribeModel";
const {BOT_TOKEN} = require('../../../config');


interface IStashPullRequestAttachment {
    fallback: string;
    author_name: string;
}


interface IStashPullRequestBody {
    attachments: IStashPullRequestAttachment[];
}


class NotifyAPI {
    protected web: WebClient;
    protected subscribeDB: IDBController<ISubscribe, ISubscribeRequired>;

    constructor(subscribeDB: IDBController<ISubscribe, ISubscribeRequired>) {
        this.web = new WebClient(BOT_TOKEN);
        this.subscribeDB = subscribeDB;
    }

    async notify(subscribersChannelId: string[], data: any): Promise<void> {
        subscribersChannelId.map(async channel => {
            await this.web.chat.postMessage({text: 'New pull request', ...data, channel})
        });
    }

    async notifyAboutPR (data: IStashPullRequestBody): Promise<void> {
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