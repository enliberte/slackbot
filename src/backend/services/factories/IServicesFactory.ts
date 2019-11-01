import {IRepositoryService} from "../admin/RepositoryService";
import {ISubscribeService} from "../admin/SubscribeService";
import {IDeveloperService} from "../admin/DeveloperService";
import {IRepositoryToMessageAdapter} from "../slackbot/adapters/RepositoryToMsgAdapter";
import {INotifyService} from "../slackbot/NotifyService";
import {IDeveloperToMessageAdapter} from "../slackbot/adapters/DeveloperToMsgAdapter";
import {IAuthService} from "../slackbot/AuthService";
import {ISessionToMessageAdapter} from "../slackbot/adapters/SessionToMsgAdapter";
import {ISubscribeToMessageAdapter} from "../slackbot/adapters/SubscribeToMsgAdapter";
import {IStashDeveloperService} from "../stash/StashDeveloperService";
import {IStashRepositoryService} from "../stash/StashRepositoryService";
import {IUserService} from "../admin/UserService";
import {ISessionService} from "../admin/SessionService";

export default interface IServicesFactory {
    getAuthService(): IAuthService;
    getSessionService(): ISessionService;
    getRepositoryService(): IRepositoryService;
    getSubscribeService(): ISubscribeService;
    getDeveloperService(): IDeveloperService;
    getUserService(): IUserService;
    getStashDeveloperService(): IStashDeveloperService;
    getStashRepositoryService(): IStashRepositoryService;
    getNotifyService(): INotifyService;
    getRepositoryToMsgAdapter(): IRepositoryToMessageAdapter;
    getDeveloperToMsgAdapter(): IDeveloperToMessageAdapter;
    getSessionToMessageAdapter(): ISessionToMessageAdapter;
    getSubscribeToMessageAdapter(): ISubscribeToMessageAdapter;
}