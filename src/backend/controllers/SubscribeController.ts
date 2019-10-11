import {Request, Response, Router} from "express";
import BaseController from "./BaseController";
import {userAuth} from "../middlewares/auth";
import URLS from "../../common/URLS";


export default class SubscribeController extends BaseController {
    async postSubscribesList(req: Request, res: Response): Promise<void> {
        const {search, limit, ...filter} = req.query;
        const subscribesList = await this.services.subscribeService.list({search, limit, filter});
        res.send(subscribesList);
    }

    async postAddSubscribeResult(req: Request, res: Response): Promise<void> {
        const addSubscribeResult = await this.services.subscribeService.subscribe(req.body);
        res.send(addSubscribeResult);
    }

    async postEditSubscribeResult(req: Request, res: Response): Promise<void> {
        const editSubscribeResult = await this.services.subscribeService.editSubscribe({...req.body, id: req.params.id});
        res.send(editSubscribeResult);
    }

    async postSubscribeDeleteResult(req: Request, res: Response): Promise<void> {
        const subscribeDeleteResult = await this.services.subscribeService.unsubscribe(req.query);
        const code = subscribeDeleteResult ? 200 : 404;
        res.status(code).send();
    }

    makeRouter(): Router {
        this.router.get(URLS.API_SUBSCRIBES, userAuth, this.postSubscribesList.bind(this));
        this.router.post(URLS.API_SUBSCRIBES, userAuth, this.postAddSubscribeResult.bind(this));
        this.router.put(`${URLS.API_SUBSCRIBES}/:id`, userAuth, this.postEditSubscribeResult.bind(this));
        this.router.delete(URLS.API_SUBSCRIBES, userAuth, this.postSubscribeDeleteResult.bind(this));
        return this.router;
    }
}