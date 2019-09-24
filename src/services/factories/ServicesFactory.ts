import IServicesFactory from "./IServicesFactory";
import NotifyService from "../slackbot/NotifyService";
import SubscribeStorageService from "../../db/storageServices/SubscribeStorageService";
import WebChatAdapter from "../slackbot/adapters/WebChatAdapter";
import RepositoryService from "../admin/RepositoryService";
import RepositoryStorageService from "../../db/storageServices/RepositoryStorageService";
import RepoAPIToMsgAdapter from "../slackbot/adapters/RepositoryToMsgAdapter";
import SubscribeService from "../admin/SubscribeService";
import UserService from "../admin/UserService";
import UserStorageService from "../../db/storageServices/UserStorageService";
import UserToMsgAdapter from "../slackbot/adapters/UserToMsgAdapter";
import AuthService from "../slackbot/AuthService";
import AuthToMessageAdapter from "../slackbot/adapters/AuthToMsgAdapter";

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
        return new SubscribeService(new SubscribeStorageService());
    }

    getUserService(): UserService {
        return new UserService(new UserStorageService(), new SubscribeStorageService());
    }

    getRepositoryToMsgAdapter(): RepoAPIToMsgAdapter {
        return new RepoAPIToMsgAdapter(this.getRepositoryService());
    }

    getUserToMsgAdapter(): UserToMsgAdapter {
        return new UserToMsgAdapter(this.getUserService());
    }

    getAuthToMessageAdapter(): AuthToMessageAdapter {
        return new AuthToMessageAdapter(this.getAuthService());
    }
}