import {IRepositoryService} from "../admin/RepositoryService";
import {ISubscribeService} from "../admin/SubscribeService";
import {IUserService} from "../admin/UserService";
import {IRepositoryToMessageAdapter} from "../slackbot/adapters/RepositoryToMsgAdapter";
import {INotifyService} from "../slackbot/NotifyService";
import {IUserToMessageAdapter} from "../slackbot/adapters/UserToMsgAdapter";
import {ISessionService} from "../admin/SessionService";
import {ISignupService} from "../admin/SignupService";

export default interface IServicesFactory {
    getSessionService(): ISessionService;
    getSignupService(): ISignupService;
    getRepositoryService(): IRepositoryService;
    getSubscribeService(): ISubscribeService;
    getUserService(): IUserService;
    getNotifyService(): INotifyService;
    getRepositoryToMsgAdapter(): IRepositoryToMessageAdapter;
    getUserToMsgAdapter(): IUserToMessageAdapter;
}