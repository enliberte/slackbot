import {Request, Response, Router} from "express";
import BaseController from "./BaseController";
import * as path from "path";
const {PUBLIC} = require('../../../config');


export default class MainController extends BaseController {

    async postIndex(req: Request, res: Response): Promise<void> {
        console.log(PUBLIC);
        res.sendFile(path.resolve(PUBLIC, 'index.html'));
    }

    makeRouter(): Router {
        this.router.get('*', this.postIndex.bind(this));
        return this.router;
    }
}