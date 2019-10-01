import {Request, Response, Router} from "express";
import BaseController from "./BaseController";

export default class NotifyController extends BaseController {
    async notifyAboutPR(req: Request, res: Response) {
        await this.services.notifyService.notifyAboutPR(req.body);
    }

    makeRouter(): Router {
        this.router.post('/push', this.notifyAboutPR.bind(this));
        return this.router;
    }
}