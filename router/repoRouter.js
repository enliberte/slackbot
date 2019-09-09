const express = require('express');
const RepoAPI = require('./../api/RepoAPI');
const {WebClient} = require('@slack/web-api');
const {BOT_TOKEN} = require('./../config');
const web = new WebClient(BOT_TOKEN);


const RepoRouter = express.Router();

RepoRouter.post('/add-repo', async (req, res) => {
    const {channel_id, text: reponame, user_name: addedByName} = req.body;
    const msg = await new RepoAPI(channel_id).add({reponame, addedByName});
    await web.chat.postMessage({...msg, channel: channel_id});
    res.status(200).send();
});

RepoRouter.post('/repos', async (req, res) => {
    const {channel_id} = req.body;
    const msg = await new RepoAPI(channel_id).list('Delete', 'deleteRepo');
    await web.chat.postMessage({...msg, channel: channel_id});
    res.status(200).send();
});

module.exports = RepoRouter;