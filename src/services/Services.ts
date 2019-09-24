import {IUserService} from "./admin/UserService";
import {IRepositoryService} from "./admin/RepositoryService";
import {ISubscribeService} from "./admin/SubscribeService";
import {INotifyService} from "./slackbot/NotifyService";
import {IUserToMessageAdapter} from "./slackbot/adapters/UserToMsgAdapter";
import {IRepositoryToMessageAdapter} from "./slackbot/adapters/RepositoryToMsgAdapter";
import IServicesFactory from "./factories/IServicesFactory";
import {ISessionService} from "./admin/SessionService";
import {ISignupService} from "./admin/SignupService";

export default class Services {
    sessionService: ISessionService;
    signupService: ISignupService;
    userService: IUserService;
    repositoryService: IRepositoryService;
    subscribeService: ISubscribeService;
    notifyService: INotifyService;
    userMessageAdapter: IUserToMessageAdapter;
    repositoryMessageAdapter: IRepositoryToMessageAdapter;

    constructor(factory: IServicesFactory) {
        this.sessionService = factory.getSessionService();
        this.signupService = factory.getSignupService();
        this.userService = factory.getUserService();
        this.repositoryService = factory.getRepositoryService();
        this.subscribeService = factory.getSubscribeService();
        this.notifyService = factory.getNotifyService();
        this.userMessageAdapter = factory.getUserToMsgAdapter();
        this.repositoryMessageAdapter = factory.getRepositoryToMsgAdapter();
    }
}