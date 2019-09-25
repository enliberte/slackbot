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

    async setJWT(req: Request, res: Response): Promise<void> {
        const decodedJWT = await this.services.authService.verifyJWT(req.params.token) as {channelId: string} | false;
        if (decodedJWT) {
            const token = await this.services.authService.createJWT({channelId: decodedJWT.channelId}, {expiresIn: '20m'});
            res.cookie('token', token, {httpOnly: true});
            res.redirect('/');
        } else {
            res.status(401).send();
        }
    }

    makeRouter(): Router {
        this.router.post('/signup', botAuth, this.postMsgWithAuthLink.bind(this));
        this.router.get('/login/:token', this.setJWT.bind(this));
        return this.router;
    }
}