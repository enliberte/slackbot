import {sign, SignOptions, verify} from 'jsonwebtoken';
const {JWT_SECRET} = require('../../../../config');

export interface IJWTPayload {
    channelId: string;
    username: string;
}

export interface IAuthService {
    createJWT(payload: IJWTPayload, options: SignOptions): string;
    verifyJWT(jwt: string): Promise<object | string | boolean>
}

export default class AuthService implements IAuthService {
    createJWT(payload: IJWTPayload, options: SignOptions): string {
        return sign(payload, JWT_SECRET, options);
    }
    async verifyJWT(jwt: string): Promise<object | string | boolean> {
        try {
            return await verify(jwt, JWT_SECRET);
        } catch (e) {
            return false;
        }
    }
}