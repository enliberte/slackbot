import {IBlockMessage} from "../services/slackbot/templates/builders/elements";
import {createMessageAdapter} from '@slack/interactive-messages';
const {SIGNING_SECRET, VERIFICATION_TOKEN} = require('../../../config');
const slackInteractions = createMessageAdapter(SIGNING_SECRET);
import BaseController from "./BaseController";
import {ISubscribe} from "../db/models/SubscribeModel";
import MessageBuilder from "../services/slackbot/templates/builders/MessageBuilder";
import {Router} from "express";

const replaceMsg = (msg: IBlockMessage) => ({...msg, replace_original: true});

export default class InteractiveMessagesController extends BaseController {

     private async closeButtonHandler(respond: any): Promise<void> {
        respond({delete_original: true});
    }

    private async returnButtonHandler(respond: any, channelId: string): Promise<void> {
        const selectButton = {btnText: 'Select', btnValue: 'select'};
        const msg = await this.services.repositoryMessageAdapter.getReposListMsg(new MessageBuilder(), channelId, selectButton);
        respond(replaceMsg(msg));
    }

    private async selectRepoButtonHandler(respond: any, channelId: string, reponame: string): Promise<void> {
        const msg = await this.services.developerMessageAdapter.getDevelopersListMsg(new MessageBuilder(), channelId, reponame);
        respond(replaceMsg(msg));
    }

    private async followButtonHandler(respond: any, subscribe: ISubscribe): Promise<void> {
        await this.services.subscribeService.subscribe(subscribe);
        const msg = await this.services.developerMessageAdapter.getDevelopersListMsg(new MessageBuilder(), subscribe.channelId, subscribe.reponame);
        respond(replaceMsg(msg));
    }

    private async unfollowButtonHandler(respond: any, subscribe: ISubscribe): Promise<void> {
        await this.services.subscribeService.unsubscribe(subscribe);
        const msg = await this.services.developerMessageAdapter.getDevelopersListMsg(new MessageBuilder(), subscribe.channelId, subscribe.reponame);
        respond(replaceMsg(msg));
    }

    private async deleteRepoButtonHandler(respond: any, channelId: string, reponame: string): Promise<void> {
        await this.services.repositoryService.delete({channelId, reponame});
        const deleteRepoButton = {btnText: 'Delete', btnValue: 'deleteRepo'};
        const msg = await this.services.repositoryMessageAdapter.getReposListMsg(new MessageBuilder(), channelId, deleteRepoButton);
        respond(replaceMsg(msg));
    }

    private async deleteDeveloperButtonHandler(respond: any, channelId: string, username: string): Promise<void> {
        await this.services.developerService.delete({channelId, username});
        const deleteDeveloperMsg = await this.services.developerMessageAdapter.getDevelopersListMsg(new MessageBuilder(), channelId);
        respond(replaceMsg(deleteDeveloperMsg));
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
                  case 'deleteDeveloper':
                      return this.deleteDeveloperButtonHandler(respond, payload.channel.id, args[1]);
             }
         }
    }

    makeRouter(): Router {
        this.router.use('/interactive-messages', slackInteractions.requestListener());
        slackInteractions.action({type: 'button'}, this.processMessages.bind(this));
        return this.router;
    }
}