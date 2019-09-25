import {sign, SignOptions} from 'jsonwebtoken';
const {JWT_SECRET} = require('../../../config');


export interface IAuthService {
    createJWT(payload: {channelId: string}, options: SignOptions): string;
}

export default class AuthService implements IAuthService {
    createJWT(payload: {channelId: string}, options: SignOptions): string {
        return sign(payload, JWT_SECRET, options);
    }
}