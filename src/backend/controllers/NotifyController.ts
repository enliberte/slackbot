import {Request, Response, Router} from "express";
import BaseController from "./BaseController";

export default class NotifyController extends BaseController {
    async notifyAboutPR(req: Request, res: Response) {
        console.log(JSON.stringify(req.body, null, 2));
        await this.services.notifyService.notify(req.body);
    }

    makeRouter(): Router {
        this.router.post('/push', this.notifyAboutPR.bind(this));
        return this.router;
    }
}