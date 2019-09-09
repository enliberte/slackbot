const {WebClient} = require('@slack/web-api');
const {BOT_TOKEN} = require('./../config');

class BaseAPI {
    constructor(channelId, res=undefined, respond=undefined) {
        this.web = new WebClient(BOT_TOKEN);
        this.channelId = channelId;
        this.res = res;
        this.respond = respond;
    }

    async post(msg) {
        console.log('-------------------------------------------------------');
        console.log(msg);
        console.log('-------------------------------------------------------');
        if (this.res) {
            await this.web.chat.postMessage({...msg, channel: this.channelId});
            await this.res.status(200).send();
        } else {
            await this.respond(msg);
        }
    }
}

module.exports = BaseAPI;