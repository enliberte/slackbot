import {Request, Response} from "express";
import passport from 'passport';
import {Strategy} from 'passport-jwt';
const {JWT_SECRET} = require('../../config');

const jwtFromRequest = (req: Request) => req.cookies && req.cookies.token ? req.cookies.token : null;

passport.use(new Strategy({jwtFromRequest, secretOrKey: JWT_SECRET}, async (jwtPayload, done) => {
    if (jwtPayload) {
        done(false, jwtPayload);
    } else {
        done(true);
    }
}));

const auth = (req: Request, res: Response, next: Function): void => {
    passport.authenticate('jwt', {session: false}, (err, decryptToken, jwtError) => {
        if (err || jwtError) {
            res.redirect(401, '/');
        } else {
            next();
        }
    })(req, res, next);
};

export default auth;