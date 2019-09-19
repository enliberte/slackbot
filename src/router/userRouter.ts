import {Request, Response, Router} from 'express';
import UserAPIToMsgAdapter from '../api/slackbot/adapters/UserAPIToMsgAdapter';
import {postMessage} from './helpers';
import UserAPI from "../api/admin/UserAPI";
import UserController from "../db/controllers/userController";
import SubscribeController from "../db/controllers/subscribeController";
import MsgBuilder from "../templates/builders/MsgBuilder";

const UserRouter = Router();

UserRouter.post('/add-user', async (req: Request, res: Response) => {
    const {channel_id, text: username, user_name: addedByName} = req.body;
    const msg = await new UserAPIToMsgAdapter(
        new UserAPI(channel_id, new UserController(), new SubscribeController()),
        new MsgBuilder()
    ).getAddResultMsg({username, addedByName});
    postMessage(res, msg, channel_id);
});

UserRouter.post('/users', async (req: Request, res: Response) => {
    const {channel_id} = req.body;
    const msg = await new UserAPIToMsgAdapter(
        new UserAPI(channel_id, new UserController(), new SubscribeController()),
        new MsgBuilder()
    ).getUsersListMsg();
    postMessage(res, msg, channel_id);
});

export default UserRouter;