import {Request, Response, Router} from "express";
import BaseController from "./BaseController";
import {userAuth} from "../middlewares/auth";


export default class SubscribeController extends BaseController {
    async postSubscribesList(req: Request, res: Response): Promise<void> {
        const subscribesList = await this.services.subscribeService.list(req.body.filters);
        res.send(subscribesList);
    }

    async postSubscribeDeleteResult(req: Request, res: Response): Promise<void> {
        const subscribeDeleteResult = await this.services.subscribeService.unsubscribe(req.body.filters);
        const code = subscribeDeleteResult ? 200 : 404;
        res.status(code).send();
    }

    makeRouter(): Router {
        this.router.post('/api/subscribes/get', userAuth, this.postSubscribesList.bind(this));
        this.router.post('/api/subscribes/delete', userAuth, this.postSubscribeDeleteResult.bind(this));
        return this.router;
    }
}