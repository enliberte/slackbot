import {sign} from 'jsonwebtoken';
const {JWT_OPTIONS, JWT_EXPIRES_IN} = require('../../../config');


export interface IAuthService {
    createJWT(channelId: string): string;
}

export default class AuthService implements IAuthService {
    createJWT(channelId: string): string {
        return sign(channelId, JWT_OPTIONS.secretOrKey);
    }
}