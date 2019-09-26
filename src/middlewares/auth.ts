import {Request, Response} from "express";
import passport from 'passport';
import {Strategy as JWTStrategy} from 'passport-jwt';
const SlackStrategy = require('passport-slack-oauth2').Strategy;
const {JWT_SECRET, VERIFICATION_TOKEN, CLIENT_ID, CLIENT_SECRET} = require('../../config');

const jwtFromRequest = (req: Request) => req.cookies && req.cookies.token ? req.cookies.token : null;

passport.use(new SlackStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        skipUserProfile: false,
        scope: ['identity.basic', 'identity.email', 'identity.avatar', 'identity.team'] // default
    },
    (accessToken: any, refreshToken: any, profile: any, done: Function) => {
        console.log('--------------------------------------------------------');
        console.log('--------------------------------------------------------');
        console.log('REFRESH TOKEN');
        console.log(refreshToken);
        console.log('--------------------------------------------------------');
        console.log('ACCESS TOKEN');
        console.log(accessToken);
        console.log('--------------------------------------------------------');
        console.log('PROFILE');
        console.log(profile);
        console.log('--------------------------------------------------------');
        console.log('--------------------------------------------------------');
        done(null, profile);
    }
));

passport.use(new JWTStrategy({jwtFromRequest, secretOrKey: JWT_SECRET}, async (jwtPayload, done) => {
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
        if (req.body && req.body.token === VERIFICATION_TOKEN) {
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

const slackAuth = (req: Request, res: Response, next: Function): void => {
    passport.authorize('Slack')(req, res, next);
};

export {botAuth, userAuth, slackAuth};