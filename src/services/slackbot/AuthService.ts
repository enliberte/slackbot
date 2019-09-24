import {sign} from 'jsonwebtoken';
const {JWT_OPTIONS, JWT_EXPIRES_IN} = require('../../../config');


export interface IAuthService {
    createJWT(payload: {channelId: string}): string;
}

export default class AuthService implements IAuthService {
    createJWT(payload: {channelId: string}): string {
        return sign(payload, JWT_OPTIONS.secretOrKey, {expiresIn: '15m'});
    }
}