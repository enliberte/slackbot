import {Request, Response, Router} from "express";
import BaseRouter from "./BaseRouter";
import MessageBuilder from "../templates/builders/MessageBuilder";
import {botAuth, userAuth} from "../middlewares/auth";


export default class RepoRouter extends BaseRouter {
    async postMsgWithRepositoryAdditionResult(req: Request, res: Response): Promise<void> {
        const {channel_id: channelId, text: reponame, user_name: addedByName} = req.body;
        const msg = await this.services.repositoryMessageAdapter
            .getAddResultMsg(new MessageBuilder(), {channelId, reponame, addedByName});
        this.postMessage(res, msg, channelId);
    }

    async postMsgWithRepositoryList (req: Request, res: Response): Promise<void> {
        const {channel_id: channelId} = req.body;
        const button = {btnText: 'Delete', btnValue: 'deleteRepo'};
        const msg = await this.services.repositoryMessageAdapter.getReposListMsg(new MessageBuilder(), channelId, button);
        this.postMessage(res, msg, channelId);
    }

    makeRouter(): Router {
        this.router.post('/add-repo', botAuth, userAuth, this.postMsgWithRepositoryAdditionResult.bind(this));
        this.router.post('/repos', botAuth, userAuth, this.postMsgWithRepositoryList.bind(this));
        return this.router;
    }
}