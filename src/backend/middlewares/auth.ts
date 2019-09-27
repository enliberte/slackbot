import {Request, Response} from "express";
import passport from 'passport';
import {Strategy} from 'passport-jwt';
const {JWT_SECRET, VERIFICATION_TOKEN} = require('../../../config');


const jwtFromRequest = (req: Request) => req.cookies && req.cookies.token ? req.cookies.token : null;

passport.use(new Strategy({jwtFromRequest, secretOrKey: JWT_SECRET}, async (jwtPayload, done) => {
    if (jwtPayload) {
        done(false, jwtPayload);
    } else {
        done(true);
    }
}));

const botAuth = (req: Request, res: Response, next: Function): void => {
    if (req.body && req.body.token === VERIFICATION_TOKEN) {
        next();
    } else {
        res.status(401).send({error: 'Unauthorized'});
    }
};

const userAuth = (req: Request, res: Response, next: Function): void => {
    passport.authenticate('jwt', {session: false}, (err, decryptToken, jwtError) => {
        if (err || jwtError) {
            res.status(401).send({error: 'Unauthorized'});
        } else {
            next();
        }
    })(req, res, next);
};

export {botAuth, userAuth};