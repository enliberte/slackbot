import {Request, Response, Router} from "express";
import BaseController from "./BaseController";
import {userAuth} from "../middlewares/auth";
import URLS from "../../common/URLS";


export default class UserController extends BaseController {

    async postAddUserResult(req: Request, res: Response): Promise<void> {
        const addUserResult = await this.services.userService.add(req.body);
        const isError = typeof addUserResult === 'string';
        const code = isError ? 404 : 200;
        res.status(code).send(addUserResult);
    }

    makeRouter(): Router {
        this.router.post(URLS.API_USERS, userAuth, this.postAddUserResult.bind(this));
        return this.router;
    }
}