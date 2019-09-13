import {Request, Response, Router} from 'express';
import UserAPI from '../api/UserAPI';
import postMessage from './helpers';

const UserRouter = Router();

UserRouter.post('/add-user', async (req: Request, res: Response) => {
    const {channel_id, text: username, user_name: addedByName} = req.body;
    const msg = await new UserAPI(channel_id).add({username, addedByName});
    postMessage(res, msg, channel_id);
});

UserRouter.post('/users', async (req: Request, res: Response) => {
    const {channel_id} = req.body;
    const msg = await new UserAPI(channel_id).list();
    postMessage(res, msg, channel_id);
});

export default UserRouter;