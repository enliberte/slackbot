import {Request, Response, Router} from "express";
import BaseRouter from "./BaseRouter";
import MessageBuilder from "../templates/builders/MessageBuilder";
import {botAuth, userAuth} from "../middlewares/auth";


export default class SubscribeRouter extends BaseRouter {
    async postMsgWithSubscribeAdditionResult(req: Request, res: Response): Promise<void> {
        const [reponame, followed] = req.body.text.split(' ');
        const {channel_id: channelId, user_name: follower} = req.body;
        const subscribe = {follower, reponame, channelId, followed};
        const msg = await this.services.subscribeToMessageAdapter.getAddResultMsg(new MessageBuilder(), subscribe);
        this.postMessage(res, msg, channelId);
    }

    async postMsgWithRepositoryList(req: Request, res: Response): Promise<void> {
        const {channel_id: channelId} = req.body;
        const button = {btnText: 'Select', btnValue: 'select'};
        const msg = await this.services.repositoryMessageAdapter.getReposListMsg(new MessageBuilder(), channelId, button);
        this.postMessage(res, msg, channelId);
    }

    async handleSubscribe(req: Request, res: Response): Promise<void> {
        if (req.body.text.length === 0) {
            await this.postMsgWithRepositoryList(req, res);
        } else {
            await this.postMsgWithSubscribeAdditionResult(req, res);
        }
    }

    makeRouter(): Router {
        this.router.post('/subscribe', botAuth, userAuth, this.handleSubscribe.bind(this));
        return this.router;
    }
}