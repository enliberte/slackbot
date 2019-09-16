import {IBlockMessage} from "../templates/builders/elements";
import {Router} from "express";
import {createMessageAdapter} from '@slack/interactive-messages';
import UserAPI from '../api/UserAPI';
import RepoAPI from '../api/RepoAPI';
import SubscribeAPI from '../api/SubscribeAPI';
const InteractiveMessagesRouter = Router();
const {SIGNING_SECRET} = require('../../config');
const slackInteractions = createMessageAdapter(SIGNING_SECRET);

const getMsg = async (promise: Promise<IBlockMessage>) => ({...await promise, replace_original: true});

const processMessages = async (payload: any, respond: any) => {
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
            const msg = await new UserAPI(payload.channel.id).list(args[1]);
            console.log('---------------------------------------------------');
            console.log('SELECT');
            console.log(JSON.stringify(msg));
            console.log('---------------------------------------------------');
            respond(await new UserAPI(payload.channel.id).list(args[1]));
            break;
        case 'follow':
            await new SubscribeAPI().subscribe({
                channelId: payload.channel.id, followed: args[1], follower: payload.user.username, reponame: args[2]
            });
            respond(await getMsg(new UserAPI(payload.channel.id).list(args[2])));
            break;
        case 'unfollow':
            await new SubscribeAPI().unsubscribe({
                channelId: payload.channel.id, followed: args[1], follower: payload.user.username, reponame: args[2]
            });
            respond(await getMsg(new UserAPI(payload.channel.id).list(args[2])));
            break;
        case 'deleteRepo':
            await new RepoAPI(payload.channel.id).delete({reponame: args[1]});
            respond(await getMsg(new RepoAPI(payload.channel.id).list('Delete', 'deleteRepo')));
            break;
        case 'deleteUser':
            await new UserAPI(payload.channel.id).delete({username: args[1]});
            respond(await getMsg(new UserAPI(payload.channel.id).list()));
            break;
    }
};

InteractiveMessagesRouter.use('/interactive-messages', slackInteractions.requestListener());
slackInteractions.action({type: 'button'}, processMessages);


export default InteractiveMessagesRouter;