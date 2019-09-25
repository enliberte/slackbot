import {Request, Response, Router} from "express";
import BaseRouter from "./BaseRouter";
import MessageBuilder from "../templates/builders/MessageBuilder";
import {botAuth} from "../middlewares/auth";


export default class AuthRouter extends BaseRouter {
    async postMsgWithAuthLink(req: Request, res: Response): Promise<void> {
        const {channel_id: channelId} = req.body;
        const msg = this.services.authToMessageAdapter.getCreateAuthLinkMsg(new MessageBuilder(), {channelId});
        this.postMessage(res, msg, channelId);
    }

    setJWT(req: Request, res: Response): void {
        res.cookie('token', req.params.token, {httpOnly: true});
        res.redirect(200, '/');
    }

    makeRouter(): Router {
        this.router.post('/signup', botAuth, this.postMsgWithAuthLink);
        this.router.get('/login/:token', this.setJWT);
        return this.router;
    }
}