const express = require('express');
const RepoAPI = require('./../api/RepoAPI');
const postMessage = require('./helpers');


const RepoRouter = express.Router();

RepoRouter.post('/add-repo', async (req, res) => {
    const {channel_id, text: reponame, user_name: addedByName} = req.body;
    const msg = await new RepoAPI(channel_id).add({reponame, addedByName});
    await postMessage(res, msg, channel_id);
});

RepoRouter.post('/repos', async (req, res) => {
    const {channel_id} = req.body;
    const msg = await new RepoAPI(channel_id).list('Delete', 'deleteRepo');
    await postMessage(res, msg, channel_id);
});

module.exports = RepoRouter;