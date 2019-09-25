import {IBlockMessage} from "../../../templates/builders/elements";
import IMessageBuilder, {IButtonProps} from "../../../templates/builders/IBuilder";
import {ISubscribe} from "../../../db/models/SubscribeModel";
import {ISubscribeService} from "../../admin/SubscribeService";


export interface ISubscribeToMessageAdapter {
    getAddResultMsg(builder: IMessageBuilder, obj: ISubscribe): Promise<IBlockMessage>;
}

export default class SubscribeToMessageAdapter implements ISubscribeToMessageAdapter {
    private subscribeService: ISubscribeService;

    constructor(subscribeService: ISubscribeService) {
        this.subscribeService = subscribeService;
    }

    async getAddResultMsg(builder: IMessageBuilder, obj: ISubscribe): Promise<IBlockMessage> {
        if (obj.followed) {
            const addOperationSuccess = await this.subscribeService.subscribeCMD(obj);
            if (addOperationSuccess) {
                builder.buildSection(`You have subscribed for ${obj.followed}'s PR into ${obj.reponame}`);
            } else {
                builder.buildSection(`DB Error has been occurred`);
            }
        } else {
            builder.buildSection('Incorrect username');
        }
        return builder.getMessage();
    }
}