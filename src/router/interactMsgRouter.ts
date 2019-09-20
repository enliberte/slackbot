import {IBlockMessage} from "../templates/builders/elements";
import {createMessageAdapter} from '@slack/interactive-messages';
const {SIGNING_SECRET} = require('../../config');
const slackInteractions = createMessageAdapter(SIGNING_SECRET);
import BaseRouter from "./BaseRouter";
import {ISubscribeRequired} from "../db/models/subscribeModel";

const replaceMsg = (msg: IBlockMessage) => ({...msg, replace_original: true});

export default class InteractiveMsgRouter extends BaseRouter {

    private async closeButtonHandler(respond: any): Promise<void> {
        respond({delete_original: true});
    }

    private async returnButtonHandler(respond: any, channelId: string): Promise<void> {
        const selectButton = {btnText: 'Select', btnValue: 'select'};
        const msg = await this.api.repoMsg.getReposListMsg(channelId, selectButton);
        respond(replaceMsg(msg));
    }

    private async selectRepoButtonHandler(respond: any, channelId: string, reponame: string): Promise<void> {
        const msg = await this.api.userMsg.getUsersListMsg(channelId, reponame);
        respond(replaceMsg(msg));
    }

    private async followButtonHandler(respond: any, subscribe: ISubscribeRequired): Promise<void> {
        await this.api.subscribe.subscribe(subscribe);
        const msg = await this.api.userMsg.getUsersListMsg(subscribe.channelId, subscribe.reponame);
        respond(replaceMsg(msg));
    }

    private async unfollowButtonHandler(respond: any, subscribe: ISubscribeRequired): Promise<void> {
        await this.api.subscribe.unsubscribe(subscribe);
        const msg = await this.api.userMsg.getUsersListMsg(subscribe.channelId, subscribe.reponame);
        respond(replaceMsg(msg));
    }

    private async deleteRepoButtonHandler(respond: any, channelId: string, reponame: string): Promise<void> {
        await this.api.repo.delete({channelId, reponame});
        const deleteRepoButton = {btnText: 'Delete', btnValue: 'deleteRepo'};
        const msg = await this.api.repoMsg.getReposListMsg(channelId, deleteRepoButton);
        respond(replaceMsg(msg));
    }

    private async deleteUserButtonHandler(respond: any, channelId: string, username: string): Promise<void> {
        await this.api.user.delete({channelId, username});
        const deleteUserMsg = await this.api.userMsg.getUsersListMsg(channelId);
        respond(replaceMsg(deleteUserMsg));
    }

    private async processMessages(payload: any, respond: any): Promise<void> {
        const value = payload.actions[0].value;
        const args = value.split('_');
        switch (args[0]) {
            case 'close':
                await this.closeButtonHandler(respond);
                break;
            case 'return':
                await this.returnButtonHandler(respond, payload.channel.id);
                break;
            case 'select':
                await this.selectRepoButtonHandler(respond, payload.channel.id, args[1]);
                break;
            case 'follow':
                await this.followButtonHandler(respond, {
                    channelId: payload.channel.id, followed: args[1], follower: payload.user.username, reponame: args[2]
                });
                break;
            case 'unfollow':
                await this.unfollowButtonHandler(respond, {
                    channelId: payload.channel.id, followed: args[1], follower: payload.user.username, reponame: args[2]
                });
                break;
            case 'deleteRepo':
                await this.deleteRepoButtonHandler(respond, payload.channel.id, args[1]);
                break;
            case 'deleteUser':
                await this.deleteUserButtonHandler(respond, payload.channel.id, args[1]);
                break;
        }
    }

    addListeners(): void {
        this.router.use('/interactive-messages', slackInteractions.requestListener());
        slackInteractions.action({type: 'button'}, this.processMessages);
    }
}