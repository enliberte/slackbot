const express = require('express');
const RepoAPI = require('./../api/RepoAPI');

const RepoRouter = express.Router();

RepoRouter.post('/add-repo', async (req, res) => {
    const {channel_id, text: reponame, user_name: addedByName} = req.body;
    await new RepoAPI(channel_id, res).add({reponame, addedByName});
});

RepoRouter.post('/repos', async (req, res) => {
    const {channel_id} = req.body;
    await new RepoAPI(channel_id, res).list('Delete', 'deleteRepo');
});

module.exports = RepoRouter;