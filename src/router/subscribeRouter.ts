import {Request, Response, Router} from "express";
import RepoAPIToMsgAdapter from "../api/slackbot/adapters/RepoAPIToMsgAdapter";
import {postMessage} from './helpers';
import RepoAPI from "../api/admin/RepoAPI";
import RepoController from "../db/controllers/repoController";
import SubscribeController from "../db/controllers/subscribeController";
import MsgBuilder from "../templates/builders/MsgBuilder";

const SubscribeRouter = Router();

SubscribeRouter.post('/subscribe', async (req: Request, res: Response) => {
    const {channel_id} = req.body;
    const msg = await new RepoAPIToMsgAdapter(
        new RepoAPI(channel_id, new RepoController(), new SubscribeController()),
        new MsgBuilder()
    ).getReposListMsg();
    postMessage(res, msg, channel_id);
});

export default SubscribeRouter;