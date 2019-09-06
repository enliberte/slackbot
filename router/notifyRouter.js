const express = require('express');
const NotifyAPI = require('./../api/NotifyAPI');

const NotifyRouter = express.Router();

NotifyRouter.post('/push', async (req, res) => {
    await new NotifyAPI().notifyAboutPR(req.body);
});

module.exports = NotifyRouter;