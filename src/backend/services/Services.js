"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Services = /** @class */ (function () {
    function Services(factory) {
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
    return Services;
}());
exports.default = Services;
