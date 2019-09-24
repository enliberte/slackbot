import {ICredentialStorageService} from "../../db/storageServices/CredentialStorageService";
import {ICryptService} from "../admin/CryptoService";
const uuid4 = require('uuid4');


export interface IAuthService {
    signup(channelId: string): Promise<string | boolean>;
    signin(hash: string): Promise<string | boolean>;
}


export default class AuthService implements IAuthService {
    private credentialStorageService: ICredentialStorageService;
    private cryptoService: ICryptService;

    constructor(credentialStorageService: ICredentialStorageService, cryptoService: ICryptService) {
        this.credentialStorageService = credentialStorageService;
        this.cryptoService = cryptoService;
    }

    async signup(channelId: string): Promise<string | boolean> {
        const onetimeCredentials = {channelId, password: uuid4()};
        const addResult = await this.credentialStorageService.add(onetimeCredentials);
        return addResult ? await this.cryptoService.hash(JSON.stringify(onetimeCredentials)) : addResult;
    }

    async signin(hash: string): Promise<string | boolean> {
        const users = await this.credentialStorageService.get({});
        const filteredUsers = users.filter(async user => await this.cryptoService.compare(JSON.stringify(user), hash));
        if (filteredUsers.length !== 0) {
            const channelId = filteredUsers[0].channelId;
            await this.credentialStorageService.remove({channelId});
            return channelId;
        }
        return false;
    }
}