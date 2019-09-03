const express = require('express');
const {createMessageAdapter} = require('@slack/interactive-messages');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const {listReposForSubscribe, listReposForUnsubscribe, listUsersForSubscribe, listUsersForUnsubscribe} = require('./api');
require('dotenv').config();


class Bot {
    constructor(token) {
        this.slackInteractions = createMessageAdapter(process.env.SIGNING_SECRET);
        this.app = express();

        //app settings
        this.app.use('/interactive-messages', this.slackInteractions.requestListener());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    router() {
        this.app.get('/', (req, res) => {
            res.status(200).send('React app will be there');
        });

        // this.app.post('/push', (req, res) => {
        //     if (req.body.attachments) {
        //         this.notifyAboutPR(req.body.attachments);
        //     }
        // });

        this.app.post('/subscribe', (req, res) => {
            listUsersForSubscribe(req.body.channel_id);
        });

        this.app.post('/unsubscribe', (req, res) => {
            listUsersForUnsubscribe(req.body.channel_id);
        });

        this.slackInteractions.action({type: 'button'}, (payload, respond) => {
            console.log('payload', payload);
            const value = payload.actions[0].value;
            const args = value.split('_');
            if (args.length !== 0) {
                switch (args[0]) {
                    case 'follow':
                        this.listReposForSubscribe(args[1], respond);
                        break;
                    case 'unfollow':
                        this.listReposForUnsubscribe(args[1], respond);
                        break;
                    case 'subscribe':
                        this.subscribe(args[1], payload.channel.id, args[2], respond);
                        break;
                    case 'unsubscribe':
                        this.subscribe(args[1], payload.channel.id, args[2], respond);
                        break;
                }
            }
        });
    }

    start() {
        this.app.listen(port);
        this.router();
        (async () => {
            await this.slackInteractions.start(port);
        })();
    }

    // notifyAboutPR(attachments) {
    //     const {fallback, author_name: followed} = attachments[0];
    //     if (fallback && followed) {
    //         const result = fallback.match(/<(.*)\/pull-requests/);
    //         if (result) {
    //             const repoName = result[1];
    //             this.client.connect(err => {
    //                 const subscribes = this.client.db("subscribes").collection("followed");
    //                 subscribes.find({followed, repoName}).toArray((err, docs) => {
    //                     if (docs) {
    //                         docs.forEach(doc => this.rtm.postMessageToUser(doc.follower, 'PR!', {attachments}));
    //                     }
    //                     this.client.close()
    //                 });
    //             });
    //         }
    //     }
    // }
    //
    //
    // listReposForSubscribe(user, respond) {
    //     this.client.connect(err => {
    //         const repos = this.client.db("subscribes").collection("repos");
    //         repos.find({}).toArray((err, docs) => {
    //             if (docs) {
    //                 const reponames = docs.map(doc => doc.reponame);
    //                 respond({blocks: addReposListForSubscribe(user, reponames)});
    //             }
    //             this.client.close();
    //         });
    //     });
    // }
    //
    // listReposForUnsubscribe(followed, follower, respond) {
    //     this.client.connect(err => {
    //         const followed = this.client.db("subscribes").collection("followed");
    //         followed.find({followed, follower}).toArray((err, docs) => {
    //             if (docs) {
    //                 const reponames = docs.map(doc => doc.repoName);
    //                 respond({blocks: addReposListForUnsubscribe(followed, reponames)});
    //             }
    //             this.client.close();
    //         });
    //     });
    // }
    //
    // subscribe(followed, follower, repoName, respond) {
    //     this.client.connect(err => {
    //         const subscribes = this.client.db("subscribes").collection("followed");
    //         const subscribe = {followed, follower, repoName};
    //         subscribes.updateOne(subscribe, {$set: subscribe}, {upsert: true}, err => {
    //             this.client.close();
    //             const msgText = err ? 'insert into db failed' : `You have subscribed to ${followed} on ${repoName}`;
    //             respond({text: msgText});
    //         });
    //     });
    // }
    //
    // unsubscribe(followed, follower, repoName, respond) {
    //     this.client.connect(err => {
    //         const subscribes = this.client.db("subscribes").collection("followed");
    //         subscribes.deleteOne({followed, follower, repoName}, {}, err => {
    //             this.client.close();
    //             const msgText = err ? 'delete from db failed' : `You have unsubscribed from ${followed} on ${repoName}`;
    //             respond({text: msgText});
    //         });
    //     });
    // }
}

new Bot(process.env.BOT_TOKEN).start();