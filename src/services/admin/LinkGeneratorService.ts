import {ICredential} from "../../db/models/OnetimeCredentialModel";
import sha256 from 'sha256';

export interface ILinkGeneratorService {
    generate(onetimeCredentials: ICredential): string;
}

export default class LinkGeneratorService implements ILinkGeneratorService {
    generate(onetimeCredentials: ICredential): string {
        return sha256(JSON.stringify(onetimeCredentials));
    }
}