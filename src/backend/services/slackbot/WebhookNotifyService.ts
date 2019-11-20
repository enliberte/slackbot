import {IChat} from "./adapters/WebChatAdapter";
import {ISubscribeStorageService} from "../../db/storageServices/SubscribeStorageService";
import {IUserStorageService} from "../../db/storageServices/UserStorageService";
import {IBlockMessage} from "./templates/builders/elements";
import buildStashNotification, {IStashNotification} from "./templates/common/buildStashNotification";
import MessageBuilder from "./templates/builders/MessageBuilder";


const PR_OPENED = 'pr:opened';
const PR_COMMENT_ADDED = 'pr:comment:added';
const PR_REVIEWER_UPDATED = 'pr:reviewer:updated';


interface IReviewer {
    user: IUser;
}

interface IUser {
    displayName: string;
    slug: string;
}

interface IDestination {
    displayId: string;
    repository: IRepository;
}

interface IRepository {
    name: string;
}

interface IHref {
    href: string;
}

interface ILinks {
    self: IHref[];
}

interface IComment {
    text: string;
    author: IUser;
}

interface IPullRequest {
    id: number;
    title: string;
    fromRef: IDestination;
    toRef: IDestination;
    reviewers: IReviewer[];
    links: ILinks;
}

interface IWebhook {
    eventKey: string;
    actor: IUser;
    pullRequest: IPullRequest;
    comment?: IComment;
}

export interface IWebhookNotifyService {
    notify(data: IWebhook): Promise<void>;
}

class WebhookNotifyService implements IWebhookNotifyService {
    protected webChatAdapter: IChat;
    protected subscribeStorageService: ISubscribeStorageService;
    protected userStorageService: IUserStorageService;

    constructor(webChatAdapter: IChat, subscribeStorageService: ISubscribeStorageService, userStorageService: IUserStorageService) {
        this.webChatAdapter = webChatAdapter;
        this.subscribeStorageService = subscribeStorageService;
        this.userStorageService = userStorageService;
    }

    private async getSubscribersChannelId(followed: string, reponame: string): Promise<string[]> {
        const subscribes = await this.subscribeStorageService.get({followed, reponame});
        const subscribersChannelId = subscribes.map(subscribe => subscribe.channelId);
        const channelIdToNotify = [];
        for (let channelId of subscribersChannelId) {
            const users = await this.userStorageService.get({channelId, subscribesNotifications: true});
            if (users.length !== 0) {
                channelIdToNotify.push(channelId);
            }
        }
        return channelIdToNotify;
    }

    private async getMentionedAsReviewerChannelId(reviewersStashSlug: string[]): Promise<string[]> {
        const channelIdToNotify = [];
        for (let stashSlug of reviewersStashSlug) {
            const users = await this.userStorageService.get({stashSlug, reviewNotifications: true});
            if (users.length !== 0 && users[0].channelId) {
                channelIdToNotify.push(users[0].channelId);
            }
        }
        return channelIdToNotify;
    }

    private async getMentionedInCommentChannelId(comment: IComment): Promise<string[]> {
        const channelIdToNotify = [];
        let mentionedInComment = comment.text.match(/@\w*/g);
        if (mentionedInComment) {
            mentionedInComment = mentionedInComment.map(mentioned => mentioned.slice(1).toLowerCase());
            for (let stashSlug of mentionedInComment) {
                const users = await this.userStorageService.get({stashSlug, commentsNotifications: true});
                if (users.length !== 0 && users[0].channelId) {
                    channelIdToNotify.push(users[0].channelId);
                }
            }
        }
        return channelIdToNotify;
    }

    async notify(data: IWebhook): Promise<void> {
        let channelIds: string[] = [];
        const stashNotification: IStashNotification = {
            header: '',
            repositoryName: data.pullRequest.fromRef.repository.name,
            source: data.pullRequest.fromRef.displayId,
            destination: data.pullRequest.toRef.displayId,
            comment: data.comment && data.comment.text
        };
        const PRId = data.pullRequest.id;
        const PRTitle = data.pullRequest.title;
        const PRHref = data.pullRequest.links.self[0].href;
        const PRAuthor = data.actor.displayName;
        let msg: IBlockMessage;
        switch (data.eventKey) {
            case PR_OPENED:
                stashNotification.header = `*${PRAuthor}* opened pull request <${PRHref}|#${PRId}: ${PRTitle}>`;
                const subscribersChannelId = await this.getSubscribersChannelId(PRAuthor, stashNotification.repositoryName);
                const mentionedInCommentChannelId = data.comment ? await this.getMentionedInCommentChannelId(data.comment) : [];
                channelIds = Array.from(new Set([...subscribersChannelId, ...mentionedInCommentChannelId]));
                break;
            case PR_REVIEWER_UPDATED:
                stashNotification.header = `*${PRAuthor}* selected you as reviewer in pull request <${PRHref}|#${PRId}: ${PRTitle}>`;
                channelIds = await this.getMentionedAsReviewerChannelId(data.pullRequest.reviewers.map(reviewer => reviewer.user.slug));
                break;
            case PR_COMMENT_ADDED:
                if (data.comment) {
                    stashNotification.header = `*${PRAuthor}* commented on pull request <${PRHref}|#${PRId}: ${PRTitle}>`;
                    channelIds = await this.getMentionedInCommentChannelId(data.comment);
                }
                break;
        }
        msg = buildStashNotification(new MessageBuilder(), stashNotification);
        channelIds.map(async channelId => {
            await this.webChatAdapter.post({text: '', msg, channelId})
        });
    }
}

export default WebhookNotifyService;