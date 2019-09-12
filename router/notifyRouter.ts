import {Request, Response, Router} from "express";
import NotifyAPI from '../api/NotifyAPI';

const NotifyRouter = Router();

NotifyRouter.post('/push', async (req: Request, res: Response) => {
    await new NotifyAPI().notifyAboutPR(req.body);
});

export default NotifyRouter;