import {Request, Response, Router} from "express";
import BaseRouter from "./BaseRouter";
import MessageBuilder from "../templates/builders/MessageBuilder";
import {botAuth} from "../middlewares/auth";
import {sign, verify} from 'jsonwebtoken';
const {JWT_SECRET} = require('../../config');


export default class AuthRouter extends BaseRouter {
    async postMsgWithAuthLink(req: Request, res: Response): Promise<void> {
        const {channel_id: channelId} = req.body;
        const msg = this.services.authToMessageAdapter.getCreateAuthLinkMsg(new MessageBuilder(), {channelId});
        this.postMessage(res, msg, channelId);
    }

    async setJWT(req: Request, res: Response): Promise<void> {
        try {
            const decodedJWT = verify(req.params.token, JWT_SECRET) as {channelId: string};
            const token = sign({channelId: decodedJWT.channelId}, JWT_SECRET, {expiresIn: '20m'});
            res.cookie('token', token, {httpOnly: true});
        } catch (e) {
            res.status(401).send();
        }
        res.redirect(200, '/');
    }

    makeRouter(): Router {
        this.router.post('/signup', botAuth, this.postMsgWithAuthLink.bind(this));
        this.router.get('/login/:token', this.setJWT.bind(this));
        return this.router;
    }
}