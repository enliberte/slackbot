import {Request, Response} from "express";
import BaseRouter from "./BaseRouter";

export default class NotifyRouter extends BaseRouter {
    addListeners(): void {
        this.router.post('/push', async (req: Request, res: Response) => {
            await this.api.notify.notifyAboutPR(req.body);
        });
    }
}