import {IRepoAPI} from "../admin/RepoAPI";
import {ISubscribeAPI} from "../admin/SubscribeAPI";
import {IUserAPI} from "../admin/UserAPI";
import {IRepoAPIToMsgAdapter} from "../slackbot/adapters/RepoAPIToMsgAdapter";
import {INotifyAPI} from "../slackbot/NotifyAPI";
import {IUserAPIToMsgAdapter} from "../slackbot/adapters/UserAPIToMsgAdapter";
import {IWebChatAdapter} from "../slackbot/adapters/WebChatAdapter";

export default interface IAPIFactory {
    getRepoAPI(): IRepoAPI;
    getSubscribeAPI(): ISubscribeAPI;
    getUserAPI(): IUserAPI;
    getNotifyAPI(): INotifyAPI;
    getRepoAPIToMsgAdapter(): IRepoAPIToMsgAdapter;
    getUserAPIToMsgAdapter(): IUserAPIToMsgAdapter;
}