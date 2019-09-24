import {Schema, Document, model, Model} from 'mongoose';


interface ICredential {
    channelId: string;
    password: string;
}

interface ICredentialModel extends Document, ICredential {}

const credentialSchema: Schema = new Schema({
    channelId: String,
    password: String
});

const CredentialModel: Model<ICredentialModel> = model('Credential', credentialSchema);

export {ICredential, ICredentialModel, CredentialModel}