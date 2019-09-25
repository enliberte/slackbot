import {sign} from 'jsonwebtoken';
const {JWT_SECRET} = require('../../../config');


export interface IAuthService {
    createJWT(payload: {channelId: string}): string;
}

export default class AuthService implements IAuthService {
    createJWT(payload: {channelId: string}): string {
        console.log('----------------------------------------------');
        console.log(JWT_SECRET);
        console.log('----------------------------------------------');
        return sign(payload, JWT_SECRET, {expiresIn: '15m'});
    }
}