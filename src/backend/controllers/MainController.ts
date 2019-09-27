import express, {Request, Response, Router} from "express";
const path = require('path');
import BaseController from "./BaseController";
import {userAuth} from "../middlewares/auth";


export default class MainController extends BaseController {
    showMain(req: Request, res: Response): void {
        express.static(__dirname + '/dist');
        res.sendFile(path.resolve(__dirname + '/dist', 'index.html'));
    }

    makeRouter(): Router {
        this.router.get('/', userAuth, this.showMain.bind(this));
        return this.router;
    }
}