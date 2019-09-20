import {Request, Response} from "express";
import {postMessage} from './helpers';
import BaseRouter from "./BaseRouter";


export default class UserRouter extends BaseRouter {
    addListeners(): void {

        this.router.post('/add-user', async (req: Request, res: Response) => {
            const {channel_id: channelId, text: username, user_name: addedByName} = req.body;
            const msg = await this.api.userMsg.getAddResultMsg({channelId, username, addedByName});
            postMessage(res, msg, channelId);
        });

        this.router.post('/users', async (req: Request, res: Response) => {
            const {channel_id: channelId} = req.body;
            const msg = await this.api.userMsg.getUsersListMsg(channelId);
            postMessage(res, msg, channelId);
        });

    }
}