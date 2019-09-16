import {Request, Response, Router} from "express";
import RepoAPI from '../api/RepoAPI';
import postMessage from './helpers';

const RepoRouter = Router();

RepoRouter.post('/add-repo', async (req: Request, res: Response) => {
    const {channel_id, text: reponame, user_name: addedByName} = req.body;
    const msg = await new RepoAPI(channel_id).add({reponame, addedByName});
    postMessage(res, msg, channel_id);
});

RepoRouter.post('/repos', async (req: Request, res: Response) => {
    const {channel_id} = req.body;
    const msg = await new RepoAPI(channel_id).list('Delete', 'deleteRepo');
    postMessage(res, msg, channel_id);
});

export default RepoRouter;