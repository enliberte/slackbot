import {IRepositoryService} from "../admin/RepositoryService";
import {ISubscribeService} from "../admin/SubscribeService";
import {IDeveloperService} from "../admin/DeveloperService";
import {IRepositoryToMessageAdapter} from "../slackbot/adapters/RepositoryToMsgAdapter";
import {INotifyService} from "../slackbot/NotifyService";
import {IDeveloperToMessageAdapter} from "../slackbot/adapters/DeveloperToMsgAdapter";
import {IAuthService} from "../slackbot/AuthService";
import {IAuthToMessageAdapter} from "../slackbot/adapters/AuthToMsgAdapter";
import {ISubscribeToMessageAdapter} from "../slackbot/adapters/SubscribeToMsgAdapter";
import {IStashDeveloperService} from "../stash/StashDeveloperService";
import {IStashRepositoryService} from "../stash/StashRepositoryService";

export default interface IServicesFactory {
    getAuthService(): IAuthService;
    getRepositoryService(): IRepositoryService;
    getSubscribeService(): ISubscribeService;
    getDeveloperService(): IDeveloperService;
    getStashDeveloperService(): IStashDeveloperService;
    getStashRepositoryService(): IStashRepositoryService;
    getNotifyService(): INotifyService;
    getRepositoryToMsgAdapter(): IRepositoryToMessageAdapter;
    getDeveloperToMsgAdapter(): IDeveloperToMessageAdapter;
    getAuthToMessageAdapter(): IAuthToMessageAdapter;
    getSubscribeToMessageAdapter(): ISubscribeToMessageAdapter;
}