import {Request, Response, Router} from "express";
import BaseController from "./BaseController";
import {userAuth, slackAuth} from "../middlewares/auth";


export default class MainController extends BaseController {
    showMain(req: Request, res: Response): void {
        res.status(200).send('Authorized');
    }

    makeRouter(): Router {
        this.router.get('/', userAuth, this.showMain.bind(this));
        this.router.get('/slack', slackAuth);
        return this.router;
    }
}