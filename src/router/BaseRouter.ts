import Services from "../services/Services";
import {Router} from "express";
import {IBlockMessage} from "../templates/builders/elements";
import {Response} from "express";
import WebChatAdapter from "../services/slackbot/adapters/WebChatAdapter";


export interface IRouter {
    makeRouter(): Router;
}

export default abstract class BaseRouter implements IRouter {
    protected services: Services;
    protected router: Router;

    constructor(services: Services) {
        this.services = services;
        this.router = Router();
    }

    async postMessage(res: Response, msg: IBlockMessage, channelId: string): Promise<void> {
        await new WebChatAdapter().post({text: '', msg, channelId});
        res.status(200).send();
    }

    abstract makeRouter(): Router;
}