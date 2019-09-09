const express = require('express');
const RepoAPI = require('./../api/RepoAPI');
const {WebClient} = require('@slack/web-api');
const {BOT_TOKEN} = require('./../config');
const web = new WebClient(BOT_TOKEN);

const SubscribeRouter = express.Router();

SubscribeRouter.post('/subscribe', async (req, res) => {
    const {channel_id} = req.body;
    const msg = await new RepoAPI(channel_id).list();
    await web.chat.postMessage({...msg, channel: channel_id});
    res.status(200).send();
});

module.exports = SubscribeRouter;