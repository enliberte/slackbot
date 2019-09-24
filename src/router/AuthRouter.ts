import {Request, Response, Router} from "express";
import BaseRouter from "./BaseRouter";
import MessageBuilder from "../templates/builders/MessageBuilder";

export default class AuthRouter extends BaseRouter {
    makeRouter(): Router {
        this.router.post('/signup', async (req: Request, res: Response) => {
            const {channel_id: channelId} = req.body;
            const msg = await this.services.authToMessageAdapter.getSignupMsg(new MessageBuilder(), channelId);
            this.postMessage(res, msg, channelId);
        });
        this.router.get('/login/:hash', async (req: Request, res: Response) => {
            const channelId = await this.services.authService.signin(req.params.hash);
            res.send(channelId ? channelId : 'not authorized');
        });

        return this.router;
    }
}