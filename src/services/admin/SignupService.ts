import {IOnetimeCredentialStorageService} from "../../db/storageServices/OnetimeCredentialStorageService";
import {ILinkGeneratorService} from "./LinkGeneratorService";
const uuid4 = require('uuid4');


export interface ISignupService {
    signup(channelId: string): Promise<string | boolean>;
}


export default class SignupService implements ISignupService {
    private onetimeCredentialStorageService: IOnetimeCredentialStorageService;
    private linkGenService: ILinkGeneratorService;

    constructor(onetimeCredentialStorageService: IOnetimeCredentialStorageService, linkGenService: ILinkGeneratorService) {
        this.onetimeCredentialStorageService = onetimeCredentialStorageService;
        this.linkGenService = linkGenService;
    }

    async signup(channelId: string) {
        const onetimeCredentials = {channelId, password: uuid4()};
        const addCredentialsOperationResult = await this.onetimeCredentialStorageService.add(onetimeCredentials);
        return addCredentialsOperationResult ? this.linkGenService.generate(onetimeCredentials) : addCredentialsOperationResult;
    }
}