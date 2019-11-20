import {IChat} from "./adapters/WebChatAdapter";
import {ISubscribeStorageService} from "../../db/storageServices/SubscribeStorageService";
import {IUserStorageService} from "../../db/storageServices/UserStorageService";
import crypto from "crypto";


interface IStashField {
    title: string;
    value: string;
    text: string;
}

export interface IStashPullRequestAttachment {
    fallback: string;
    text: string;
    author_name: string;
    fields: IStashField[];
}

export interface IStashPullRequestBody {
    attachments: IStashPullRequestAttachment[];
}

export interface INotifyService {
    notify(data: IStashPullRequestBody): Promise<void>;
}

class NotifyService implements INotifyService {
    protected webChatAdapter: IChat;
    protected subscribeStorageService: ISubscribeStorageService;
    protected userStorageService: IUserStorageService;
    protected PR: {[key: string]: Set<string>};
    protected deleteChannelIdTimeout: number;

    constructor(webChatAdapter: IChat, subscribeStorageService: ISubscribeStorageService, userStorageService: IUserStorageService) {
        this.webChatAdapter = webChatAdapter;
        this.subscribeStorageService = subscribeStorageService;
        this.userStorageService = userStorageService;
        this.PR = {};
        this.deleteChannelIdTimeout = 5 * 60 * 1000;
    }

    private async addSubscribersChannelId(PRid: string, followed: string, repoUrl: string): Promise<void> {
        const subscribes = await this.subscribeStorageService.get({followed, repoUrl});
        const subscribersChannelId = subscribes.map(subscribe => subscribe.channelId);
        for (let channelId of subscribersChannelId) {
            const users = await this.userStorageService.get({channelId, subscribesNotifications: true});
            if (users.length !== 0) {
                this.PR[PRid].add(channelId);
                setTimeout(() => this.deleteChannelId(PRid, channelId), this.deleteChannelIdTimeout);
            }
        }
    }

    private async addMentionedAsReviewerChannelId(PRid: string, reviewersStashSlug: string[]): Promise<void> {
        for (let stashSlug of reviewersStashSlug) {
            const users = await this.userStorageService.get({stashSlug, reviewNotifications: true});
            if (users.length !== 0 && users[0].channelId) {
                this.PR[PRid].add(users[0].channelId);
                setTimeout(() => this.deleteChannelId(PRid, users[0].channelId as string), this.deleteChannelIdTimeout);
            }
        }
    }

    private async addMentionedInCommentChannelId(PRid: string, commentedStashSlug: string[]): Promise<void> {
        for (let stashSlug of commentedStashSlug) {
            const users = await this.userStorageService.get({stashSlug, commentsNotifications: true});
            if (users.length !== 0 && users[0].channelId) {
                this.PR[PRid].add(users[0].channelId);
                setTimeout(() => this.deleteChannelId(PRid, users[0].channelId as string), this.deleteChannelIdTimeout);
            }
        }
    }

    private deleteChannelId(PRid: string, channelId: string): void {
        this.PR[PRid].delete(channelId);
    }

    async notify(data: IStashPullRequestBody): Promise<void> {
        const PRid = crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
        if (!this.PR[PRid]) {
            this.PR[PRid] = new Set();
            await this.formPRNotifyList(PRid, data);
            await this.formReviewersNotifyList(PRid, data);
            await this.formCommentsNotifyList(PRid, data);
            Array.from(this.PR[PRid]).map(async channelId => {
                await this.webChatAdapter.post({text: 'Look at pull request', msg: data, channelId})
            });

        }
    }

    async formPRNotifyList(PRid: string, data: IStashPullRequestBody): Promise<void> {
        const openedPattern = 'opened pull request';
        const {fallback, author_name: followed, text} = data.attachments[0];
        if (fallback && followed && text.includes(openedPattern)) {
            const result = fallback.match(/<(.*)\/pull-requests/);
            if (result) {
                const repoUrl = `${result[1]}/browse`;
                await this.addSubscribersChannelId(PRid, followed, repoUrl);
            }
        }
    };

    async formReviewersNotifyList(PRid: string, data: IStashPullRequestBody): Promise<void> {
        const fields = data.attachments[0].fields;
        if (fields && fields.length !== 0) {
            const reviewersField = fields.find(field => field.title === 'Reviewers');
            if (reviewersField) {
                const reviewers = reviewersField.value.trim().split(' ').map(reviewer => reviewer.slice(1).toLowerCase());
                await this.addMentionedAsReviewerChannelId(PRid, reviewers);
            }
        }
    };

    async formCommentsNotifyList(PRid: string, data: IStashPullRequestBody): Promise<void> {
        const commentPattern = 'commented on pull request';
        const {text} = data.attachments[0];
        if (text && text.length !== 0 && text.includes(commentPattern)) {
            const commented = text.match(/@\w*/g);
            if (commented) {
                await this.addMentionedInCommentChannelId(PRid, commented.map(commented => commented.slice(1).toLowerCase()));
            }
        }
    };
}

export default NotifyService;