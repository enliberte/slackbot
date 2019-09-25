import {IBlockMessage} from "../templates/builders/elements";
import {createMessageAdapter} from '@slack/interactive-messages';
const {SIGNING_SECRET, VERIFICATION_TOKEN} = require('../../config');
const slackInteractions = createMessageAdapter(SIGNING_SECRET);
import BaseRouter from "./BaseRouter";
import {ISubscribe} from "../db/models/SubscribeModel";
import MessageBuilder from "../templates/builders/MessageBuilder";
import {Router} from "express";

const replaceMsg = (msg: IBlockMessage) => ({...msg, replace_original: true});

export default class InteractiveMessagesRouter extends BaseRouter {

     private async closeButtonHandler(respond: any): Promise<void> {
        respond({delete_original: true});
    }

    private async returnButtonHandler(respond: any, channelId: string): Promise<void> {
        const selectButton = {btnText: 'Select', btnValue: 'select'};
        const msg = await this.services.repositoryMessageAdapter.getReposListMsg(new MessageBuilder(), channelId, selectButton);
        respond(replaceMsg(msg));
    }

    private async selectRepoButtonHandler(respond: any, channelId: string, reponame: string): Promise<void> {
        const msg = await this.services.userMessageAdapter.getUsersListMsg(new MessageBuilder(), channelId, reponame);
        respond(replaceMsg(msg));
    }

    private async followButtonHandler(respond: any, subscribe: ISubscribe): Promise<void> {
        await this.services.subscribeService.subscribe(subscribe);
        const msg = await this.services.userMessageAdapter.getUsersListMsg(new MessageBuilder(), subscribe.channelId, subscribe.reponame);
        respond(replaceMsg(msg));
    }

    private async unfollowButtonHandler(respond: any, subscribe: ISubscribe): Promise<void> {
        await this.services.subscribeService.unsubscribe(subscribe);
        const msg = await this.services.userMessageAdapter.getUsersListMsg(new MessageBuilder(), subscribe.channelId, subscribe.reponame);
        respond(replaceMsg(msg));
    }

    private async deleteRepoButtonHandler(respond: any, channelId: string, reponame: string): Promise<void> {
        await this.services.repositoryService.delete({channelId, reponame});
        const deleteRepoButton = {btnText: 'Delete', btnValue: 'deleteRepo'};
        const msg = await this.services.repositoryMessageAdapter.getReposListMsg(new MessageBuilder(), channelId, deleteRepoButton);
        respond(replaceMsg(msg));
    }

    private async deleteUserButtonHandler(respond: any, channelId: string, username: string): Promise<void> {
        await this.services.userService.delete({channelId, username});
        const deleteUserMsg = await this.services.userMessageAdapter.getUsersListMsg(new MessageBuilder(), channelId);
        respond(replaceMsg(deleteUserMsg));
    }

    private async processMessages(payload: any, respond: any): Promise<void> {
         if (payload.token === VERIFICATION_TOKEN) {
              const value = payload.actions[0].value;
              const args = value.split('_');
              switch (args[0]) {
                  case 'close':
                      return this.closeButtonHandler(respond);
                  case 'return':
                      return this.returnButtonHandler(respond, payload.channel.id);
                  case 'select':
                      return this.selectRepoButtonHandler(respond, payload.channel.id, args[1]);
                  case 'follow':
                      return this.followButtonHandler(respond, {
                          channelId: payload.channel.id, followed: args[1], follower: payload.user.username, reponame: args[2]
                      });
                  case 'unfollow':
                      return this.unfollowButtonHandler(respond, {
                          channelId: payload.channel.id, followed: args[1], follower: payload.user.username, reponame: args[2]
                      });
                  case 'deleteRepo':
                      return this.deleteRepoButtonHandler(respond, payload.channel.id, args[1]);
                  case 'deleteUser':
                      return this.deleteUserButtonHandler(respond, payload.channel.id, args[1]);
             }
         }
    }

    makeRouter(): Router {
        this.router.use('/interactive-messages', slackInteractions.requestListener());
        slackInteractions.action({type: 'button'}, this.processMessages.bind(this));
        return this.router;
    }
}