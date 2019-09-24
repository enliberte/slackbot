import bcrypt from 'bcrypt';

export interface ICryptService {
    hash(text: string): Promise<string>;
    compare(text: string, hash: string): Promise<boolean>;
}

export default class CryptoService implements ICryptService {
    async hash(text: string): Promise<string> {
        const hash = await bcrypt.hash(text, 10);
        return hash.replace('/', '');
    }

    async compare(text: string, hash: string): Promise<boolean> {
        return bcrypt.compare(text, hash);
    }
}