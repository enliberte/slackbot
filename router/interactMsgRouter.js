const express = require('express');
const {createMessageAdapter} = require('@slack/interactive-messages');
const UserAPI = require('../api/UserAPI');
const RepoAPI = require('./../api/RepoAPI');
const InteractiveMessagesRouter = express.Router();
const {SIGNING_SECRET} = require('./../config');
const slackInteractions = createMessageAdapter(SIGNING_SECRET);

const processMessages = async (payload, respond) => {
    let followed, reponame, follower;
    const value = payload.actions[0].value;
    const args = value.split('_');
    switch (args[0]) {
        case 'close':
            await respond({text: 'See you later'});
            break;
        case 'return':
            await new RepoAPI(payload.channel.id, null, respond).list();
            break;
        case 'select':
            await new UserAPI(payload.channel.id, null, respond).list(args[1]);
            break;
        case 'follow':
            [, followed, reponame] = args;
            follower = payload.user.username;
            await new SubscribeAPI(payload.channel.id, respond).subscribe({followed, follower, reponame});
            break;
        case 'unfollow':
            [, followed, reponame] = args;
            follower = payload.user.username;
            await new SubscribeAPI(payload.channel.id, respond).unsubscribe({followed, follower, reponame});
            break;
        case 'deleteRepo':
            [, reponame] = args;
            await new RepoAPI(payload.channel.id, null, respond).delete({reponame});
            break;
        case 'deleteUser':
            [, username] = args;
            await new UserAPI(payload.channel.id, null, respond).delete({username});
            break;
    }
};

InteractiveMessagesRouter.use('/interactive-messages', slackInteractions.requestListener());
slackInteractions.action({type: 'button'}, processMessages);


module.exports = {InteractiveMessagesRouter};