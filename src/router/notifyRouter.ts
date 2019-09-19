import {Request, Response, Router} from "express";
import NotifyAPI from '../api/slackbot/NotifyAPI';
import SubscribeController from "../db/controllers/subscribeController";

const NotifyRouter = Router();

NotifyRouter.post('/push', async (req: Request, res: Response) => {
    await new NotifyAPI(new SubscribeController()).notifyAboutPR(req.body);
});

export default NotifyRouter;