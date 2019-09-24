import {Request, Response, Router} from "express";
import BaseRouter from "./BaseRouter";
import MessageBuilder from "../templates/builders/MessageBuilder";


export default class SubscribeRouter extends BaseRouter {
    makeRouter(): Router {
        this.router.post('/subscribe', async (req: Request, res: Response) => {
            const {channel_id: channelId} = req.body;
            const button = {btnText: 'Select', btnValue: 'select'};
            const msg = await this.services.repositoryMessageAdapter.getReposListMsg(new MessageBuilder(), channelId, button);
            this.postMessage(res, msg, channelId);
        });
        return this.router;
    }
}