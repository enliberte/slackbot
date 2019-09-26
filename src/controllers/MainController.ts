import {Request, Response, Router} from "express";
import BaseController from "./BaseController";
import {userAuth} from "../middlewares/auth";
import passport from "passport";


export default class MainController extends BaseController {
    showMain(req: Request, res: Response): void {
        res.status(200).send('Authorized');
    }

    makeRouter(): Router {
        // this.router.get('/', userAuth, this.showMain.bind(this));
        this.router.get('/', (req, res) => res.status(200).send('HI'));
        this.router.get('/slack', passport.authenticate('slack', { failureRedirect: '/login' }),
            (req, res) => res.redirect('/'));
        return this.router;
    }
}