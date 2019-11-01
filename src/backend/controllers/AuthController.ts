import {Request, Response, Router} from "express";
import BaseController from "./BaseController";
import {botAuth} from "../middlewares/auth";
import {IJWTPayload} from "../services/slackbot/AuthService";
import URLS from "../../common/URLS";
const {JWT_DURATION} = require('../../../config');


export default class AuthController extends BaseController {
    async setJWT(req: Request, res: Response): Promise<void> {
        const sessions = await this.services.sessionService.list({filter: {sid: req.params.token}});
        if (sessions.length !== 0) {
            await this.services.sessionService.delete(sessions[0]);
            const newJWT = await this.services.authService.createJWT({channelId: sessions[0].channelId}, {expiresIn: JWT_DURATION});
            res.cookie('token', newJWT, {httpOnly: true});
            res.redirect('/');
        } else {
            res.status(401).send();
        }
    }

    async refreshJWT(req: Request, res: Response): Promise<void> {
        const oldDecodedJWT = await this.services.authService.verifyJWT(req.cookies.token) as IJWTPayload | false;
        if (oldDecodedJWT) {
            const newJWT = await this.services.authService.createJWT({channelId: oldDecodedJWT.channelId}, {expiresIn: JWT_DURATION});
            const newDecodedJWT = await this.services.authService.verifyJWT(newJWT) as IJWTPayload;
            res.cookie('token', newJWT, {httpOnly: true});
            res.status(200).send({exp: newDecodedJWT.exp});
        } else {
            res.status(401).send();
        }
    }

    async postAuthData(req: Request, res: Response): Promise<void> {
        if (req.cookies && req.cookies.token) {
            const oldDecodedJWT = await this.services.authService.verifyJWT(req.cookies.token) as IJWTPayload | false;
            if (oldDecodedJWT) {
                const users = await this.services.userService.list({filter: {channelId: oldDecodedJWT.channelId}});
                const newJWT = await this.services.authService.createJWT({channelId: oldDecodedJWT.channelId}, {expiresIn: JWT_DURATION});
                const newDecodedJWT = await this.services.authService.verifyJWT(newJWT) as IJWTPayload;
                res.cookie('token', newJWT, {httpOnly: true});
                if (users.length > 0) {
                    const user = users[0];
                    res.status(200).send({...user, exp: newDecodedJWT.exp});
                } else {
                    res.status(200).send({channelId: newDecodedJWT.channelId, exp: newDecodedJWT.exp});
                }
            } else {
                res.status(401).send();
            }
        } else {
            res.status(404).send();
        }

    }

    makeRouter(): Router {
        this.router.get(URLS.LOGIN, this.setJWT.bind(this));
        this.router.get(URLS.REFRESH, this.refreshJWT.bind(this));
        this.router.get(URLS.API_AUTH, this.postAuthData.bind(this));
        return this.router;
    }
}