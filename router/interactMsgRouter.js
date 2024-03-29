const express = require('express');
const {createMessageAdapter} = require('@slack/interactive-messages');
const UserAPI = require('../api/UserAPI');
const RepoAPI = require('./../api/RepoAPI');
const SubscribeAPI = require('./../api/SubscribeAPI');
const InteractiveMessagesRouter = express.Router();
const {SIGNING_SECRET} = require('./../config');
const slackInteractions = createMessageAdapter(SIGNING_SECRET);

const getMsg = async (promise) => ({...await promise, replace_original: true});

const processMessages = async (payload, respond) => {
    const value = payload.actions[0].value;
    const args = value.split('_');
    switch (args[0]) {
        case 'close':
            respond({text: 'See you later'});
            break;
        case 'return':
            respond(await getMsg(new RepoAPI(payload.channel.id).list()));
            break;
        case 'select':
            respond(await getMsg(new UserAPI(payload.channel.id).list(args[1])));
            break;
        case 'follow':
            await new SubscribeAPI(payload.channel.id).subscribe({
                followed: args[1], follower: payload.user.username, reponame: args[2]
            });
            respond(await getMsg(new UserAPI(payload.channel.id).list(args[2])));
            break;
        case 'unfollow':
            await new SubscribeAPI(payload.channel.id).unsubscribe({
                followed: args[1], follower: payload.user.username, reponame: args[2]
            });
            respond(await getMsg(new UserAPI(payload.channel.id).list(args[2])));
            break;
        case 'deleteRepo':
            await new RepoAPI(payload.channel.id).delete({reponame: args[1]});
            respond(await getMsg(new RepoAPI(payload.channel.id).list('Delete', 'deleteRepo')));
            break;
        case 'deleteUser':
            await new UserAPI(payload.channel.id, null, respond).delete({username: args[1]});
            respond(await getMsg(new UserAPI(payload.channel.id).list()));
            break;
    }
};

InteractiveMessagesRouter.use('/interactive-messages', slackInteractions.requestListener());
slackInteractions.action({type: 'button'}, processMessages);


module.exports = InteractiveMessagesRouter;