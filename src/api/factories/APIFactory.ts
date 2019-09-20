import IAPIFactory from "./IAPIFactory";
import NotifyAPI from "../slackbot/NotifyAPI";
import SubscribeController from "../../db/controllers/subscribeController";
import WebChatAdapter from "../slackbot/adapters/WebChatAdapter";
import RepoAPI from "../admin/RepoAPI";
import RepoController from "../../db/controllers/repoController";
import RepoAPIToMsgAdapter from "../slackbot/adapters/RepoAPIToMsgAdapter";
import MsgBuilder from "../../templates/builders/MsgBuilder";
import SubscribeAPI from "../admin/SubscribeAPI";
import UserAPI from "../admin/UserAPI";
import UserController from "../../db/controllers/userController";
import UserAPIToMsgAdapter from "../slackbot/adapters/UserAPIToMsgAdapter";

export default class APIFactory implements IAPIFactory {
    getNotifyAPI(): NotifyAPI {
        return new NotifyAPI(new WebChatAdapter(), new SubscribeController());
    }

    getRepoAPI(): RepoAPI {
        return new RepoAPI(new RepoController(), new SubscribeController());
    }

    getSubscribeAPI(): SubscribeAPI {
        return new SubscribeAPI(new SubscribeController());
    }

    getUserAPI(): UserAPI {
        return new UserAPI(new UserController(), new SubscribeController());
    }

    getRepoAPIToMsgAdapter(): RepoAPIToMsgAdapter {
        return new RepoAPIToMsgAdapter(this.getRepoAPI(), new MsgBuilder());
    }

    getUserAPIToMsgAdapter(): UserAPIToMsgAdapter {
        return new UserAPIToMsgAdapter(this.getUserAPI(), new MsgBuilder());
    }

}