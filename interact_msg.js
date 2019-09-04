const {listUsers, subscribe, unsubscribe} = require("./api");

const interactMessagesRouter = (payload, respond) => {
    const value = payload.actions[0].value;
    const args = value.split('_');
    if (args.length !== 0) {
        switch (args[0]) {
            case 'select':
                listUsers(payload.channel.id, args[1], respond);
                break;
            case 'follow':
                console.log(args, payload);
                // subscribe(args[1], payload.channel.id, args[2], respond);
                break;
            case 'unfollow':
                // unsubscribe(args[1], payload.channel.id, args[2], respond);
                break;
        }
    }
};

module.exports = {interactMessagesRouter};