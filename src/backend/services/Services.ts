import {IDeveloperService} from "./admin/DeveloperService";
import {IRepositoryService} from "./admin/RepositoryService";
import {ISubscribeService} from "./admin/SubscribeService";
import {INotifyService} from "./slackbot/NotifyService";
import {IDeveloperToMessageAdapter} from "./slackbot/adapters/DeveloperToMsgAdapter";
import {IRepositoryToMessageAdapter} from "./slackbot/adapters/RepositoryToMsgAdapter";
import IServicesFactory from "./factories/IServicesFactory";
import {IAuthService} from "./slackbot/AuthService";
import {IAuthToMessageAdapter} from "./slackbot/adapters/AuthToMsgAdapter";
import {ISubscribeToMessageAdapter} from "./slackbot/adapters/SubscribeToMsgAdapter";
import {IStashDeveloperService} from "./stash/StashDeveloperService";
import {IStashRepositoryService} from "./stash/StashRepositoryService";

export default class Services {
    authService: IAuthService;
    developerService: IDeveloperService;
    stashDeveloperService: IStashDeveloperService;
    stashRepositoryService: IStashRepositoryService;
    repositoryService: IRepositoryService;
    subscribeService: ISubscribeService;
    notifyService: INotifyService;
    developerMessageAdapter: IDeveloperToMessageAdapter;
    repositoryMessageAdapter: IRepositoryToMessageAdapter;
    authToMessageAdapter: IAuthToMessageAdapter;
    subscribeToMessageAdapter: ISubscribeToMessageAdapter;

    constructor(factory: IServicesFactory) {
        this.authService = factory.getAuthService();
        this.developerService = factory.getDeveloperService();
        this.stashDeveloperService = factory.getStashDeveloperService();
        this.stashRepositoryService = factory.getStashRepositoryService();
        this.repositoryService = factory.getRepositoryService();
        this.subscribeService = factory.getSubscribeService();
        this.notifyService = factory.getNotifyService();
        this.developerMessageAdapter = factory.getDeveloperToMsgAdapter();
        this.repositoryMessageAdapter = factory.getRepositoryToMsgAdapter();
        this.authToMessageAdapter = factory.getAuthToMessageAdapter();
        this.subscribeToMessageAdapter = factory.getSubscribeToMessageAdapter();
    }
}