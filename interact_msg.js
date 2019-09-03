const {listReposForSubscribe, listReposForUnsubscribe, subscribe, unsubscribe} = require("./api");

const interactMessagesRouter = (payload, respond) => {
    const value = payload.actions[0].value;
    const args = value.split('_');
    if (args.length !== 0) {
        switch (args[0]) {
            case 'follow':
                listReposForSubscribe(args[1], respond);
                break;
            case 'unfollow':
                listReposForUnsubscribe(args[1], respond);
                break;
            case 'subscribe':
                subscribe(args[1], payload.channel.id, args[2], respond);
                break;
            case 'unsubscribe':
                unsubscribe(args[1], payload.channel.id, args[2], respond);
                break;
        }
    }
};

module.exports = {interactMessagesRouter};