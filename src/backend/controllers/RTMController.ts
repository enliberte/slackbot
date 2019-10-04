import {RTMClient} from '@slack/rtm-api';
import Services from "../services/Services";
import {EventEmitter} from "events";
import MessageBuilder from "../services/slackbot/templates/builders/MessageBuilder";
import WebChatAdapter from "../services/slackbot/adapters/WebChatAdapter";
import {IBlockMessage} from "../services/slackbot/templates/builders/elements";
import buildCommandsList from "../services/slackbot/templates/common/buildCommandsList";
import {commands} from "../services/slackbot/commands/commands";
const {BOT_TOKEN} = require('../../../config');


interface IRTM {
    type: string;
    text: string;
    user: string;
    channel: string;
}


export interface IRTMController {
    postMessage(msg: IBlockMessage, channelId: string): Promise<void>;
    start(): void;
}


export default class RTMController implements IRTMController {
    private rtm: RTMClient;
    private services: Services;
    private ee: EventEmitter;

    constructor(services: Services) {
        this.services = services;
        this.rtm = new RTMClient(BOT_TOKEN);
        this.ee = new EventEmitter();
    }

    async postMessage(msg: IBlockMessage, channelId: string): Promise<void> {
        await new WebChatAdapter().post({text: '', msg, channelId});
    }

    async postMsgWithDeveloperAdditionResult(channelId: string, addedByName: string, username: string): Promise<void> {
        const msg = await this.services.developerMessageAdapter.getAddResultMsg(new MessageBuilder(), {channelId, username, addedByName});
        this.postMessage(msg, channelId);
    }

    async postMsgWithRepositoryAdditionResult(channelId: string, addedByName: string, reponame: string): Promise<void> {
        const msg = await this.services.repositoryMessageAdapter.getAddResultMsg(new MessageBuilder(), {channelId, reponame, addedByName});
        this.postMessage(msg, channelId);
    }

    async postMsgWithDevelopersList(channelId: string): Promise<void> {
        const msg = await this.services.developerMessageAdapter.getDevelopersListMsg(new MessageBuilder(), channelId);
        this.postMessage(msg, channelId);
    }

    async postMsgWithRepositoryList (channelId: string): Promise<void> {
        const msg = await this.services.repositoryMessageAdapter.getReposListMsg(new MessageBuilder(), channelId);
        this.postMessage(msg, channelId);
    }

    async postMsgWithSubscribesList (channelId: string): Promise<void> {
        const msg = await this.services.subscribeToMessageAdapter.getSubscribesListMsg(new MessageBuilder(), channelId);
        this.postMessage(msg, channelId);
    }

    async postMsgWithAuthLink(channelId: string, username: string): Promise<void> {
        const msg = this.services.authToMessageAdapter.getCreateAuthLinkMsg(new MessageBuilder(), {channelId, username});
        this.postMessage(msg, channelId);
    }

    async postMsgWithSubscribeAdditionResult(channelId: string, follower: string, reponame: string, followed: string): Promise<void> {
        const subscribe = {follower, reponame, channelId, followed};
        const msg = await this.services.subscribeToMessageAdapter.getAddResultMsg(new MessageBuilder(), subscribe);
        this.postMessage(msg, channelId);
    }

    async postMsgWithSubscribeRemoveResult(channelId: string, follower: string, reponame: string, followed: string): Promise<void> {
        const subscribe = {follower, reponame, channelId, followed};
        const msg = await this.services.subscribeToMessageAdapter.getDeleteResultMsg(new MessageBuilder(), subscribe);
        this.postMessage(msg, channelId);
    }

    postMsgWithCommands(channelId: string): void {
        const msg = buildCommandsList(new MessageBuilder());
        this.postMessage(msg, channelId);
    }

    private async processMessages(event: IRTM): Promise<void> {
        const [command, ...args] = event.text.split(' ');
        this.ee.emit(command, event.channel, event.user, ...args);
    }

    start(): void {
        this.ee.on(commands.ADD_DEVELOPER, this.postMsgWithDeveloperAdditionResult.bind(this));
        this.ee.on(commands.ADD_REPOSITORY, this.postMsgWithRepositoryAdditionResult.bind(this));
        this.ee.on(commands.DEVELOPERS, this.postMsgWithDevelopersList.bind(this));
        this.ee.on(commands.REPOSITORIES, this.postMsgWithRepositoryList.bind(this));
        this.ee.on(commands.SIGNUP, this.postMsgWithAuthLink.bind(this));
        this.ee.on(commands.SUBSCRIBES, this.postMsgWithSubscribesList.bind(this));
        this.ee.on(commands.SUBSCRIBE, this.postMsgWithSubscribeAdditionResult.bind(this));
        this.ee.on(commands.UNSUBSCRIBE, this.postMsgWithSubscribeRemoveResult.bind(this));
        this.ee.on(commands.HELP, this.postMsgWithCommands.bind(this));
        this.rtm.on('message', this.processMessages.bind(this));
        this.rtm.start();
    }
}