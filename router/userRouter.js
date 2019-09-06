const express = require('express');
const UserAPI = require('./../api/UsersAPI');

const UserRouter = express.Router();

UserRouter.post('/add-user', async (req, res) => {
    const {channel_id, text: username, user_name: addedByName} = req.body;
    await new UserAPI(channel_id, res).add({username, addedByName});
});

UserRouter.post('/users', async (req, res) => {
    const {channel_id} = req.body;
    new UserAPI(channel_id, res).list();
});

module.exports = UserRouter;