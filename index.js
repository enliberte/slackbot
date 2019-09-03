const express = require('express');
const {RTMClient} = require('@slack/rtm-api');
const {WebClient} = require('@slack/web-api');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


class Bot {
    constructor(token) {
        this.rtm = new RTMClient(token);
        this.web = new WebClient(token);
        this.subscribes = {};
        this.app = express();
        this.client = new MongoClient(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

        //app settings
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    processSubscriptionEvent(req, res, subscribe) {
        const result = req.body.text.match(/(^.*) (.*$)/);
        if (result) {
            const [, followed, repo] = result;
            if (subscribe) {
                this.subscribe(followed, req.body.user_name, repo);
            } else {
                this.unsubscribe(followed, req.body.user_name, repo);
            }
            res.status(200).send();
        } else {
            res.status(404).send();
        }
    }

    router() {
        this.app.get('/', (req, res) => {
            res.status(200).send('React app will be there');
        });

        this.app.post('/push', (req, res) => {
            if (req.body.attachments) {
                this.notifyAboutPR(req.body.attachments);
            }
        });

        this.app.post('/test', (req, res) => {
            this.testRichMessages(req, res);
        });

        this.app.post('/subscribe', (req, res) => {
            this.processSubscriptionEvent(req, res, true);
        });

        this.app.post('/unsubscribe', (req, res) => {
            this.processSubscriptionEvent(req, res, false);
        });
    }

    start() {
        this.app.listen(port);
        this.router();
        (async () => {
            await this.rtm.start();
        })();
    }

    notifyAboutPR(attachments) {
        const {fallback, author_name: followed} = attachments[0];
        if (fallback && followed) {
            const result = fallback.match(/<(.*)\/pull-requests/);
            if (result) {
                const repoName = result[1];
                this.client.connect(err => {
                    const subscribes = this.client.db("subscribes").collection("followed");
                    subscribes.find({followed, repoName}).toArray((err, docs) => {
                        if (docs) {
                            docs.forEach(doc => this.rtm.postMessageToUser(doc.follower, 'PR!', {attachments}));
                        }
                        this.client.close()
                    });
                });
            }
        }
    }

    testRichMessages(req, res) {
        this.web.chat.postMessage({
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `Welcome to the channel. We're here to help. Let us know if you have an issue.`,
                    },
                    accessory: {
                        type: 'button',
                        text: {
                            type: 'plain_text',
                            text: 'Get Help',
                        },
                        value: 'get_help',
                    },
                },
            ],
            channel: req.body.user_name,
        })
            .then(result => res.status(200).send())
            .catch(err => res.status(404).send(err));
    }

    subscribe(followed, follower, repoName) {
        this.client.connect(err => {
            const subscribes = this.client.db("subscribes").collection("followed");
            const subscribe = {followed, follower, repoName};
            subscribes.updateOne(subscribe, {$set: subscribe}, {upsert: true}, err => this.client.close());
        });
        this.rtm.postMessageToUser(follower, `You have subscribed to ${followed} on ${repoName}`);
    }

    unsubscribe(followed, follower, repoName) {
        this.client.connect(err => {
            const subscribes = this.client.db("subscribes").collection("followed");
            subscribes.deleteOne({followed, follower, repoName}, {}, err => this.client.close());
        });
        this.rtm.postMessageToUser(follower, `You have unsubscribed from ${followed} on ${repoName}`);
    }
}

new Bot(process.env.BOT_TOKEN).start();