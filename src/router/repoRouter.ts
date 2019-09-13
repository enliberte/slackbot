import {Request, Response} from "express";
import {Router} from 'express';
import RepoAPI from '../api/RepoAPI';
const postMessage = require('./helpers');

import {WebClient} from '@slack/web-api';
const {BOT_TOKEN} = require('../../config');
const web = new WebClient(BOT_TOKEN);


const RepoRouter = Router();

RepoRouter.post('/add-repo', async (req: Request, res: Response) => {
    const {channel_id, text: reponame, user_name: addedByName} = req.body;
    const msg = await new RepoAPI(channel_id).add({reponame, addedByName});
    postMessage(res, msg, channel_id);
});

RepoRouter.post('/repos', async (req: Request, res: Response) => {
    const {channel_id} = req.body;
    const msg = await new RepoAPI(channel_id).list('Delete', 'deleteRepo');
    await web.chat.postMessage({text: '', ...msg, channel: channel_id});
    res.status(200).send();
});

export default RepoRouter;