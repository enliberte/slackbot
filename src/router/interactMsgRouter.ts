import {IBlockMessage} from "../templates/builders/elements";
import {Router} from "express";
import {createMessageAdapter} from '@slack/interactive-messages';
import UserAPIToMsgAdapter from '../api/slackbot/adapters/UserAPIToMsgAdapter';
import RepoAPIToMsgAdapter from '../api/slackbot/adapters/RepoAPIToMsgAdapter';
import RepoAPI from "../api/admin/RepoAPI";
import RepoController from "../db/controllers/repoController";
import SubscribeController from "../db/controllers/subscribeController";
import MsgBuilder from "../templates/builders/MsgBuilder";
import UserAPI from "../api/admin/UserAPI";
import UserController from "../db/controllers/userController";
import SubscribeAPI from "../api/admin/SubscribeAPI";
const InteractiveMessagesRouter = Router();
const {SIGNING_SECRET} = require('../../config');
const slackInteractions = createMessageAdapter(SIGNING_SECRET);

const replaceMsg = (msg: IBlockMessage) => ({...msg, replace_original: true});

const processMessages = async (payload: any, respond: any) => {
    const value = payload.actions[0].value;
    const args = value.split('_');
    switch (args[0]) {
        case 'close':
            respond({delete_original: true});
            break;
        case 'return':
            const returnMsg = await new RepoAPIToMsgAdapter(
                new RepoAPI(payload.channel.id, new RepoController(), new SubscribeController()),
                new MsgBuilder()
            ).getReposListMsg();
            respond(replaceMsg(returnMsg));
            break;
        case 'select':
            const selectMsg = await new UserAPIToMsgAdapter(
                new UserAPI(payload.channel.id, new UserController(), new SubscribeController()),
                new MsgBuilder()
            ).getUsersListMsg(args[1]);
            respond(replaceMsg(selectMsg));
            break;
        case 'follow':
            await new SubscribeAPI(new SubscribeController()).subscribe({
                channelId: payload.channel.id, followed: args[1], follower: payload.user.username, reponame: args[2]
            });
            const followMsg = await new UserAPIToMsgAdapter(
                new UserAPI(payload.channel.id, new UserController(), new SubscribeController()),
                new MsgBuilder()
            ).getUsersListMsg(args[2]);
            respond(replaceMsg(followMsg));
            break;
        case 'unfollow':
            await new SubscribeAPI(new SubscribeController()).unsubscribe({
                channelId: payload.channel.id, followed: args[1], follower: payload.user.username, reponame: args[2]
            });
            const unfollowMsg = await new UserAPIToMsgAdapter(
                new UserAPI(payload.channel.id, new UserController(), new SubscribeController()),
                new MsgBuilder()
            ).getUsersListMsg(args[2]);
            respond(replaceMsg(unfollowMsg));
            break;
        case 'deleteRepo':
            await new RepoAPI(
                payload.channel.id, new RepoController(), new SubscribeController()
            ).delete({reponame: args[1]});
            const deleteRepoMsg = await new RepoAPIToMsgAdapter(
                new RepoAPI(payload.channel.id, new RepoController(), new SubscribeController()),
                new MsgBuilder()
            ).getReposListMsg('Delete', 'deleteRepo');
            respond(replaceMsg(deleteRepoMsg));
            break;
        case 'deleteUser':
            await new UserAPI(
                payload.channel.id, new UserController(), new SubscribeController()
            ).delete({username: args[1]});
            const deleteUserMsg = await new UserAPIToMsgAdapter(
                new UserAPI(payload.channel.id, new UserController(), new SubscribeController()),
                new MsgBuilder()
            ).getUsersListMsg();
            respond(replaceMsg(deleteUserMsg));
            break;
    }
};

InteractiveMessagesRouter.use('/interactive-messages', slackInteractions.requestListener());
slackInteractions.action({type: 'button'}, processMessages);


export default InteractiveMessagesRouter;