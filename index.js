const express = require('express');
const SlackBot = require('slackbots');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


class Bot {
    constructor(token, name) {
        this.instance = new SlackBot({token, name});
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
        this.listenStart();
    }

    listenStart() {
        this.instance.on('start', () => {
            this.instance.postMessageToChannel('pushes', "I'm alive (Skynet)", {});
        });
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
                            docs.forEach(doc => this.instance.postMessageToUser(doc.follower, 'PR!', {attachments}));
                        }
                        this.client.close()
                    });
                });
            }
        }
    }

    subscribe(followed, follower, repoName) {
        this.client.connect(err => {
            const subscribes = this.client.db("subscribes").collection("followed");
            const subscribe = {followed, follower, repoName};
            subscribes.updateOne(subscribe, {$set: subscribe}, {upsert: true}, err => this.client.close());
        });
        this.instance.postMessageToUser(follower, `You have subscribed to ${followed} on ${repo}`);
    }

    unsubscribe(followed, follower, repoName) {
        this.client.connect(err => {
            const subscribes = this.client.db("subscribes").collection("followed");
            subscribes.deleteOne({followed, follower, repoName}, {}, err => this.client.close());
        });
        this.instance.postMessageToUser(follower, `You have unsubscribed from ${followed} on ${repo}`);
    }
}

new Bot(process.env.BOT_TOKEN,  'testbot').start();