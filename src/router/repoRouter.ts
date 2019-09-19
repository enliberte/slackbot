import {Request, Response, Router} from "express";
import RepoAPIToMsgAdapter from '../api/slackbot/adapters/RepoAPIToMsgAdapter';
import {postMessage} from './helpers';
import SubscribeController from "../db/controllers/subscribeController";
import MsgBuilder from "../templates/builders/MsgBuilder";
import RepoAPI from "../api/admin/RepoAPI";
import RepoController from "../db/controllers/repoController";

const RepoRouter = Router();

RepoRouter.post('/add-repo', async (req: Request, res: Response) => {
    const {channel_id, text: reponame, user_name: addedByName} = req.body;
    const msg = await new RepoAPIToMsgAdapter(
        new RepoAPI(channel_id, new RepoController(), new SubscribeController()),
        new MsgBuilder()
    ).getAddResultMsg({reponame, addedByName});
    postMessage(res, msg, channel_id);
});

RepoRouter.post('/repos', async (req: Request, res: Response) => {
    const {channel_id} = req.body;
    const msg = await new RepoAPIToMsgAdapter(
        new RepoAPI(channel_id, new RepoController(), new SubscribeController()),
        new MsgBuilder()
    ).getReposListMsg('Delete', 'deleteRepo');
    postMessage(res, msg, channel_id);
});

export default RepoRouter;