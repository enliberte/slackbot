import {Request, Response, Router} from "express";
import BaseController from "./BaseController";
import MessageBuilder from "../services/slackbot/templates/builders/MessageBuilder";
import {botAuth} from "../middlewares/auth";
import {IJWTPayload} from "../services/slackbot/AuthService";


export default class AuthController extends BaseController {
    async postMsgWithAuthLink(req: Request, res: Response): Promise<void> {
        const {channel_id: channelId, user_name: username} = req.body;
        const msg = this.services.authToMessageAdapter.getCreateAuthLinkMsg(new MessageBuilder(), {channelId, username});
        this.postMessage(res, msg, channelId);
    }

    async setJWT(req: Request, res: Response): Promise<void> {
        const decodedJWT = await this.services.authService.verifyJWT(req.params.token) as IJWTPayload | false;
        if (decodedJWT) {
            const token = await this.services.authService.createJWT({
                channelId: decodedJWT.channelId, username: decodedJWT.username
            }, {expiresIn: '20m'});
            res.cookie('token', token, {httpOnly: true});
            res.redirect('/');
        } else {
            res.status(401).send();
        }
    }

    async postAuthData(req: Request, res: Response): Promise<void> {
        if (req.cookies && req.cookies.token) {
            const decodedJWT = await this.services.authService.verifyJWT(req.cookies.token) as IJWTPayload | false;
            if (decodedJWT) {
                res.status(200).send({channelId: decodedJWT.channelId, username: decodedJWT.username});
            } else {
                res.status(401).send();
            }
        } else {
            res.status(404).send();
        }

    }

    makeRouter(): Router {
        this.router.post('/signup', botAuth, this.postMsgWithAuthLink.bind(this));
        this.router.get('/login/:token', this.setJWT.bind(this));
        this.router.get('/auth', this.postAuthData.bind(this));
        return this.router;
    }
}