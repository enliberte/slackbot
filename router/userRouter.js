const express = require('express');
const UserAPI = require('../api/UserAPI');
const postMessage = require('./helpers');

const UserRouter = express.Router();

UserRouter.post('/add-user', async (req, res) => {
    const {channel_id, text: username, user_name: addedByName} = req.body;
    const msg = await new UserAPI(channel_id).add({username, addedByName});
    await postMessage(res, msg, channel_id);
});

UserRouter.post('/users', async (req, res) => {
    const {channel_id} = req.body;
    const msg = await new UserAPI(channel_id).list();
    await postMessage(res, msg, channel_id);
});

module.exports = UserRouter;