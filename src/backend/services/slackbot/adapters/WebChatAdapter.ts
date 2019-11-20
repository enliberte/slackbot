import {WebClient} from "@slack/web-api";
import {IStashPullRequestBody} from "../NotifyService";
import {IBlockMessage} from "../templates/builders/elements";
import EM from "../../ServiceErrorMessages";
const {BOT_TOKEN} = require('../../../../../config');

export interface IChatMessage {
    text: string;
    msg: IStashPullRequestBody | IBlockMessage;
    channelId: string;
}

export interface IUser {
    profile: IProfile;
}

export interface IProfile {
    email: string;
}

export interface IInfo {
    user?: IUser;
}

export interface IChat {
    post(options: IChatMessage): Promise<void>;
    getProfile(user: string): Promise<IProfile | string>;
}

export default class WebChatAdapter implements IChat {
    protected webClient: WebClient;

    constructor() {
        this.webClient = new WebClient(BOT_TOKEN);
    }

    async post(options: IChatMessage): Promise<void> {
        await this.webClient.chat.postMessage({text: options.text, ...options.msg, channel: options.channelId});
    }

    async getProfile(user: string): Promise<IProfile | string> {
        try {
            const info = await this.webClient.users.info({user}) as IInfo;
            if (info.user) {
                return info.user.profile;
            } else {
                return EM.DEVELOPER_NOT_FOUND;
            }
        } catch (e) {
            return EM.DEVELOPER_NOT_FOUND;
        }
    }
}