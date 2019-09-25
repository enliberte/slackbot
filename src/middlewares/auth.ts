import {Request, Response} from "express";
import passport from 'passport';
import {Strategy} from 'passport-jwt';
const {JWT_SECRET, VERIFICATION_TOKEN} = require('../../config');

const jwtFromRequest = (req: Request) => req.cookies && req.cookies.token ? req.cookies.token : null;

passport.use(new Strategy({jwtFromRequest, secretOrKey: JWT_SECRET}, async (jwtPayload, done) => {
    if (jwtPayload) {
        done(false, jwtPayload);
    } else {
        done(true);
    }
}));

interface RequestWithAthorizationFlag extends Request {
    isAuthorized?: boolean;
}

const botAuth = (req: RequestWithAthorizationFlag, res: Response, next: Function): void => {
    if (!req.isAuthorized) {
        if (req.body && req.body.token && req.body.token === VERIFICATION_TOKEN) {
            req.isAuthorized = true;
            next();
        } else {
            res.status(401).send({error: 'Unauthorized'});
        }
    } else {
        next();
    }

};

const userAuth = (req: RequestWithAthorizationFlag, res: Response, next: Function): void => {
    if (!req.isAuthorized) {
        passport.authenticate('jwt', {session: false}, (err, decryptToken, jwtError) => {
            if (err || jwtError) {
                res.status(401).send({error: 'Unauthorized'});
            } else {
                req.isAuthorized = true;
                next();
            }
        })(req, res, next);
    } else {
        next();
    }
};

export {botAuth, userAuth};