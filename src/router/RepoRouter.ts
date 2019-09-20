import {Request, Response} from "express";
import {postMessage} from './helpers';
import BaseRouter from "./BaseRouter";


export default class RepoRouter extends BaseRouter {
    addListeners(): void {

        this.router.post('/add-repo', async (req: Request, res: Response) => {
            const {channel_id: channelId, text: reponame, user_name: addedByName} = req.body;
            const msg = await this.api.repoMsg.getAddResultMsg({channelId, reponame, addedByName});
            postMessage(res, msg, channelId);
        });

        this.router.post('/repos', async (req: Request, res: Response) => {
            const {channelId} = req.body;
            const button = {btnText: 'Delete', btnValue: 'deleteRepo'};
            const msg = await this.api.repoMsg.getReposListMsg(channelId, button);
            postMessage(res, msg, channelId);
        });

    }
}