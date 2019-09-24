import passport from 'passport';
import {Strategy} from 'passport-jwt';
const {JWT_OPTIONS} = require('../../config');

passport.use(new Strategy(JWT_OPTIONS, async (jwtPayload, done) => {
    if (jwtPayload) {
        done(false, jwtPayload);
    } else {
        done(true);
    }
}));