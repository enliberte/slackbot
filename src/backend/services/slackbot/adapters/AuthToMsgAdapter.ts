import {IBlockMessage} from "../templates/builders/elements";
import IMessageBuilder from "../templates/builders/IBuilder";
import {IAuthService, IJWTPayload} from "../AuthService";
const {SIGN_IN_URL} = require('../../../../../config');


export interface IAuthToMessageAdapter {
    getCreateAuthLinkMsg(builder: IMessageBuilder, payload: IJWTPayload): IBlockMessage;
}

export default class AuthToMessageAdapter implements IAuthToMessageAdapter {
    private authService: IAuthService;

    constructor(authService: IAuthService) {
        this.authService = authService;
    }

    getCreateAuthLinkMsg(builder: IMessageBuilder, payload: IJWTPayload): IBlockMessage {
        const jwt = this.authService.createJWT(payload, {expiresIn: '1m'});
        const text = `To sign in to admin site please follow ${SIGN_IN_URL}/${jwt}`;
        return builder.buildSection(text).getMessage()
    }
}