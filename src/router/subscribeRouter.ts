import {Request, Response, Router} from "express";
import RepoAPI from "../api/RepoAPI";
import postMessage from './helpers';

const SubscribeRouter = Router();

SubscribeRouter.post('/subscribe', async (req: Request, res: Response) => {
    const {channel_id} = req.body;
    const msg = await new RepoAPI(channel_id).list();
    postMessage(res, msg, channel_id);
});

export default SubscribeRouter;