import {Request, Response, Router} from "express";
import BaseRouter from "./BaseRouter";
import MessageBuilder from "../templates/builders/MessageBuilder";


export default class UserRouter extends BaseRouter {
    makeRouter(): Router {

        this.router.post('/add-user', async (req: Request, res: Response) => {
            const {channel_id: channelId, text: username, user_name: addedByName} = req.body;
            const msg = await this.services.userMessageAdapter.getAddResultMsg(new MessageBuilder(), {channelId, username, addedByName});
            this.postMessage(res, msg, channelId);
        });

        this.router.post('/users', async (req: Request, res: Response) => {
            const {channel_id: channelId} = req.body;
            const msg = await this.services.userMessageAdapter.getUsersListMsg(new MessageBuilder(), channelId);
            this.postMessage(res, msg, channelId);
        });

        return this.router;
    }
}