import {Request, Response, Router} from "express";
import BaseController from "./BaseController";
import MessageBuilder from "../services/slackbot/templates/builders/MessageBuilder";
import {botAuth, userAuth} from "../middlewares/auth";


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

    async postDevelopersList(req: Request, res: Response): Promise<void> {
        const {channelId} = req.body.filters;
        const developersList = await this.services.developerService.list(channelId);
        res.send(developersList);
    }

    async postDeveloperDeleteResult(req: Request, res: Response): Promise<void> {
        const developerDeleteResult = await this.services.developerService.delete(req.body.filters);
        const code = developerDeleteResult ? 200 : 404;
        res.status(code).send();
    }

    makeRouter(): Router {
        this.router.post('/add-developer', botAuth, this.postMsgWithDeveloperAdditionResult.bind(this));
        this.router.post('/developers', botAuth, this.postMsgWithDevelopersList.bind(this));
        this.router.post('/api/developers/get', userAuth, this.postDevelopersList.bind(this));
        this.router.post('/api/developers/delete', userAuth, this.postDeveloperDeleteResult.bind(this));
        return this.router;
    }
}