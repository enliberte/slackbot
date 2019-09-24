import {ICredentialStorageService} from "../../db/storageServices/CredentialStorageService";
const uuid4 = require('uuid4');


export interface IAuthService {
    signup(channelId: string): Promise<string | boolean>;
    signin(token: string): Promise<string | boolean>;
}


export default class AuthService implements IAuthService {
    private credentialStorageService: ICredentialStorageService;

    constructor(credentialStorageService: ICredentialStorageService) {
        this.credentialStorageService = credentialStorageService;
    }

    async signup(channelId: string): Promise<string | boolean> {
        const token = uuid4();
        const onetimeCredentials = {channelId, token};
        const addResult = await this.credentialStorageService.add(onetimeCredentials);
        return addResult ? token : addResult;
    }

    async signin(token: string): Promise<string | boolean> {
        const users = await this.credentialStorageService.get({token});
        if (users.length !== 0) {
            const channelId = users[0].channelId;
            await this.credentialStorageService.remove({channelId});
            return channelId;
        }
        return false;
    }
}