import {Request, Response, Router} from "express";
import BaseController from "./BaseController";
import MessageBuilder from "../services/slackbot/templates/builders/MessageBuilder";
import {botAuth, userAuth} from "../middlewares/auth";


export default class SubscribeController extends BaseController {
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

    async postSubscribesList(req: Request, res: Response): Promise<void> {
        const subscribesList = await this.services.subscribeService.list(req.body.filters);
        res.send(subscribesList);
    }

    async handleSubscribe(req: Request, res: Response): Promise<void> {
        if (req.body.text.length === 0) {
            await this.postMsgWithRepositoryList(req, res);
        } else {
            await this.postMsgWithSubscribeAdditionResult(req, res);
        }
    }

    makeRouter(): Router {
        this.router.post('/subscribe', botAuth, this.handleSubscribe.bind(this));
        this.router.post('/api/subscribes/get', userAuth, this.postSubscribesList.bind(this));
        return this.router;
    }
}