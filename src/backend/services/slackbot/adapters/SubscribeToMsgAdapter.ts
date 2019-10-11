import {IBlockMessage} from "../templates/builders/elements";
import IMessageBuilder from "../templates/builders/IBuilder";
import {INewSubscribe} from "../../../db/models/subscribe/SubscribeModel";
import {ISubscribeService} from "../../admin/SubscribeService";
import buildSubscribesList from "../templates/common/buildSubscribesList";


export interface ISubscribeToMessageAdapter {
    getSubscribesListMsg(builder: IMessageBuilder, channelId: string): Promise<IBlockMessage>;
    getAddResultMsg(builder: IMessageBuilder, obj: INewSubscribe): Promise<IBlockMessage>;
    getDeleteResultMsg(builder: IMessageBuilder, obj: INewSubscribe): Promise<IBlockMessage>;
}

export default class SubscribeToMessageAdapter implements ISubscribeToMessageAdapter {
    private subscribeService: ISubscribeService;

    constructor(subscribeService: ISubscribeService) {
        this.subscribeService = subscribeService;
    }

    async getSubscribesListMsg(builder: IMessageBuilder, channelId: string): Promise<IBlockMessage> {
        const emptySubscribesMsg = "You don't have subscribes yet. To add them please sign in admin site";
        const subscribes = await this.subscribeService.list({filter: {channelId}});
        if (subscribes.length === 0) {
            return builder.buildSection(emptySubscribesMsg).getMessage();
        } else {
            return buildSubscribesList(builder, subscribes);
        }
    }

    async getAddResultMsg(builder: IMessageBuilder, obj: INewSubscribe): Promise<IBlockMessage> {
        if (obj.followed && obj.reponame) {
            const addOperationSuccess = await this.subscribeService.subscribe(obj);
            if (addOperationSuccess) {
                builder.buildSection(`You have subscribed for ${obj.followed}'s PR into ${obj.reponame}`);
            } else {
                builder.buildSection(`DB Error has been occurred`);
            }
        } else {
            builder.buildSection('Incorrect params');
        }
        return builder.getMessage();
    }

    async getDeleteResultMsg(builder: IMessageBuilder, obj: INewSubscribe): Promise<IBlockMessage> {
        if (obj.followed && obj.reponame) {
            const deleteOperationSuccess = await this.subscribeService.unsubscribe(obj);
            if (deleteOperationSuccess) {
                builder.buildSection(`You have unsubscribed from ${obj.followed}'s PR into ${obj.reponame}`);
            } else {
                builder.buildSection(`DB Error has been occurred`);
            }
        } else {
            builder.buildSection('Incorrect params');
        }
        return builder.getMessage();
    }
}