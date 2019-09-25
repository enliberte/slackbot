import {Request, Response, Router} from "express";
import BaseRouter from "./BaseRouter";
import MessageBuilder from "../services/slackbot/templates/builders/MessageBuilder";
import {botAuth} from "../middlewares/auth";
import buildSlashCommandsList from "../services/slackbot/templates/common/buildSlashCommandsList";


export default class HelpRouter extends BaseRouter {
    postMsgWithSlashCommands(req: Request, res: Response): void {
        const {channel_id: channelId} = req.body;
        const msg = buildSlashCommandsList(new MessageBuilder());
        this.postMessage(res, msg, channelId);
    }

    makeRouter(): Router {
        this.router.post('/help', botAuth, this.postMsgWithSlashCommands.bind(this));
        return this.router;
    }
}