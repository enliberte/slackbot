const express = require('express');
const SlackBot = require('slackbots');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
require('dotenv').config();


class Bot {
    constructor(token, name) {
        this.instance = new SlackBot({token, name});
        this.subscribes = {};
        this.app = express();

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
            console.log(req.body);
            if (req.body.text && req.body.attachments) {
                this.notifyAboutPushEvent(req.body);
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

    notifyAboutPushEvent(data) {
        console.log(this.subscribes);
        for (let followed in this.subscribes) {
            console.log(followed);
            for (let repo in followed) {
                console.log(repo);
                if (data.text.match(new RegExp(`^Push(.*)${repo}(.*)${followed}`))) {
                    this.subscribes[followed].forEach(
                        follower =>  this.instance.postMessageToUser(follower, data.text, {attachments: data.attachments})
                    );
                }
            }

        }
    }

    subscribe(followed, follower, repo) {
        if (this.subscribes[followed]) {
            if (this.subscribes[followed][repo]) {
                this.subscribes[followed][repo] = [...this.subscribes[followed][repo], follower];
            } else {
                this.subscribes[followed][repo] = [follower];
            }
        } else {
            this.subscribes[followed] = {};
            this.subscribes[followed][repo] = [follower];
        }
        this.instance.postMessageToUser(follower, `You have subscribed to ${followed} on ${repo}`);
    }

    unsubscribe(followed, follower, repo) {
        if (this.subscribes[followed]) {
            if (this.subscribes[followed][repo]) {
                this.subscribes[followed][repo] = this.subscribes[followed][repo].filter(currentFollower => currentFollower !== follower);
            }
        }
        this.instance.postMessageToUser(follower, `You have unsubscribed from ${followed} on ${repo}`);
    }
}

new Bot(process.env.BOT_TOKEN,  'testbot').start();
