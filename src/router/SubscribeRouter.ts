import {Request, Response, Router} from "express";
import BaseRouter from "./BaseRouter";
import MessageBuilder from "../templates/builders/MessageBuilder";
import {botAuth, userAuth} from "../middlewares/auth";


export default class SubscribeRouter extends BaseRouter {
    async postMsgWithRepositoryList(req: Request, res: Response): Promise<void>{
        console.log('-----------------------------------------------');
        console.log(req.body);
        console.log('-----------------------------------------------');
        const {channel_id: channelId} = req.body;
        const button = {btnText: 'Select', btnValue: 'select'};
        const msg = await this.services.repositoryMessageAdapter.getReposListMsg(new MessageBuilder(), channelId, button);
        this.postMessage(res, msg, channelId);
    }

    makeRouter(): Router {
        this.router.post('/subscribe', botAuth, userAuth, this.postMsgWithRepositoryList.bind(this));
        return this.router;
    }
}