import {IUserService} from "./admin/UserService";
import {IRepositoryService} from "./admin/RepositoryService";
import {ISubscribeService} from "./admin/SubscribeService";
import {INotifyService} from "./slackbot/NotifyService";
import {IUserToMessageAdapter} from "./slackbot/adapters/UserToMsgAdapter";
import {IRepositoryToMessageAdapter} from "./slackbot/adapters/RepositoryToMsgAdapter";
import IServicesFactory from "./factories/IServicesFactory";
import {IAuthService} from "./slackbot/AuthService";
import {IAuthToMessageAdapter} from "./slackbot/adapters/AuthToMsgAdapter";

export default class Services {
    authService: IAuthService;
    userService: IUserService;
    repositoryService: IRepositoryService;
    subscribeService: ISubscribeService;
    notifyService: INotifyService;
    userMessageAdapter: IUserToMessageAdapter;
    repositoryMessageAdapter: IRepositoryToMessageAdapter;
    authToMessageAdapter: IAuthToMessageAdapter;

    constructor(factory: IServicesFactory) {
        this.authService = factory.getAuthService();
        this.userService = factory.getUserService();
        this.repositoryService = factory.getRepositoryService();
        this.subscribeService = factory.getSubscribeService();
        this.notifyService = factory.getNotifyService();
        this.userMessageAdapter = factory.getUserToMsgAdapter();
        this.repositoryMessageAdapter = factory.getRepositoryToMsgAdapter();
        this.authToMessageAdapter = factory.getAuthToMessageAdapter();
    }
}