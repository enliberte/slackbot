const express = require('express');
const {RepoAPI} = require('./../api');

const SubscribeRouter = express.Router();

SubscribeRouter.post('/subscribe', async (req, res) => {
    const {channel_id} = req.body;
    await new RepoAPI(channel_id, res).list();
});

module.exports = SubscribeRouter;