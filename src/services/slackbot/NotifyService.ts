import {IWebChatAdapter} from "./adapters/WebChatAdapter";
import {ISubscribeController} from "../../db/storageServices/SubscribeStorageService";


export interface IStashPullRequestAttachment {
    fallback: string;
    author_name: string;
}

export interface IStashPullRequestBody {
    attachments: IStashPullRequestAttachment[];
}

export interface INotifyService {
    notifyAboutPR(data: IStashPullRequestBody): Promise<void>;
}

class NotifyService implements INotifyService {
    protected webChatAdapter: IWebChatAdapter;
    protected subscribeDB: ISubscribeController;

    constructor(webChatAdapter: IWebChatAdapter, subscribeDB: ISubscribeController) {
        this.webChatAdapter = webChatAdapter;
        this.subscribeDB = subscribeDB;
    }

    private async getSubscribersChannelId(followed: string, reponame: string): Promise<string[]> {
        const subscribes = await this.subscribeDB.get({followed, reponame});
        return subscribes.map(subscribe => subscribe.channelId);
    }

    private async notify(subscribersChannelId: string[], data: any): Promise<void> {
        subscribersChannelId.map(async channelId => {
            await this.webChatAdapter.post({text: 'New pull request', ...data, channelId})
        });
    }

    async notifyAboutPR(data: IStashPullRequestBody): Promise<void> {
        const {fallback, author_name: followed} = data.attachments[0];
        if (fallback && followed) {
            const result = fallback.match(/<(.*)\/pull-requests/);
            if (result) {
                const reponame = result[1];
                const subscribersChannelId = await this.getSubscribersChannelId(followed, reponame);
                await this.notify(subscribersChannelId, data);
            }
        }
    };
}

export default NotifyService;