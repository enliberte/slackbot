import {Request, Response, Router} from "express";
import BaseRouter from "./BaseRouter";
import MessageBuilder from "../templates/builders/MessageBuilder";
import {botAuth} from "../middlewares/auth";


export default class AuthRouter extends BaseRouter {
    makeRouter(): Router {

        this.router.post('/signup', botAuth, async (req: Request, res: Response) => {
            const {channel_id: channelId} = req.body;
            const msg = this.services.authToMessageAdapter.getCreateAuthLinkMsg(new MessageBuilder(), {channelId});
            this.postMessage(res, msg, channelId);
        });

        this.router.get('/login/:token', (req: Request, res: Response) => {
            res.cookie('token', req.params.token, {httpOnly: true});
            res.redirect(200, '/');
        });

        return this.router;
    }
}