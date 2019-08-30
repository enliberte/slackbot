const express = require('express');
const SlackBot = require('slackbots');
const port = process.env.PORT || 8080;
const app = express();

// class Bot {
//     constructor(token, id, name) {
//         this.id = id;
//         this.instance = new SlackBot({token, name});
//         this.subscribes = {};
//         this.helpMsg = `send me a message "${this.instance.name} subscribe to user"
//         (for instance @testbot subscribe to Alexey Sumatokhin.EXT) to follow him or
//         "${this.instance.name} unsubscribe from user" to unfollow`;
//     }
//
//     start() {
//         this.listenStart();
//         this.listenMessages();
//         console.log('Start')
//     }
//
//     listenStart() {
//         this.instance.on('start', () => {
//             this.instance.postMessageToChannel('pushes', "I'm alive (Skynet)", {});
//         });
//     }
//
//     listenMessages() {
//         this.instance.on('message', (data) => {
//             console.log(data);
//             if (data.text) {
//                 this.interactIfNeeded(data);
//                 this.notifyIfNeeded(data);
//             }
//         });
//     }
//
//     interactIfNeeded(data) {
//         const routes = [
//             {pattern: new RegExp(`<${this.id}> subscribe to (.*)`), cb: (followed) => this.subscribe(followed, data.user)},
//             {pattern: new RegExp(`<${this.id}> unsubscribe from (.*)`), cb: (followed) => this.unsubscribe(followed, data.user)},
//             {pattern: new RegExp(`<${this.id}> help`), cb: () => this.showHelp(data.user)},
//         ];
//
//         routes.forEach(route => {
//             const result = data.text.match(route.pattern);
//             if (result) {
//                 route.cb(result[1]);
//             }
//         })
//     }
//
//     notifyIfNeeded(data) {
//         for (let followed in this.subscribes) {
//             if (data.text.match(new RegExp(`^Push(.*)${followed}`))) {
//                 this.subscribes[followed].forEach(
//                     followerId => this.notify(data.text, {attachments: data.attachments}, followerId)
//                 );
//             }
//         }
//     }
//
//     notify(text, params, followerId) {
//         this.instance.getUserById(followerId)
//             .then(user => this.instance.postMessageToUser(user.name, `Attention! ${text}`, params));
//     }
//
//     subscribe(followed, followerId) {
//         if (this.subscribes[followed]) {
//             this.subscribes[followed] = [...this.subscribes[followed], followerId];
//         } else {
//             this.subscribes[followed] = [followerId]
//         }
//         this.instance.getUserById(followerId).then(user =>
//             this.instance.postMessageToUser(user.name, `You have subscribed to ${followed}`)
//         );
//     }
//
//     unsubscribe(followed, followerId) {
//         if (this.subscribes[followed]) {
//             this.subscribes[followed] = this.subscribes[followed].filter(currentFollowerId => currentFollowerId !== followerId);
//         }
//         this.instance.getUserById(followerId).then(user =>
//             this.instance.postMessageToUser(user.name, `You have unsubscribed from ${followed}`)
//         );
//     }
//
//     showHelp(userId) {
//         this.instance.getUserById(userId).then(user => this.instance.postMessageToUser(user.name, this.helpMsg));
//     }
// }
//
// new Bot('xoxb-734390477313-729518821202-1gilmTwwSde1ZiJcUGdoN8Gi', '@UMFF8Q55Y', 'testbot').start();

app.get('/', (req, res) => {
    res.status(200).send('React app will be there');
});

app.post('/push', (req, res) => {
    res.status(200).send(req.body);
});
app.listen(port);