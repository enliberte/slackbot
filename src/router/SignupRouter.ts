import {Request, Response, Router} from "express";
import BaseRouter from "./BaseRouter";

export default class SignupRouter extends BaseRouter {
    makeRouter(): Router {
        this.router.post('/signup', async (req: Request, res: Response) => {
            const {channel_id: channelId} = req.body;
            const url = await this.services.signupService.signup(channelId);
            console.log('-----------------------------------------------------------');
            console.log(url);
            console.log('-----------------------------------------------------------');
        });
        return this.router;
    }
}