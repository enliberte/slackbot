import {Request, Response, Router} from "express";
import BaseRouter from "./BaseRouter";
import MessageBuilder from "../templates/builders/MessageBuilder";


export default class RepoRouter extends BaseRouter {
    makeRouter(): Router {

        this.router.post('/add-repo', async (req: Request, res: Response) => {
            const {channel_id: channelId, text: reponame, user_name: addedByName} = req.body;
            const msg = await this.services.repositoryMessageAdapter.getAddResultMsg(new MessageBuilder(), {channelId, reponame, addedByName});
            this.postMessage(res, msg, channelId);
        });

        this.router.post('/repos', async (req: Request, res: Response) => {
            const {channel_id: channelId} = req.body;
            const button = {btnText: 'Delete', btnValue: 'deleteRepo'};
            const msg = await this.services.repositoryMessageAdapter.getReposListMsg(new MessageBuilder(), channelId, button);
            this.postMessage(res, msg, channelId);
        });
        return this.router;
    }
}