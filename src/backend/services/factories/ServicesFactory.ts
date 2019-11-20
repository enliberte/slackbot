import IServicesFactory from "./IServicesFactory";
import NotifyService from "../slackbot/NotifyService";
import SubscribeStorageService from "../../db/storageServices/SubscribeStorageService";
import WebChatAdapter from "../slackbot/adapters/WebChatAdapter";
import RepositoryService from "../admin/RepositoryService";
import RepositoryStorageService from "../../db/storageServices/RepositoryStorageService";
import RepoAPIToMsgAdapter from "../slackbot/adapters/RepositoryToMsgAdapter";
import SubscribeService from "../admin/SubscribeService";
import DeveloperService from "../admin/DeveloperService";
import DeveloperStorageService from "../../db/storageServices/DeveloperStorageService";
import DeveloperToMsgAdapter from "../slackbot/adapters/DeveloperToMsgAdapter";
import AuthService from "../slackbot/AuthService";
import SubscribeToMessageAdapter from "../slackbot/adapters/SubscribeToMsgAdapter";
import StashDeveloperService from "../stash/StashDeveloperService";
import StashRepositoryService from "../stash/StashRepositoryService";
import UserService from "../admin/UserService";
import UserStorageService from "../../db/storageServices/UserStorageService";
import SessionService from "../admin/SessionService";
import SessionStorageService from "../../db/storageServices/SessionStorageService";
import SessionToMessageAdapter from "../slackbot/adapters/SessionToMsgAdapter";
import WebhookNotifyService from "../slackbot/WebhookNotifyService";

export default class ServicesFactory implements IServicesFactory {
    getAuthService(): AuthService {
        return new AuthService();
    }

    getSessionService(): SessionService {
        return new SessionService(new SessionStorageService());
    }

    // getNotifyService(): NotifyService {
    //     return new NotifyService(new WebChatAdapter(), new SubscribeStorageService(), new UserStorageService());
    // }

    getNotifyService(): WebhookNotifyService {
        return new WebhookNotifyService(new WebChatAdapter(), new SubscribeStorageService(), new UserStorageService());
    }

    getRepositoryService(): RepositoryService {
        return new RepositoryService(new RepositoryStorageService(), new SubscribeStorageService(), this.getStashRepositoryService());
    }

    getSubscribeService(): SubscribeService {
        return new SubscribeService(
            new SubscribeStorageService(),
            new RepositoryStorageService(),
            new DeveloperStorageService(),
            this.getRepositoryService(),
            this.getDeveloperService(),
            this.getStashDeveloperService(),
            this.getStashRepositoryService()
        );
    }

    getDeveloperService(): DeveloperService {
        return new DeveloperService(new DeveloperStorageService(), new SubscribeStorageService(), this.getStashDeveloperService());
    }

    getUserService(): UserService {
        return new UserService(new UserStorageService(), this.getStashDeveloperService());
    }

    getStashDeveloperService(): StashDeveloperService {
        return new StashDeveloperService(new DeveloperStorageService());
    }

    getStashRepositoryService(): StashRepositoryService {
        return new StashRepositoryService(new RepositoryStorageService());
    }

    getRepositoryToMsgAdapter(): RepoAPIToMsgAdapter {
        return new RepoAPIToMsgAdapter(this.getRepositoryService());
    }

    getDeveloperToMsgAdapter(): DeveloperToMsgAdapter {
        return new DeveloperToMsgAdapter(this.getDeveloperService());
    }

    getSessionToMessageAdapter(): SessionToMessageAdapter {
        return new SessionToMessageAdapter(this.getSessionService());
    }

    getSubscribeToMessageAdapter(): SubscribeToMessageAdapter {
        return new SubscribeToMessageAdapter(this.getSubscribeService());
    }
}