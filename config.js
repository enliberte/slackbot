require('dotenv').config();


module.exports = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    MONGO_URI: process.env.MONGO_URI,
    SIGNING_SECRET: process.env.SIGNING_SECRET,
    SIGN_IN_URL: 'https://bitbucket-subscriber-slackbot.herokuapp.com/login',
    JWT_SECRET: process.env.JWT_SECRET,
    VERIFICATION_TOKEN: process.env.VERIFICATION_TOKEN
};