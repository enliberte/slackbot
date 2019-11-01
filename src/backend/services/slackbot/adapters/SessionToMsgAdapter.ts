import {IBlockMessage} from "../templates/builders/elements";
import IMessageBuilder from "../templates/builders/IBuilder";
import crypto from "crypto";
import {ISessionService} from "../../admin/SessionService";
const {SIGN_IN_URL} = require('../../../../../config');


export interface ISessionToMessageAdapter {
    getCreateAuthLinkMsg(builder: IMessageBuilder, channelId: string): Promise<IBlockMessage>;
}

export default class SessionToMessageAdapter implements ISessionToMessageAdapter {
    private sessionService: ISessionService;

    constructor(sessionService: ISessionService) {
        this.sessionService = sessionService;
    }

    async getCreateAuthLinkMsg(builder: IMessageBuilder, channelId: string): Promise<IBlockMessage> {
        const secret = Math.floor(Date.now() / 1000).toString();
        const sid = crypto.createHash('sha1').update(secret).digest('hex');
        const session = {channelId, sid};
        const addSessionResult = await this.sessionService.add(session);
        const text = typeof addSessionResult !== 'string' ? `To sign in to admin site please follow ${SIGN_IN_URL}/${sid}` : addSessionResult;
        return builder.buildSection(text).buildDivider().getMessage();
    }
}