import {Schema, Document, model, Model} from 'mongoose';


interface IOnetimeCredential {
    channelId: string;
    password: string;
}

interface IOnetimeCredentialModel extends Document, IOnetimeCredential {}

const onetimeCredentialSchema: Schema = new Schema({
    channelId: String,
    password: String
});

const OnetimeCredentialModel: Model<IOnetimeCredentialModel> = model('OnetimeCredential', onetimeCredentialSchema);

export {IOnetimeCredential, IOnetimeCredentialModel, OnetimeCredentialModel}