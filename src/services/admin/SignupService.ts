import {ICredentialStorageService} from "../../db/storageServices/CredentialStorageService";
import {ILinkGeneratorService} from "./LinkGeneratorService";
const uuid4 = require('uuid4');


export interface ISignupService {
    signup(channelId: string): Promise<string | boolean>;
}


export default class SignupService implements ISignupService {
    private onetimeCredentialStorageService: ICredentialStorageService;
    private linkGenService: ILinkGeneratorService;

    constructor(onetimeCredentialStorageService: ICredentialStorageService, linkGenService: ILinkGeneratorService) {
        this.onetimeCredentialStorageService = onetimeCredentialStorageService;
        this.linkGenService = linkGenService;
    }

    async signup(channelId: string) {
        const onetimeCredentials = {channelId, password: uuid4()};
        const addCredentialsOperationResult = await this.onetimeCredentialStorageService.add(onetimeCredentials);
        return addCredentialsOperationResult ? this.linkGenService.generate(onetimeCredentials) : addCredentialsOperationResult;
    }
}