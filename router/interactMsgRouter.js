const express = require('express');
const {createMessageAdapter} = require('@slack/interactive-messages');
const UserAPI = require('../api/UserAPI');
const RepoAPI = require('./../api/RepoAPI');
const SubscribeAPI = require('./../api/SubscribeAPI');
const InteractiveMessagesRouter = express.Router();
const {SIGNING_SECRET} = require('./../config');
const slackInteractions = createMessageAdapter(SIGNING_SECRET);

const processMessages = (payload, respond) => {
    const value = payload.actions[0].value;
    const args = value.split('_');
    switch (args[0]) {
        case 'close':
            respond({text: 'See you later'});
            break;
        case 'return':
            new RepoAPI(payload.channel.id, null, respond).list();
            break;
        case 'select':
            new UserAPI(payload.channel.id, null, respond).list(args[1]);
            break;
        case 'follow':
            new SubscribeAPI(payload.channel.id, respond).subscribe({
                followed: args[1], follower: payload.user.username, reponame: args[2]
            });
            break;
        case 'unfollow':
            new SubscribeAPI(payload.channel.id, respond).unsubscribe({
                followed: args[1], follower: payload.user.username, reponame: args[2]
            });
            break;
        case 'deleteRepo':
            new RepoAPI(payload.channel.id, null, respond).delete({reponame: args[1]});
            break;
        case 'deleteUser':
            new UserAPI(payload.channel.id, null, respond).delete({username: args[1]});
            break;
    }
    return {text: 'Processing...'};
};

InteractiveMessagesRouter.use('/interactive-messages', slackInteractions.requestListener());
slackInteractions.action({type: 'button'}, processMessages);


module.exports = InteractiveMessagesRouter;