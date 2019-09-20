import {IUserAPI} from "./admin/UserAPI";
import {IRepoAPI} from "./admin/RepoAPI";
import {ISubscribeAPI} from "./admin/SubscribeAPI";
import {INotifyAPI} from "./slackbot/NotifyAPI";
import {IUserAPIToMsgAdapter} from "./slackbot/adapters/UserAPIToMsgAdapter";
import {IRepoAPIToMsgAdapter} from "./slackbot/adapters/RepoAPIToMsgAdapter";
import IAPIFactory from "./factories/IAPIFactory";

export default class API {
    user: IUserAPI;
    repo: IRepoAPI;
    subscribe: ISubscribeAPI;
    notify: INotifyAPI;
    userMsg: IUserAPIToMsgAdapter;
    repoMsg: IRepoAPIToMsgAdapter;

    constructor(factory: IAPIFactory) {
        this.user = factory.getUserAPI();
        this.repo = factory.getRepoAPI();
        this.subscribe = factory.getSubscribeAPI();
        this.notify = factory.getNotifyAPI();
        this.userMsg = factory.getUserAPIToMsgAdapter();
        this.repoMsg = factory.getRepoAPIToMsgAdapter();
    }
}