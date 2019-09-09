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
            new RepoAPI(payload.channel.id).list()
                .then(msg => respond({...msg, replace_original: true}))
                .catch(err => console.log('RETURN', err));
            break;
        case 'select':
            new UserAPI(payload.channel.id).list(args[1])
                .then(msg => respond({...msg, replace_original: true}))
                .catch(err => console.log('SELECT', err));
            break;
        case 'follow':
            new SubscribeAPI(payload.channel.id).subscribe({
                followed: args[1], follower: payload.user.username, reponame: args[2]
            })
                .then(() => new UserAPI(payload.channel.id).list(args[2]))
                .then(msg => {
                    console.log(JSON.stringify(msg));
                    respond({...msg, replace_original: true})
                })
                .catch(err => console.log('FOLLOW', err));
            break;
        case 'unfollow':
            new SubscribeAPI(payload.channel.id).unsubscribe({
                followed: args[1], follower: payload.user.username, reponame: args[2]
            })
                .then(() => new UserAPI(payload.channel.id).list(args[2]))
                .then(msg => {
                    console.log(JSON.stringify(msg));
                    respond({...msg, replace_original: true})
                })
                .catch(err => console.log('UNFOLLOW', err));
            break;
        case 'deleteRepo':
            new RepoAPI(payload.channel.id).delete({reponame: args[1]})
                .then(() => new RepoAPI(payload.channel.id).list('Delete', 'deleteRepo'))
                .then(msg => respond(msg))
                .catch(err => console.log('DELETE REPO', err));
            break;
        case 'deleteUser':
            new UserAPI(payload.channel.id, null, respond).delete({username: args[1]})
                .then(() => new UserAPI(payload.channel.id).list())
                .then(msg => respond({...msg, replace_original: true}))
                .catch(err => console.log('DELETE USER', err));
            break;
    }
};

InteractiveMessagesRouter.use('/interactive-messages', slackInteractions.requestListener());
slackInteractions.action({type: 'button'}, processMessages);


module.exports = InteractiveMessagesRouter;