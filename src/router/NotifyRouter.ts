import {Request, Response, Router} from "express";
import BaseRouter from "./BaseRouter";

export default class NotifyRouter extends BaseRouter {
    async notifyAboutPR(req: Request, res: Response) {
        await this.services.notifyService.notifyAboutPR(req.body);
    }

    makeRouter(): Router {
        this.router.post('/push', this.notifyAboutPR);
        return this.router;
    }
}