import {IOnetimeCredential} from "../../db/models/OnetimeCredentialModel";
import sha256 from 'sha256';

export interface ILinkGeneratorService {
    generate(onetimeCredentials: IOnetimeCredential): string;
}

export default class LinkGeneratorService implements ILinkGeneratorService {
    generate(onetimeCredentials: IOnetimeCredential): string {
        return sha256(JSON.stringify(onetimeCredentials));
    }
}