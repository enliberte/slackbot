const {WebClient} = require('@slack/web-api');
const {BOT_TOKEN} = require('./../config');
const web = new WebClient(BOT_TOKEN);


const postMessage = async (res, msg, channel) => {
    await web.chat.postMessage({...msg, channel});
    res.status(200).send();
};

module.exports = postMessage;