import {Request, Response, Router} from "express";
import BaseRouter from "./BaseRouter";
import {botAuth, userAuth} from "../middlewares/auth";


export default class MainRouter extends BaseRouter {
    showMain(req: Request, res: Response): void {
        res.status(200).send('Authorized');
    }

    makeRouter(): Router {
        this.router.get('/', userAuth, this.showMain.bind(this));
        return this.router;
    }
}