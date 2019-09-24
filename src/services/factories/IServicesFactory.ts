import {IRepositoryService} from "../admin/RepositoryService";
import {ISubscribeService} from "../admin/SubscribeService";
import {IUserService} from "../admin/UserService";
import {IRepositoryToMessageAdapter} from "../slackbot/adapters/RepositoryToMsgAdapter";
import {INotifyService} from "../slackbot/NotifyService";
import {IUserToMessageAdapter} from "../slackbot/adapters/UserToMsgAdapter";
import {IAuthService} from "../slackbot/AuthService";
import {IAuthToMessageAdapter} from "../slackbot/adapters/AuthToMsgAdapter";

export default interface IServicesFactory {
    getAuthService(): IAuthService;
    getRepositoryService(): IRepositoryService;
    getSubscribeService(): ISubscribeService;
    getUserService(): IUserService;
    getNotifyService(): INotifyService;
    getRepositoryToMsgAdapter(): IRepositoryToMessageAdapter;
    getUserToMsgAdapter(): IUserToMessageAdapter;
    getAuthToMessageAdapter(): IAuthToMessageAdapter;
}