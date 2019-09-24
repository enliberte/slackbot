require('dotenv').config();
const {ExtractJwt} = require('passport-jwt');


module.exports = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    MONGO_URI: process.env.MONGO_URI,
    SIGNING_SECRET: process.env.SIGNING_SECRET,
    SIGN_IN_URL: 'https://bitbucket-subscriber-slackbot.herokuapp.com/login',
    JWT_OPTIONS: {
        jwtFromRequest: ExtractJwt.fromExtractors([
            ExtractJwt.fromUrlQueryParameter('jwt'),
            ExtractJwt.fromAuthHeaderAsBearerToken()
        ]),
        secretOrKey: process.env.JWT_SECRET
    },
    JWT_EXPIRES_IN: '15m'
};