import {WebClient} from "@slack/web-api";
import {IStashPullRequestBody} from "../NotifyService";
import {IBlockMessage} from "../../../templates/builders/elements";
const {BOT_TOKEN} = require('../../../../config');

export interface IChatMessage {
    text: string;
    msg: IStashPullRequestBody | IBlockMessage;
    channelId: string;
}

export interface IChat {
    post(options: IChatMessage): Promise<void>;
}

export default class WebChatAdapter implements IChat {
    protected webClient: WebClient;

    constructor() {
        this.webClient = new WebClient(BOT_TOKEN);
    }

    async post(options: IChatMessage): Promise<void> {
        await this.webClient.chat.postMessage({text: options.text, ...options.msg, channel: options.channelId});
    }
}