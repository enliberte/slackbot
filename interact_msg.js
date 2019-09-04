const {listUsers, listRepos, subscribe, unsubscribe, deleteRepo} = require("./api");

const interactMessagesRouter = (payload, respond) => {
    const value = payload.actions[0].value;
    const args = value.split('_');
    switch (args[0]) {
        case 'close':
            respond({text: 'See you later'});
            break;
        case 'return':
            listRepos(payload.channel.id, undefined, respond);
            break;
        case 'select':
            listUsers(payload.channel.id, args[1], respond);
            break;
        case 'follow':
            subscribe(args[1], payload.user.username, payload.channel.id, args[2], respond);
            break;
        case 'unfollow':
            unsubscribe(args[1], payload.user.username, payload.channel.id, args[2], respond);
            break;
        case 'deleteRepo':
            deleteRepo(args[1], payload.channel.id, respond);
            break;
    }
};

module.exports = {interactMessagesRouter};