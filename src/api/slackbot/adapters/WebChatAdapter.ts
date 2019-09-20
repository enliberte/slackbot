import {WebClient} from "@slack/web-api";
import {IStashPullRequestBody} from "../NotifyAPI";
import {IBlockMessage} from "../../../templates/builders/elements";
const {BOT_TOKEN} = require('../../../../config');

export interface IPostProps {
    text: string;
    msg: IStashPullRequestBody | IBlockMessage;
    channelId: string;
}

export interface IWebChatAdapter {
    post(options: IPostProps): Promise<void>;
}

export default class WebChatAdapter implements IWebChatAdapter {
    protected webClient: WebClient;

    constructor() {
        this.webClient = new WebClient(BOT_TOKEN);
    }

    async post(options: IPostProps): Promise<void> {
        await this.webClient.chat.postMessage({text: options.text, ...options.msg, channel: options.channelId});
    }
}