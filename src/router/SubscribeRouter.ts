import {Request, Response} from "express";
import {postMessage} from './helpers';
import BaseRouter from "./BaseRouter";


export default class SubscribeRouter extends BaseRouter {
    addListeners(): void {
        this.router.post('/subscribe', async (req: Request, res: Response) => {
            const {channel_id: channelId} = req.body;
            const button = {btnText: 'Select', btnValue: 'select'};
            const msg = await this.api.repoMsg.getReposListMsg(channelId, button);
            postMessage(res, msg, channelId);
        });
    }
}