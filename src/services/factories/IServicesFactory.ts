import {IRepositoryService} from "../admin/RepositoryService";
import {ISubscribeService} from "../admin/SubscribeService";
import {IUserService} from "../admin/UserService";
import {IRepositoryToMessageAdapter} from "../slackbot/adapters/RepositoryToMsgAdapter";
import {INotifyService} from "../slackbot/NotifyService";
import {IUserToMessageAdapter} from "../slackbot/adapters/UserToMsgAdapter";
import {ISessionService} from "../admin/SessionService";
import {IAuthService} from "../slackbot/AuthService";
import {IAuthToMessageAdapter} from "../slackbot/adapters/AuthToMsgAdapter";

export default interface IServicesFactory {
    getSessionService(): ISessionService;
    getAuthService(): IAuthService;
    getRepositoryService(): IRepositoryService;
    getSubscribeService(): ISubscribeService;
    getUserService(): IUserService;
    getNotifyService(): INotifyService;
    getRepositoryToMsgAdapter(): IRepositoryToMessageAdapter;
    getUserToMsgAdapter(): IUserToMessageAdapter;
    getAuthToMsgAdapter(): IAuthToMessageAdapter;
}