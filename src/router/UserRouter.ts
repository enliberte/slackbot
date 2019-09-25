import {Request, Response, Router} from "express";
import BaseRouter from "./BaseRouter";
import MessageBuilder from "../templates/builders/MessageBuilder";
import {botAuth} from "../middlewares/auth";


export default class UserRouter extends BaseRouter {
    async postMsgWithUserAdditionResult(req: Request, res: Response): Promise<void> {
        const {channel_id: channelId, text: username, user_name: addedByName} = req.body;
        const msg = await this.services.userMessageAdapter.getAddResultMsg(new MessageBuilder(), {channelId, username, addedByName});
        this.postMessage(res, msg, channelId);
    }

    async postMsgWithUsersList(req: Request, res: Response): Promise<void> {
        const {channel_id: channelId} = req.body;
        const msg = await this.services.userMessageAdapter.getUsersListMsg(new MessageBuilder(), channelId);
        this.postMessage(res, msg, channelId);
    }

    makeRouter(): Router {
        this.router.post('/add-user', botAuth, this.postMsgWithUserAdditionResult.bind(this));
        this.router.post('/users', botAuth, this.postMsgWithUsersList.bind(this));
        return this.router;
    }
}