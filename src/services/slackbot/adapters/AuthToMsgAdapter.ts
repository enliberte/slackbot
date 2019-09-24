import {IBlockMessage} from "../../../templates/builders/elements";
import IMessageBuilder from "../../../templates/builders/IBuilder";
import {IAuthService} from "../AuthService";
const {SIGN_IN_URL} = require("../../../../config");


export interface IAuthToMessageAdapter {
    getSignupMsg(builder: IMessageBuilder, channelId: string): Promise<IBlockMessage>;
}

export default class AuthToMsgAdapter implements IAuthToMessageAdapter {
    private authService: IAuthService;

    constructor(authService: IAuthService) {
        this.authService = authService;
    }

    async getSignupMsg(builder: IMessageBuilder, channelId: string): Promise<IBlockMessage> {
        const hash = await this.authService.signup(channelId);
        if (hash) {
            builder.buildSection(`To sign in to admin site please follow ${SIGN_IN_URL}/${hash}`);
        } else {
            builder.buildSection(`DB Error has been occurred`);
        }
        return builder.getMessage();
    }
}