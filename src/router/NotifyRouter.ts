import {Request, Response, Router} from "express";
import BaseRouter from "./BaseRouter";

export default class NotifyRouter extends BaseRouter {
    makeRouter(): Router {
        this.router.post('/push', async (req: Request, res: Response) => {
            await this.services.notifyService.notifyAboutPR(req.body);
        });
        return this.router;
    }
}