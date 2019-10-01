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
import AuthToMessageAdapter from "../slackbot/adapters/AuthToMsgAdapter";
import SubscribeToMessageAdapter from "../slackbot/adapters/SubscribeToMsgAdapter";
import StashDeveloperService from "../stash/StashDeveloperService";

export default class ServicesFactory implements IServicesFactory {
    getAuthService(): AuthService {
        return new AuthService();
    }

    getNotifyService(): NotifyService {
        return new NotifyService(new WebChatAdapter(), new SubscribeStorageService());
    }

    getRepositoryService(): RepositoryService {
        return new RepositoryService(new RepositoryStorageService(), new SubscribeStorageService());
    }

    getSubscribeService(): SubscribeService {
        return new SubscribeService(new SubscribeStorageService(), new RepositoryStorageService(), new DeveloperStorageService());
    }

    getDeveloperService(): DeveloperService {
        return new DeveloperService(new DeveloperStorageService(), new SubscribeStorageService());
    }

    getStashDeveloperService(): StashDeveloperService {
        return new StashDeveloperService();
    }

    getRepositoryToMsgAdapter(): RepoAPIToMsgAdapter {
        return new RepoAPIToMsgAdapter(this.getRepositoryService());
    }

    getDeveloperToMsgAdapter(): DeveloperToMsgAdapter {
        return new DeveloperToMsgAdapter(this.getDeveloperService());
    }

    getAuthToMessageAdapter(): AuthToMessageAdapter {
        return new AuthToMessageAdapter(this.getAuthService());
    }

    getSubscribeToMessageAdapter(): SubscribeToMessageAdapter {
        return new SubscribeToMessageAdapter(this.getSubscribeService());
    }
}