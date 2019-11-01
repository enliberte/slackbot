import {IDeveloperService} from "./admin/DeveloperService";
import {IRepositoryService} from "./admin/RepositoryService";
import {ISubscribeService} from "./admin/SubscribeService";
import {INotifyService} from "./slackbot/NotifyService";
import {IDeveloperToMessageAdapter} from "./slackbot/adapters/DeveloperToMsgAdapter";
import {IRepositoryToMessageAdapter} from "./slackbot/adapters/RepositoryToMsgAdapter";
import IServicesFactory from "./factories/IServicesFactory";
import {IAuthService} from "./slackbot/AuthService";
import {ISessionToMessageAdapter} from "./slackbot/adapters/SessionToMsgAdapter";
import {ISubscribeToMessageAdapter} from "./slackbot/adapters/SubscribeToMsgAdapter";
import {IStashDeveloperService} from "./stash/StashDeveloperService";
import {IStashRepositoryService} from "./stash/StashRepositoryService";
import {IUserService} from "./admin/UserService";
import {ISessionService} from "./admin/SessionService";

export default class Services {
    authService: IAuthService;
    sessionService: ISessionService;
    developerService: IDeveloperService;
    userService: IUserService;
    stashDeveloperService: IStashDeveloperService;
    stashRepositoryService: IStashRepositoryService;
    repositoryService: IRepositoryService;
    subscribeService: ISubscribeService;
    notifyService: INotifyService;
    developerMessageAdapter: IDeveloperToMessageAdapter;
    repositoryMessageAdapter: IRepositoryToMessageAdapter;
    sessionToMessageAdapter: ISessionToMessageAdapter;
    subscribeToMessageAdapter: ISubscribeToMessageAdapter;

    constructor(factory: IServicesFactory) {
        this.authService = factory.getAuthService();
        this.sessionService = factory.getSessionService();
        this.developerService = factory.getDeveloperService();
        this.userService = factory.getUserService();
        this.stashDeveloperService = factory.getStashDeveloperService();
        this.stashRepositoryService = factory.getStashRepositoryService();
        this.repositoryService = factory.getRepositoryService();
        this.subscribeService = factory.getSubscribeService();
        this.notifyService = factory.getNotifyService();
        this.developerMessageAdapter = factory.getDeveloperToMsgAdapter();
        this.repositoryMessageAdapter = factory.getRepositoryToMsgAdapter();
        this.sessionToMessageAdapter = factory.getSessionToMessageAdapter();
        this.subscribeToMessageAdapter = factory.getSubscribeToMessageAdapter();
    }
}