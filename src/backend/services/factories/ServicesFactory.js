"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var NotifyService_1 = __importDefault(require("../slackbot/NotifyService"));
var SubscribeStorageService_1 = __importDefault(require("../../db/storageServices/SubscribeStorageService"));
var WebChatAdapter_1 = __importDefault(require("../slackbot/adapters/WebChatAdapter"));
var RepositoryService_1 = __importDefault(require("../admin/RepositoryService"));
var RepositoryStorageService_1 = __importDefault(require("../../db/storageServices/RepositoryStorageService"));
var RepositoryToMsgAdapter_1 = __importDefault(require("../slackbot/adapters/RepositoryToMsgAdapter"));
var SubscribeService_1 = __importDefault(require("../admin/SubscribeService"));
var DeveloperService_1 = __importDefault(require("../admin/DeveloperService"));
var DeveloperStorageService_1 = __importDefault(require("../../db/storageServices/DeveloperStorageService"));
var DeveloperToMsgAdapter_1 = __importDefault(require("../slackbot/adapters/DeveloperToMsgAdapter"));
var AuthService_1 = __importDefault(require("../slackbot/AuthService"));
var SubscribeToMsgAdapter_1 = __importDefault(require("../slackbot/adapters/SubscribeToMsgAdapter"));
var StashDeveloperService_1 = __importDefault(require("../stash/StashDeveloperService"));
var StashRepositoryService_1 = __importDefault(require("../stash/StashRepositoryService"));
var UserService_1 = __importDefault(require("../admin/UserService"));
var UserStorageService_1 = __importDefault(require("../../db/storageServices/UserStorageService"));
var SessionService_1 = __importDefault(require("../admin/SessionService"));
var SessionStorageService_1 = __importDefault(require("../../db/storageServices/SessionStorageService"));
var SessionToMsgAdapter_1 = __importDefault(require("../slackbot/adapters/SessionToMsgAdapter"));
var ServicesFactory = /** @class */ (function () {
    function ServicesFactory() {
    }
    ServicesFactory.prototype.getAuthService = function () {
        return new AuthService_1.default();
    };
    ServicesFactory.prototype.getSessionService = function () {
        return new SessionService_1.default(new SessionStorageService_1.default());
    };
    ServicesFactory.prototype.getNotifyService = function () {
        return new NotifyService_1.default(new WebChatAdapter_1.default(), new SubscribeStorageService_1.default(), new UserStorageService_1.default());
    };
    ServicesFactory.prototype.getRepositoryService = function () {
        return new RepositoryService_1.default(new RepositoryStorageService_1.default(), new SubscribeStorageService_1.default(), this.getStashRepositoryService());
    };
    ServicesFactory.prototype.getSubscribeService = function () {
        return new SubscribeService_1.default(new SubscribeStorageService_1.default(), new RepositoryStorageService_1.default(), new DeveloperStorageService_1.default(), this.getRepositoryService(), this.getDeveloperService(), this.getStashDeveloperService(), this.getStashRepositoryService());
    };
    ServicesFactory.prototype.getDeveloperService = function () {
        return new DeveloperService_1.default(new DeveloperStorageService_1.default(), new SubscribeStorageService_1.default(), this.getStashDeveloperService());
    };
    ServicesFactory.prototype.getUserService = function () {
        return new UserService_1.default(new UserStorageService_1.default(), this.getStashDeveloperService());
    };
    ServicesFactory.prototype.getStashDeveloperService = function () {
        return new StashDeveloperService_1.default(new DeveloperStorageService_1.default());
    };
    ServicesFactory.prototype.getStashRepositoryService = function () {
        return new StashRepositoryService_1.default(new RepositoryStorageService_1.default());
    };
    ServicesFactory.prototype.getRepositoryToMsgAdapter = function () {
        return new RepositoryToMsgAdapter_1.default(this.getRepositoryService());
    };
    ServicesFactory.prototype.getDeveloperToMsgAdapter = function () {
        return new DeveloperToMsgAdapter_1.default(this.getDeveloperService());
    };
    ServicesFactory.prototype.getSessionToMessageAdapter = function () {
        return new SessionToMsgAdapter_1.default(this.getSessionService());
    };
    ServicesFactory.prototype.getSubscribeToMessageAdapter = function () {
        return new SubscribeToMsgAdapter_1.default(this.getSubscribeService());
    };
    return ServicesFactory;
}());
exports.default = ServicesFactory;
