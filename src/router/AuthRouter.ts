import {Request, Response, Router} from "express";
import BaseRouter from "./BaseRouter";
import MessageBuilder from "../templates/builders/MessageBuilder";


export default class AuthRouter extends BaseRouter {
    makeRouter(): Router {

        this.router.post('/signup', async (req: Request, res: Response) => {
            const {channel_id: channelId} = req.body;
            const msg = await this.services.authToMessageAdapter.getCreateAuthLinkMsg(new MessageBuilder(), channelId);
            this.postMessage(res, msg, channelId);
        });

        return this.router;
    }
}