const express = require('express');
const UserAPI = require('../api/UserAPI');
const {WebClient} = require('@slack/web-api');
const {BOT_TOKEN} = require('./../config');
const web = new WebClient(BOT_TOKEN);

const UserRouter = express.Router();

UserRouter.post('/add-user', async (req, res) => {
    const {channel_id, text: username, user_name: addedByName} = req.body;
    const msg = await new UserAPI(channel_id).add({username, addedByName});
    await web.chat.postMessage({...msg, channel: channel_id});
    res.status(200).send();
});

UserRouter.post('/users', async (req, res) => {
    const {channel_id} = req.body;
    const msg = new UserAPI(channel_id).list();
    await web.chat.postMessage({...msg, channel: channel_id});
    res.status(200).send();
});

module.exports = UserRouter;