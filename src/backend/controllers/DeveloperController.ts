import {Request, Response, Router} from "express";
import BaseController from "./BaseController";
import MessageBuilder from "../services/slackbot/templates/builders/MessageBuilder";
import {botAuth} from "../middlewares/auth";


export default class DeveloperController extends BaseController {
    async postMsgWithDeveloperAdditionResult(req: Request, res: Response): Promise<void> {
        const {channel_id: channelId, text: username, user_name: addedByName} = req.body;
        const msg = await this.services.developerMessageAdapter.getAddResultMsg(new MessageBuilder(), {channelId, username, addedByName});
        this.postMessage(res, msg, channelId);
    }

    async postMsgWithDevelopersList(req: Request, res: Response): Promise<void> {
        const {channel_id: channelId} = req.body;
        const msg = await this.services.developerMessageAdapter.getDevelopersListMsg(new MessageBuilder(), channelId);
        this.postMessage(res, msg, channelId);
    }

    makeRouter(): Router {
        this.router.post('/add-developer', botAuth, this.postMsgWithDeveloperAdditionResult.bind(this));
        this.router.post('/developers', botAuth, this.postMsgWithDevelopersList.bind(this));
        return this.router;
    }
}