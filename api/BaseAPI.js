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
        console.log('-------------------------------------');
        console.log(this.res === undefined, this.respond === undefined);
        console.log('-------------------------------------');
        const postFunc = this.res ?
            async msg => {
                await this.web.chat.postMessage({...msg, channel: this.channelId});
                await this.res.status(200).send();
            } :
            async msg => {await this.respond(msg)};
        console.log(postFunc);
        await postFunc(msg);
    }
}

module.exports = BaseAPI;