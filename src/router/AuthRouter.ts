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
        this.router.get('/login/:token', async (req: Request, res: Response) => {
            const channelId = await this.services.authService.signin(req.params.token);
            res.send(channelId ? channelId : 'Not authorized');
        });

        return this.router;
    }
}