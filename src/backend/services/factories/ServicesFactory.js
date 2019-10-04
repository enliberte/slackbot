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
var AuthToMsgAdapter_1 = __importDefault(require("../slackbot/adapters/AuthToMsgAdapter"));
var SubscribeToMsgAdapter_1 = __importDefault(require("../slackbot/adapters/SubscribeToMsgAdapter"));
var StashDeveloperService_1 = __importDefault(require("../stash/StashDeveloperService"));
var StashRepositoryService_1 = __importDefault(require("../stash/StashRepositoryService"));
var ServicesFactory = /** @class */ (function () {
    function ServicesFactory() {
    }
    ServicesFactory.prototype.getAuthService = function () {
        return new AuthService_1.default();
    };
    ServicesFactory.prototype.getNotifyService = function () {
        return new NotifyService_1.default(new WebChatAdapter_1.default(), new SubscribeStorageService_1.default());
    };
    ServicesFactory.prototype.getRepositoryService = function () {
        return new RepositoryService_1.default(new RepositoryStorageService_1.default(), new SubscribeStorageService_1.default());
    };
    ServicesFactory.prototype.getSubscribeService = function () {
        return new SubscribeService_1.default(new SubscribeStorageService_1.default(), new RepositoryStorageService_1.default(), new DeveloperStorageService_1.default());
    };
    ServicesFactory.prototype.getDeveloperService = function () {
        return new DeveloperService_1.default(new DeveloperStorageService_1.default(), new SubscribeStorageService_1.default());
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
    ServicesFactory.prototype.getAuthToMessageAdapter = function () {
        return new AuthToMsgAdapter_1.default(this.getAuthService());
    };
    ServicesFactory.prototype.getSubscribeToMessageAdapter = function () {
        return new SubscribeToMsgAdapter_1.default(this.getSubscribeService());
    };
    return ServicesFactory;
}());
exports.default = ServicesFactory;
