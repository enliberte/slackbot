const {WebClient} = require('@slack/web-api');
const {BOT_TOKEN} = require('./../config');

class BaseAPI {
    constructor(channelId, res, respond) {
        this.web = new WebClient(BOT_TOKEN);
        this.channelId = channelId;
        this.res = res;
        this.respond = respond;
    }

    async post(msg) {
        const postFunc = this.res ?
            async msg => {
                await this.web.chat.postMessage({...msg, channel: this.channelId});
                await this.res.status(200).send();
            } :
            async msg => {await this.respond(msg)};
        await postFunc(msg);
    }
}

module.exports = BaseAPI;