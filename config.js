require('dotenv').config();

module.exports = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    MONGO_URI: 'mongodb+srv://slackbot:xwcefZHw0uomUjRO@slackbot-91dwr.mongodb.net/subscribes?retryWrites=true&w=majority',
    SIGNING_SECRET: process.env.SIGNING_SECRET
};