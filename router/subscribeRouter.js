const express = require('express');
const RepoAPI = require('./../api/RepoAPI');
const postMessage = require('./helpers');

const SubscribeRouter = express.Router();

SubscribeRouter.post('/subscribe', async (req, res) => {
    const {channel_id} = req.body;
    const msg = await new RepoAPI(channel_id).list();
    await postMessage(res, msg, channel_id);
});

module.exports = SubscribeRouter;