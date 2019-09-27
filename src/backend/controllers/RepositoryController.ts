import {Request, Response, Router} from "express";
import BaseController from "./BaseController";
import MessageBuilder from "../services/slackbot/templates/builders/MessageBuilder";
import {botAuth, userAuth} from "../middlewares/auth";


export default class RepositoryController extends BaseController {
    async postMsgWithRepositoryAdditionResult(req: Request, res: Response): Promise<void> {
        const {channel_id: channelId, text: reponame, user_name: addedByName} = req.body;
        const msg = await this.services.repositoryMessageAdapter
            .getAddResultMsg(new MessageBuilder(), {channelId, reponame, addedByName});
        this.postMessage(res, msg, channelId);
    }

    async postMsgWithRepositoryList (req: Request, res: Response): Promise<void> {
        const {channel_id: channelId} = req.body;
        const button = {btnText: 'Delete', btnValue: 'deleteRepo'};
        const msg = await this.services.repositoryMessageAdapter.getReposListMsg(new MessageBuilder(), channelId, button);
        this.postMessage(res, msg, channelId);
    }

    async postRepositoriesList(req: Request, res: Response): Promise<void> {
        const {channelId} = req.body.filters;
        const repositoriesList = await this.services.repositoryService.list(channelId);
        res.send(repositoriesList);
    }

    makeRouter(): Router {
        this.router.post('/add-repository', botAuth, this.postMsgWithRepositoryAdditionResult.bind(this));
        this.router.post('/repositories', botAuth, this.postMsgWithRepositoryList.bind(this));
        this.router.post('/api/repositories/get', userAuth, this.postRepositoriesList.bind(this));
        return this.router;
    }
}